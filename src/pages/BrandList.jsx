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
    title: 'Tên hãng',
    dataIndex: 'name'
  },
  {
    title: 'Logo',
    dataIndex: 'logo',
    className: 'brand-logo'
  },
  {
    title: 'Danh mục sản phẩm',
    dataIndex: 'proCat'
  },
  {
    title: 'Số lượng sản phẩm',
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

const BrandList = () => {
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  const deleteBrand = () => {
    // do something
    setOpen(false)
  }

  for (let i = 0; i < 20; i++) {
    data1.push({
      key: i + 1,
      name: 'Razer',
      logo: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJflBYqkDr--1vpqgN4fmrVcCmm6uXaeRRAmn_xowrA&s"
          alt="logo"
        />
      ),
      proCat: 'Quan ao',
      active: 'Active',
      totalPro: 20,
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
      <h3 className="text-center fs-3">Danh sách các hãng sản suất</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteBrand()
        }}
        content="Bạn có muốn xóa hãng này khỏi danh sách không ?"
      />
    </div>
  )
}

export default BrandList
