import { Table } from 'antd'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import CustomInput from '../components/CustomInput'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]
let data1 = []

const Users = () => {
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  const deleteUser = () => {
    // do something
    setOpen(false)
  }

  for (let i = 0; i < 20; i++) {
    data1.push({
      key: i + 1,
      name: 'Nguyen Quang Huy',
      email: 'huynq13102004@gmail.com',
      phone: '123456789',
      created: '12/12/2023',
      action: (
        <div className="d-flex">
          <Link to={``} className=" fs-3 text-warning">
            <BiEdit />
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
      <h3 className="text-center fs-3">Quản lý người dùng</h3>

      <CustomInput type="text" name="search-user" label="Tìm kiếm người dùng theo email" i_class="mb-2" />

      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteUser()
        }}
        content="Bạn có chắc chắn muốn xóa người dùng này ?"
      />
    </div>
  )
}

export default Users
