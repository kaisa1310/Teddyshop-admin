import { DatePicker, Select } from 'antd'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import moment from 'moment'

import CustomInput from '../components/CustomInput'

const OPTIONS = [
  'CEO',
  'Nhân viên',
  'Quản lý',
  'Quản trị viên',
  'Nhân viên kĩ thuật',
  'Nhân viên bán hàng',
  'Nhân viên marketing',
  'Nhân viên kế toán'
]

const AddMember = () => {
  // eslint-disable-next-line no-unused-vars
  const [startWorkingDate, setStartWorkingDate] = useState(null)

  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  const handleDateChange = (date) => {
    const formattedDate = moment(date.$d).format('DD/MM/YYYY')
    setStartWorkingDate(formattedDate)
  }

  return (
    <div>
      <h3 className="text-center">Thêm mới thành viên</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <CustomInput label="Tên nhân viên" name="name" type="text" />
        </div>

        <div>
          <CustomInput label="Địa chỉ email" name="email" type="email" />
        </div>

        <div>
          <CustomInput label="Số điện thoại" name="phoneNumber" type="text" />
        </div>

        <div>
          <span style={{ fontSize: '16px', display: 'block' }}>Mô tả</span>
          <ReactQuill theme="snow" name="description" />
        </div>

        <div>
          <span>Mạng xã hội</span>
          <div className="d-flex gap-4">
            <CustomInput label="Facebook" name="facebook" type="text" />
            <CustomInput label="Zalo" name="zalo" type="text" />
            <CustomInput label="Instagram" name="instagram" type="text" />
            <CustomInput label="Twitter" name="twitter" type="text" />
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <DatePicker
            style={{ width: '100%', height: '50px' }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày bắt đầu làm việc"
            onChange={handleDateChange}
          />
        </div>

        <div>
          <Select
            mode="single"
            placeholder="Chọn vị trí của thành viên"
            value={selectedItems}
            onChange={setSelectedItems}
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

        <button className="btn btn-primary w-25">Thêm mới nhân viên</button>
      </form>
    </div>
  )
}

export default AddMember
