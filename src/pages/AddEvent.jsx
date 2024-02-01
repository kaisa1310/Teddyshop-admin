/* eslint-disable no-unused-vars */
import { useState } from 'react'
import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'
import { DatePicker, Select, Collapse } from 'antd'
import 'react-quill/dist/quill.snow.css'

import CustomInput from '../components/CustomInput'

const { RangePicker } = DatePicker
const { Panel } = Collapse

const OPTIONS = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D']

const AddEvent = () => {
  const [eventTime, setEventTime] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [scheduleData, setScheduleData] = useState([])
  const [count, setCount] = useState(1)

  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  const handleDateChange = (date) => {
    setEventTime(date)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const newData = [...scheduleData]
    newData.push({ id: count })
    setScheduleData(newData)
    setCount(count + 1)
  }

  const handleDelete = (id) => {
    const newDate = scheduleData.filter((item) => item.id !== id)
    setScheduleData(newDate)
  }

  return (
    <div>
      <h3 className="text-center">Tạo mới sự kiện</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <CustomInput label="Tên sự kiện" name="name" type="text" />
        </div>

        <div>
          <CustomInput label="Địa điểm tổ chức" name="location" type="text" />
        </div>

        <div className="d-flex flex-column gap-2">
          <DatePicker
            style={{ width: '100%', height: '50px' }}
            format="YYYY-MM-DD"
            placeholder="Ngày tổ chức sự kiện"
            onChange={(_, dateString) => handleDateChange(dateString)}
          />
        </div>

        <div className="">
          <RangePicker
            showTime={{
              format: 'DD/MM/YYYY'
            }}
            format="YYYY-MM-DD"
            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            style={{ height: '50px', width: '40%' }}
            onChange={(date, dateString) => {
              setStartDate(dateString[0])
              setEndDate(dateString[1])
            }}
          />
        </div>

        <div>
          <Select
            mode="multiple"
            placeholder="Chọn thành viên tham gia sự kiện"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
              width: '100%',
              fontSize: '15px',
              height: '50px'
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item
            }))}
          />
        </div>

        <div>
          <ReactQuill theme="snow" name="description" placeholder="Mô tả của sự kiện" />
        </div>

        <div className="bg-white border-1 p-5 text-center" style={{ cursor: 'pointer' }}>
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Chọn ảnh </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <Collapse>
          <Panel header="Thêm lịch trình cho sự kiện" key="1">
            {scheduleData.map((item, index) => (
              <div className="d-flex gap-3 align-items-center" key={index}>
                <div className="flex-1 w-25 mt-3">
                  <DatePicker
                    style={{ width: '100%', height: '60px' }}
                    format="HH:mm"
                    placeholder="Thời gian diễn ra lịch trình"
                    onChange={(_, dateString) => console.log(dateString)}
                  />
                </div>

                <div className="flex-1 w-25 ">
                  <CustomInput label="Tên lịch trình" name="schedule-name" type="text" />
                </div>

                <div className="flex-1 w-25">
                  <CustomInput label="Tag" name="Tag" type="text" />
                </div>

                <button type="button" className="btn btn-danger mt-2" onClick={() => handleDelete(item.id)}>
                  Xóa
                </button>
              </div>
            ))}
          </Panel>
          <button className="btn btn-primary mt-2" onClick={(e) => handleAdd(e)}>
            Thêm lịch trình
          </button>
        </Collapse>

        <button className="btn btn-primary w-25">Thêm sự kiện</button>
      </form>
    </div>
  )
}

export default AddEvent
