import { Table } from 'antd'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên sự kiện',
    dataIndex: 'name',
    className: 'text-capitalize'
  },
  {
    title: 'Thời gian',
    dataIndex: 'time'
  },
  {
    title: 'Địa điểm',
    dataIndex: 'location'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]
let data1 = []

const Events = () => {
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  const deleteBlog = () => {
    // do something
    setOpen(false)
  }

  for (let i = 0; i < 20; i++) {
    data1.push({
      key: i + 1,
      name: 'Khai trương cửa hàng TeddyShop',
      time: '2021-10-10',
      location: 'Hà Nội, Thái Nguyên',
      action: (
        <div className="d-flex">
          <Link to={``} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => setOpen(true)}>
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách sự kiện</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteBlog()
        }}
        content="Bạn có muốn xóa sự kiện này không ?"
      />
    </div>
  )
}

export default Events
