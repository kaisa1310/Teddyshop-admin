import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'
import { Select } from 'antd'
import 'react-quill/dist/quill.snow.css'

import CustomInput from '../components/CustomInput'
import { useState } from 'react'

const OPTIONS = ['Công nghệ', 'Bàn phím', 'Kĩ thuật', 'Tin tức', 'Thủ thuật']

const AddBlog = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  return (
    <div>
      <h3 className="text-center">Viết blog</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <CustomInput label="Tên bài viết" name="name" type="text" />
        </div>

        <div>
          <Select
            mode="single"
            placeholder="Danh mục"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
              width: '300px',
              fontSize: '20px',
              height: '50px'
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item
            }))}
          />
        </div>

        <div>
          <span style={{ fontSize: '16px', display: 'block' }}>Nội dung</span>
          <ReactQuill theme="snow" name="description" />
        </div>

        <div className="bg-white border-1 p-5 text-center" style={{ cursor: 'pointer' }}>
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Ảnh bài viết</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div>
          <CustomInput label="Tag" name="tag" type="text" />
        </div>

        <button className="btn btn-primary w-25">Thêm bài viết</button>
      </form>
    </div>
  )
}

export default AddBlog
