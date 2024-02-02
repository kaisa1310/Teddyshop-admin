import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import CustomInput from '../components/CustomInput'
import { authApis } from '../apis'
import moment from 'moment'

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

const Users = () => {
  const role = 'admin'
  let tableData = []

  const [userData, setUserData] = useState([])
  const [userId, setUserId] = useState('')
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  const fetchData = async () => {
    const data = await authApis.getAllUser(role)
    setUserData(data)
  }

  const deleteUser = async (userId) => {
    await authApis.deleteUser(userId)
    setOpen(false)
    setTimeout(() => {
      fetchData()
    }, 2000)
  }

  useEffect(() => {
    fetchData()
  }, [])

  for (let i = 0; i < userData?.length; i++) {
    tableData.push({
      key: i,
      name: userData[i].fullName,
      email: userData[i].email,
      phone: userData[i].phone || 'Chưa cập nhật',
      created: moment(userData[i].createdAt).format('DD/MM/YYYY'),
      action: (
        <div className="d-flex">
          <Link to={`edit-user/${userData[i]._id}`} className=" fs-3 text-warning">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              setOpen(true)
              setUserId(userData[i]._id)
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
          deleteUser(userId)
        }}
        content="Bạn có chắc chắn muốn xóa người dùng này ?"
      />
    </div>
  )
}

export default Users
