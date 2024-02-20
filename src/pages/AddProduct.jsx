/* eslint-disable no-unused-vars */
import Dropzone from 'react-dropzone'
import { Select, Collapse } from 'antd'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToBrand, getBrands } from '../features/brand/brandSlice'
import { addProductToCategory, getProcats } from '../features/procat/procatSlice'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { uploadImage, deleteImage, resetState as uploadResetState } from '../features/upload/uploadSlice'
import { IoMdClose } from 'react-icons/io'
import {
  createProduct,
  getPriceByProductId,
  getProductById,
  resetState,
  updateProduct
} from '../features/product/productSlice'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import AddPropertiesPro from '../components/AddPropertiesPro'

const schema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên sản phẩm'),
  description: Yup.string().required('Vui lòng nhập mô tả sản phẩm'),
  price: Yup.number().required('Vui lòng nhập giá sản phẩm'),
  priceSale: Yup.number(),
  quantity: Yup.number().required('Vui lòng nhập số lượng sản phẩm'),
  warranty: Yup.string().required('Vui lòng nhập thời gian bảo hành'),
  images: Yup.array(),
  tags: Yup.string().required('Vui lòng nhập tag cho sản phẩm'),
  brand: Yup.string().required('Vui lòng chon hãng sản xuất'),
  category: Yup.string().required('Vui lòng chọn danh mục sản phẩm')
})

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const productId = location.pathname.split('/')[3]

  // get product
  useEffect(() => {
    if (productId !== undefined) {
      dispatch(getProductById(productId))
      dispatch(getPriceByProductId(productId))
    } else {
      dispatch(resetState())
    }
  }, [productId])

  // getUserId
  const user = useSelector((state) => state.auth?.user)
  const { id: userId } = user

  // get brands + product categoris, set brand + procategoris
  useEffect(() => {
    dispatch(getBrands())
    dispatch(getProcats())
  }, [])
  const brandState = useSelector((state) => state.brand?.brands)
  const procatState = useSelector((state) => state.procat?.procats)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedProCat, setSelectedProCat] = useState('')

  const brandOpions = []
  const proCatOptions = []
  for (let i = 0; i < brandState.length; i++) {
    brandOpions.push({
      value: brandState[i]._id,
      label: brandState[i].name
    })
  }
  for (let i = 0; i < procatState.length; i++) {
    proCatOptions.push({
      value: procatState[i]._id,
      label: procatState[i].name
    })
  }

  const handleChangeBrand = (value) => {
    setSelectedBrand(value)
    formik.setFieldValue('brand', value)
  }
  const handleChangeProcat = (value) => {
    setSelectedProCat(value)
    formik.setFieldValue('category', value)
  }
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  // upload images
  const imageState = useSelector((state) => state.upload?.images)
  let productImages = []
  imageState.forEach((image) => {
    productImages.push({
      public_id: image.public_id,
      url: image.url
    })
  })
  useEffect(() => {
    formik.setFieldValue('images', productImages)
  }, [imageState])

  // get product state
  const newProduct = useSelector((state) => state.product)
  const { isSuccess, isError, isLoading, createdProduct, product, prices, updatedProduct } = newProduct

  useEffect(() => {
    if (productId !== undefined) {
      dispatch(getPriceByProductId(productId))
    }
  }, [productId])

  // toast message
  useEffect(() => {
    if (Object.keys(createdProduct).length > 0) {
      toast.success('Tạo mới sản phẩm thành công')
    }
    if (Object.keys(updatedProduct).length > 0) {
      toast.success('Cập nhật sản phẩm thành công')
    }
    if (isError) {
      toast.error('Có lỗi, vui lòng thử lại!')
    }
  }, [isSuccess, isError, isLoading, createdProduct, product, updatedProduct])

  // add product to brand + category
  useEffect(() => {
    if (Object.keys(createdProduct).length > 0) {
      const proCatData = {
        catId: createdProduct?.category,
        productId: createdProduct?._id
      }
      const brandData = {
        brandId: createdProduct?.brand,
        productId: createdProduct?._id
      }
      dispatch(addProductToBrand(brandData))
      dispatch(addProductToCategory(proCatData))
    }
  }, [createdProduct])

  useEffect(() => {
    const newProductImage = product.images ? [...product.images, ...productImages] : productImages
    formik.setFieldValue('images', newProductImage)
  }, [product])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      priceSale: product.priceSale || '',
      quantity: product.quantity || '',
      warranty: product.warranty || '',
      images: [],
      tags: product.tags?.join('') || '',
      brand: product.brand || '',
      category: product.category || ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (productId !== undefined) {
        const newTags = values.tags.split(',')
        dispatch(updateProduct({ id: productId, ...values, tags: newTags }))
        setTimeout(() => {
          navigate('/admin/product-list')
        }, 1000)
      } else {
        const newTags = values.tags.split(',')
        const productData = { ...values, tags: newTags, createdBy: userId }
        dispatch(createProduct({ ...values, tags: newTags, createdBy: userId }))
        formik.resetForm()
        setTimeout(() => {
          dispatch(uploadResetState())
        }, 2000)
      }
    }
  })

  return (
    <div>
      <h3 className="text-center">{productId !== undefined ? 'Sửa thông tin' : 'Thêm mới'} sản phẩm</h3>
      {productId && <AddPropertiesPro productId={productId} />}
      {prices && prices?.length > 0 && (
        <Collapse className="mt-4" style={{ width: '70%' }}>
          <Collapse.Panel header="Giá sản phẩm" key="1">
            {prices.map((price) => {
              return (
                <div
                  key={price._id}
                  className="d-flex gap-4 align-items-center justify-content-between"
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    width: '100%'
                  }}
                >
                  <div style={{ color: '#333' }}>
                    <strong>Màu sắc:</strong> {price.color.name}
                  </div>
                  <div style={{ color: '#333' }}>
                    <strong>Giá:</strong> {price.price}
                  </div>
                  <div style={{ color: '#333' }}>
                    <strong>Số lượng:</strong> {price.quantity}
                  </div>
                  <div style={{ color: '#333' }}>
                    <strong>Kích cỡ:</strong> {price.size.name}
                  </div>
                  <div style={{ color: '#333' }}>
                    <strong>Kiểu:</strong> {price.type.name}
                  </div>
                  <button className="btn btn-danger px-2 py-1">Xóa </button>
                </div>
              )
            })}
          </Collapse.Panel>
        </Collapse>
      )}
      <form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
        <div>
          <CustomInput
            label="Tên sản phẩm"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-error">{formik.errors.name}</div> : null}
        </div>

        <div>
          <CustomInput
            label="Giá sản phẩm"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
          />
          {formik.touched.price && formik.errors.price ? <div className="text-error">{formik.errors.price}</div> : null}
        </div>

        <div>
          <CustomInput
            label="Giá ưu đãi"
            name="priceSale"
            type="number"
            value={formik.values.priceSale}
            onChange={formik.handleChange('priceSale')}
            onBlur={formik.handleBlur('priceSale')}
          />
          {formik.touched.priceSale && formik.errors.priceSale ? (
            <div className="text-error">{formik.errors.priceSale}</div>
          ) : null}
        </div>

        <div>
          <CustomInput
            label="Số lượng sản phẩm"
            name="quantity"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange('quantity')}
            onBlur={formik.handleBlur('quantity')}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-error">{formik.errors.quantity}</div>
          ) : null}
        </div>

        <div>
          <CustomInput
            label="Thời gian bảo hành"
            name="warranty"
            type="text"
            value={formik.values.warranty}
            onChange={formik.handleChange('warranty')}
            onBlur={formik.handleBlur('warranty')}
          />
          {formik.touched.warranty && formik.errors.warranty ? (
            <div className="text-error">{formik.errors.warranty}</div>
          ) : null}
        </div>

        <div>
          <span className="mb-1 d-block">Mô tả</span>
          <ReactQuill
            theme="snow"
            name="description"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue('description', value)}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-error">{formik.errors.description}</div>
          ) : null}
        </div>

        <div>
          <span className="mb-1 d-block">Chọn danh mục sản phẩm</span>
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Chọn danh mục sản phẩm"
            value={formik.values.category}
            onChange={handleChangeProcat}
            filterOption={filterOption}
            style={{
              width: '25%',
              fontSize: '16px',
              height: '50px'
            }}
            options={proCatOptions}
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-error">{formik.errors.category}</div>
          ) : null}
        </div>

        <div>
          <span className="mb-1 d-block">Chọn hãng</span>
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Chọn hãng sản xuất"
            value={formik.values.brand}
            onChange={handleChangeBrand}
            filterOption={filterOption}
            style={{
              width: '25%',
              fontSize: '16px',
              height: '50px'
            }}
            options={brandOpions}
          />
          {formik.touched.brand && formik.errors.brand ? <div className="text-error">{formik.errors.brand}</div> : null}
        </div>

        <div className="d-flex gap-2">
          <div className="bg-white border-1 p-5 text-center w-25 rounded shadow-sm" style={{ cursor: 'pointer' }}>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Tải lên sản phẩm</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {formik.values.images.length > 0 &&
            formik.values.images.map((image, index) => {
              return (
                <div style={{ position: 'relative' }} key={index}>
                  <img
                    style={{
                      width: '140px',
                      height: '140px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                    src={image.url}
                    alt="productimage"
                  />
                  <div
                    onClick={() => dispatch(deleteImage(image.public_id))}
                    style={{ position: 'absolute', right: '0', top: '-5px', fontSize: '20px', cursor: 'pointer' }}
                  >
                    <IoMdClose />
                  </div>
                </div>
              )
            })}
        </div>

        <div>
          <CustomInput
            label="Tag"
            name="tag"
            type="text"
            value={formik.values.tags}
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleBlur('tags')}
          />
          {formik.touched.tags && formik.errors.tags ? <div className="text-error">{formik.errors.tags}</div> : null}
        </div>
        <button type="submit" className="btn btn-primary w-25 my-4">
          {productId ? 'Lưu thông tin' : ' Thêm mới'} sản phẩm
        </button>
      </form>
    </div>
  )
}

export default AddProduct
