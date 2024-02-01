import { Table } from 'antd'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FcViewDetails } from 'react-icons/fc'
import CustomModal from '../components/CustomModal'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên người đặt hàng',
    dataIndex: 'name'
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'product'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status'
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'date'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]
let data1 = []

const Orders = () => {
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(!open)
  }

  const deleteOrder = () => {
    // do something
    setOpen(!open)
  }

  for (let i = 0; i < 10; i++) {
    data1.push({
      key: i + 1,
      name: 'Nguyễn Quang Huy',
      product: 'Laptop Dell Inspiron 15 3501',
      quantity: 1,
      total: '20.000.000',
      status: 'Đã giao hàng',
      date: '20/10/2021',
      action: (
        <div className="d-flex">
          <Link to={``} className=" fs-3 text-warning">
            <FcViewDetails />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => setOpen(!open)}>
            <AiFillDelete />
          </button>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách đơn hàng</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteOrder()
        }}
        content="Bạn có đơn hàng này không ?"
      />
    </div>
  )
}

export default Orders
