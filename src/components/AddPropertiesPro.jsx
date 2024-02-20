import { useEffect, useState } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import CustomInput from './CustomInput'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { addPriceToProduct } from '../features/product/productSlice'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  price: Yup.number().required('Vui lòng nhập giá'),
  quantity: Yup.number().required('Vui lòng nhập số lượng'),
  color: Yup.string().required('Vui lòng nhập màu sắc'),
  style: Yup.string(),
  type: Yup.string()
})

const AddPropertiesPro = ({ productId }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const productState = useSelector((state) => state.product)
  const { createdPrice } = productState

  useEffect(() => {
    if (Object.keys(createdPrice).length > 0) {
      toast.success('Thêm thuộc tính thành công')
    } else if (createdPrice === null) {
      toast.error('Thêm thuộc tính thất bại')
    }
  }, [createdPrice])

  const formik = useFormik({
    initialValues: {
      price: '',
      quantity: '',
      color: '',
      style: '',
      type: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const newValues = {
        productId: productId,
        price: values.price,
        quantity: values.quantity,
        color: {
          name: values.color,
          code: uuidv4()
        },
        style: {
          name: values.style,
          code: uuidv4()
        },
        type: {
          name: values.type,
          code: uuidv4()
        }
      }
      dispatch(addPriceToProduct(newValues))
      formik.resetForm()
      setOpen(false)
    }
  })

  return (
    <div>
      <button className="btn btn-primary" onClick={showModal}>
        Thêm thuộc tính
      </button>
      <Modal title="Thêm thuộc tính" open={open} onCancel={handleCancel} footer={null}>
        <form onSubmit={formik.handleSubmit}>
          <div className="">
            <CustomInput
              label="Giá"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange('price')}
              onBlur={formik.handleBlur('price')}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-error">{formik.errors.price}</div>
            ) : null}
          </div>

          <div className="">
            <CustomInput
              label="Số lượng"
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

          <div className="">
            <CustomInput
              label="Màu sắc"
              name="color"
              type="text"
              value={formik.values.color}
              onChange={formik.handleChange('color')}
              onBlur={formik.handleBlur('color')}
            />
            {formik.touched.color && formik.errors.color ? (
              <div className="text-error">{formik.errors.color}</div>
            ) : null}
          </div>

          <CustomInput
            label="Kiểu"
            name="style"
            type="text"
            value={formik.values.style}
            onChange={formik.handleChange('style')}
          />
          <CustomInput
            label="Loại"
            name="type"
            type="text"
            value={formik.values.type}
            onChange={formik.handleChange('type')}
          />
          <button type="submit" className="btn btn-primary mt-4 px-4 py-2">
            Lưu
          </button>
        </form>
      </Modal>
    </div>
  )
}

AddPropertiesPro.propTypes = {
  productId: PropTypes.string.isRequired,
  data: PropTypes.object
}

export default AddPropertiesPro
