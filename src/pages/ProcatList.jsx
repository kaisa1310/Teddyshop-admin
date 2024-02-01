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
    title: 'Tên danh mục',
    dataIndex: 'name'
  },
  {
    title: 'Tổng số sản phẩm',
    dataIndex: 'totalPro'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'active'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]
let data1 = []

const ProcatList = () => {
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  const deleteProductCat = () => {
    // do something
    setOpen(false)
  }

  for (let i = 0; i < 10; i++) {
    data1.push({
      key: i + 1,
      name: 'Bàn phím cơ',
      totalPro: 20,
      active: 'Hoạt động',
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
      <h3 className="text-center fs-3">Danh mục sản phẩm</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteProductCat()
        }}
        content="Bạn danh mục sản phẩm này không ?"
      />
    </div>
  )
}

export default ProcatList
