import { UploadOutlined } from '@ant-design/icons'
import { Button, Select, Upload, Collapse } from 'antd'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import CustomInput from '../components/CustomInput'

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']

const { Panel } = Collapse

const AddProduct = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  const [fileList, setFileList] = useState([])

  const [count, setCount] = useState(1)
  const [propertiesData, setPropertiesData] = useState([])

  const handleAdd = (event) => {
    event.preventDefault()
    const newData = [...propertiesData]
    newData.push({ id: count })
    setPropertiesData(newData)
    setCount(count + 1)
  }

  const handleDelete = (id) => {
    const newDate = propertiesData.filter((item) => item.id !== id)
    setPropertiesData(newDate)
  }

  const handleSelectChange = (value) => {
    setSelectedItems(value)
  }

  const handleUploadChange = ({ fileList }) => {
    console.log(fileList)
    setFileList(fileList)
  }

  const handleUploadRemove = (file) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  return (
    <div>
      <h3 className="text-center">Thêm mới sản phẩm</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <CustomInput label="Tên hãng" name="name" type="text" />
        </div>

        <div>
          <CustomInput label="Giá sản phẩm" name="price" type="number" />
        </div>

        <div>
          <CustomInput label="Giá ưu đãi" name="priceOld" type="number" />
        </div>

        <div>
          <CustomInput label="Số lượng sản phẩm" name="quantity" type="number" />
        </div>

        <div>
          <span className="mb-1 d-block">Mô tả</span>
          <ReactQuill theme="snow" name="description" />
        </div>

        <div>
          <span className="mb-1 d-block">Chọn danh mục sản phẩm</span>
          <Select
            mode="multiple"
            placeholder="Chọn danh mục sản phẩm"
            value={selectedItems}
            onChange={handleSelectChange}
            style={{
              width: '100%',
              fontSize: '16px',
              height: '50px'
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item
            }))}
          />
        </div>

        <div>
          <span className="mb-1 d-block">Chọn hãng</span>
          <Select
            mode="multiple"
            placeholder="Chọn hãng"
            value={selectedItems}
            onChange={handleSelectChange}
            style={{
              width: '100%',
              fontSize: '16px',
              height: '50px'
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item
            }))}
          />
        </div>

        <div className="d-flex flex-column gap-2">
          <span>Tải lên ảnh sản phẩm</span>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" // Thay bằng địa chỉ API tải lên của bạn
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleUploadRemove}
          >
            <Button icon={<UploadOutlined />}>Tải lên</Button>
          </Upload>
        </div>

        <div>
          <CustomInput label="Tag" name="tag" type="text" />
        </div>

        <Collapse>
          <Panel header="Thêm thuộc tính" key="1">
            {propertiesData.map((item, index) => (
              <div className="d-flex gap-3" key={index}>
                <div className="flex-1 w-25">
                  <CustomInput label="Giá" name="price" type="text" />
                </div>

                <div className="flex-1 w-25">
                  <CustomInput label="Màu sắc" name="color" type="text" />
                </div>

                <div className="flex-1 w-25">
                  <CustomInput label="Kiểu" name="style" type="text" />
                </div>

                <div className="flex-1 w-25">
                  <CustomInput label="Loại" name="type" type="text" />
                </div>

                <button type="button" className="btn btn-danger mt-2" onClick={() => handleDelete(item.id)}>
                  Xóa
                </button>
              </div>
            ))}
          </Panel>
          <button className="btn btn-primary mt-2" onClick={(e) => handleAdd(e)}>
            Thêm thuộc tính
          </button>
        </Collapse>

        <button className="btn btn-primary w-25">Thêm mới sản phẩm</button>
      </form>
    </div>
  )
}

export default AddProduct
