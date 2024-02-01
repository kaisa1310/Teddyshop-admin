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
    title: 'Tên bài viết',
    dataIndex: 'name',
    className: 'text-capitalize'
  },
  {
    title: 'Danh mục',
    dataIndex: 'category'
  },
  {
    title: 'Tag',
    dataIndex: 'tag'
  },
  {
    title: 'Người viết',
    dataIndex: 'author'
  },
  {
    title: 'Lượt xem',
    dataIndex: 'view'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]
let data1 = []

const Blogs = () => {
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
      name: 'Bàn phím cơ Razer BlackWidow V3 Mini HyperSpeed - Mercury White (RZ03-03540100-R3M1)',
      category: 'Công nghệ',
      tag: 'Gaming',
      author: ' Nguyen Quang Huy',
      view: 100,
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
      <h3 className="text-center fs-3">Danh sách bài viết</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deleteBlog()
        }}
        content="Bạn có muốn xóa bài viết không ?"
      />
    </div>
  )
}

export default Blogs
