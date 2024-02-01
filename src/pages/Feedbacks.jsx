import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { FcViewDetails } from 'react-icons/fc'

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
    title: 'Nội dung',
    dataIndex: 'content',
    className: 'text-capitalize'
  },
  {
    title: 'Thời gian',
    dataIndex: 'time'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]
let data1 = []

const Feedbacks = () => {
  for (let i = 0; i < 20; i++) {
    data1.push({
      key: i + 1,
      name: 'Nguyễn Quang Huy',
      email: 'huynqph37225@fpt.edu.vn',
      content: 'Sản phẩm rất tốt !!',
      time: '2021-10-10',
      status: 'Đã phản hồi',
      action: (
        <div className="d-flex">
          <Link to={``} className=" fs-3 text-warning">
            <FcViewDetails />
          </Link>
        </div>
      )
    })
  }

  return (
    <div>
      <h3 className="text-center fs-3">Danh sách phản hổi</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  )
}

export default Feedbacks
