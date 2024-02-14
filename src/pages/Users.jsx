import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import CustomInput from '../components/CustomInput'
import { authApis } from '../apis'
// import moment from 'moment'

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

let tableData = []

const Users = () => {
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  const fetchData = async () => {
    const data = await authApis.
    setUserData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  for (let i = 0; i < 20; i++) {
    tableData.push({
      key: i,
      name: 'Nguyễn Văn A',
      email: 'email@gmail.com',
      phone: 'Phone Number' || 'Chưa cập nhật',
      created: '14 - 02 - 2024',
      action: (
        <div className="d-flex">
          <Link to={`edit-user/`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              setOpen(true)
            }}
          >
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

      <Table columns={columns} dataSource={tableData} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          
        }}
        content="Bạn có chắc chắn muốn xóa người dùng này ?"
      />
    </div>
  )
}

export default Users
