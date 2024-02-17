import { Table } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../components/CustomInput'
import CustomModal from '../components/CustomModal'
import { getUsers, resetState } from '../features/members/memberSlice'
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
    title: 'Ngày tạo',
    dataIndex: 'created'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Users = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getUsers())
  }, [dispatch])

  const usersState = useSelector((state) => state.member?.users?.users)
  const tableData = []

  for (let i = 0; i < usersState?.length; i++) {
    tableData.push({
      key: i + 1,
      name: usersState[i].fullName,
      email: usersState[i].email,
      created: moment(usersState[i].createdAt).format('DD/MM/YYYY'),
      action: (
        <div className="d-flex">
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
        performAction={() => {}}
        content="Bạn có chắc chắn muốn xóa người dùng này ?"
      />
    </div>
  )
}

export default Users
