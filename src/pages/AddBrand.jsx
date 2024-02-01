import { useState } from 'react'
import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'
import { Select } from 'antd'
import 'react-quill/dist/quill.snow.css'

import CustomInput from '../components/CustomInput'

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']

const AddBrand = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  const handleSelectChange = (value) => {
    setSelectedItems(value)
  }

  return (
    <div>
      <h3 className="text-center">Thêm mới hãng sản xuất</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <CustomInput label="Tên hãng" name="name" type="text" />
        </div>

        <div>
          <span style={{ fontSize: '16px', display: 'block' }}>Mô tả</span>
          <ReactQuill theme="snow" name="description" />
        </div>

        <div>
          <span>Chọn danh mục sản phẩm</span>
          <Select
            mode="multiple"
            placeholder="Chọn danh mục sản phẩm"
            value={selectedItems}
            onChange={handleSelectChange}
            style={{
              width: '100%',
              fontSize: '18px',
              height: '50px'
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item
            }))}
          />
        </div>

        <div className="bg-white border-1 p-5 text-center" style={{ cursor: 'pointer' }}>
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Chọn logo</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <button className="btn btn-primary w-25">Thêm mới hãng</button>
      </form>
    </div>
  )
}

export default AddBrand
