import { Table, Select } from 'antd'
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
    title: 'Tên sản phẩm',
    dataIndex: 'name'
  },
  {
    title: 'Giá sản phẩm',
    dataIndex: 'price'
  },
  {
    title: 'Danh mục sản phẩm',
    dataIndex: 'proCat'
  },
  {
    title: 'Hãng sản xuất',
    dataIndex: 'brand'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity'
  },
  {
    title: 'Số lượng đã bán',
    dataIndex: 'quantitySold'
  },
  {
    title: 'Số lượng còn lại',
    dataIndex: 'availableQuantity'
  },
  {
    title: 'Trạng thái thái',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]
let data1 = []

const OPTIONS = ['Bàn phím cơ', 'Bàn phím gaming', 'Chuột']
const OPTIONS1 = ['Bàn phím cơ', 'Bàn phím gaming', 'Chuột']

const Products = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))
  const filteredOptions1 = OPTIONS1.filter((o) => !selectedItems.includes(o))

  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }

  const deletProduct = () => {
    // do something
    setOpen(false)
  }

  for (let i = 0; i < 20; i++) {
    data1.push({
      key: i + 1,
      name: 'Bàn phím cơ custom',
      price: 1000000,
      proCat: 'Bàn phím cơ',
      brand: 'Razer',
      quantity: 100,
      quantitySold: 50,
      availableQuantity: 50,
      status: 'Còn hàng',
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
      <h3 className="text-center fs-3">Quản lý sản phẩm</h3>

      <div className="d-flex gap-4">
        <Select
          mode="single"
          placeholder="Chọn danh mục sản phẩm"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: '20%',
            fontSize: '18px',
            height: '46px',
            margin: '20px 0'
          }}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item
          }))}
        />

        <Select
          mode="single"
          placeholder="Chọn hãng sản xuất"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: '20%',
            fontSize: '18px',
            height: '46px',
            margin: '20px 0'
          }}
          options={filteredOptions1.map((item) => ({
            value: item,
            label: item
          }))}
        />
      </div>

      <Table columns={columns} dataSource={data1} />
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => {
          deletProduct()
        }}
        content="Bạn có chắc chắn muốn xóa sản phẩm này ?"
      />
    </div>
  )
}

export default Products
