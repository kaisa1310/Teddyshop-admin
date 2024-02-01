import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'
import 'react-quill/dist/quill.snow.css'

import CustomInput from '../components/CustomInput'

const AddProcat = () => {
  return (
    <div>
      <h3 className="text-center">Thêm mới danh mục sản phẩm</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <CustomInput label="Tên danh mục" name="name" type="text" />
        </div>

        <div>
          <span style={{ fontSize: '16px', display: 'block' }}>Mô tả</span>
          <ReactQuill theme="snow" name="description" />
        </div>

        <div>
          <CustomInput label="Tag" name="tag" type="text" />
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

        <button className="btn btn-primary w-25">Thêm danh mục sản phẩm</button>
      </form>
    </div>
  )
}

export default AddProcat
