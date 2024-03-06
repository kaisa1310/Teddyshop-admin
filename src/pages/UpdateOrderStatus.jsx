import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrderById, resetState, updateStatus } from '../features/Order/orderSlice'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const filteredOptions = [
  { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
  { label: 'Đã xác nhận', value: 'Đã xác nhận' },
  { label: 'Đang giao hàng', value: 'Đang giao hàng' },
  { label: 'Đã giao hàng', value: 'Đã giao hàng' },
  { label: 'Giao hàng thành công', value: 'Giao hàng thành công' }
]

const UpdateOrderStatus = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [statusOrder, setStatusOrder] = useState('')

  const getOrderId = location.pathname.split('/')[3]

  useEffect(() => {
    if (getOrderId !== undefined) {
      dispatch(getOrderById(getOrderId))
    } else {
      dispatch(resetState())
    }
  }, [getOrderId])

  const orderState = useSelector((state) => state.order)
  const { updatedOrder } = orderState
  const {
    shippingInfo,
    orderItems,
    orderDate,
    totalPrice,
    totalPriceAfterDiscount,
    orderStatus,
    paymentMethod,
    month,
    createdAt,
    updatedAt
  } = orderState.order

  const handleUpdateOrderStatus = () => {
    if (statusOrder !== '' && getOrderId) {
      dispatch(updateStatus({ id: getOrderId, status: statusOrder }))
    } else {
      toast.warning('Bạn hãy kiểm tra lại thông tin, và thử lại!')
    }
  }

  useEffect(() => {
    if (Object.keys(updatedOrder).length > 0) {
      toast.success('Cập nhật trạng thái đơn hàng thành công')
      navigate('/admin/order-list')
    }
  }, [updatedOrder])

  return (
    <div>
      <h3 className="text-center">Cập nhật trạng thái đơn hàng</h3>
      <form className="d-flex flex-column gap-3">
        <div>
          <Select
            mode="single"
            name="status"
            placeholder="Cập nhật trạng thái đơn hàng"
            style={{
              width: '25%',
              fontSize: '18px',
              height: '50px'
            }}
            options={filteredOptions}
            optionLabelProp="label"
            // value={statusOrder ? statusOrder : orderState}
            onChange={setStatusOrder}
          />
        </div>
        <div className="">
          <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
            <h5 style={{ marginBottom: '10px' }}>Thông tin giao hàng</h5>
            <p style={{ marginBottom: '5px' }}>Họ và tên: {shippingInfo?.fullName}</p>
            <p style={{ marginBottom: '5px' }}>Địa chỉ: {shippingInfo?.address}</p>
            <p style={{ marginBottom: '5px' }}>Thành phố: {shippingInfo?.city}</p>
            <p style={{ marginBottom: '5px' }}>Số điện thoại: {shippingInfo?.phoneNumber}</p>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
            <h5 style={{ marginBottom: '10px' }}>Sản phẩm đặt hàng</h5>
            <table style={{ width: '100%', marginBottom: '10px' }}>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Màu sắc</th>
                  <th>Loại</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {orderItems &&
                  orderItems.length > 0 &&
                  orderItems?.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td>{order.product.name}</td>
                        <td>{order.color}</td>
                        <td>{order.type}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
            <h5 style={{ marginBottom: '10px' }}>Tổng kết đơn hàng</h5>
            <p style={{ marginBottom: '5px' }}>Ngày đặt hàng: {dayjs(orderDate).format('DD/MM/YYYY HH:mm:ss')}</p>
            <p style={{ marginBottom: '5px' }}>Tổng giá: {totalPrice}</p>
            <p style={{ marginBottom: '5px' }}>Tổng giá sau giảm giá: {totalPriceAfterDiscount}</p>
            <p style={{ marginBottom: '5px' }}>Trạng thái đơn hàng: {orderStatus}</p>
            <p style={{ marginBottom: '5px' }}>Tháng: {month}</p>
            <p style={{ marginBottom: '5px' }}>Phương thức thanh toán: {paymentMethod}</p>
            <p style={{ marginBottom: '5px' }}>Ngày tạo: {dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
            <p style={{ marginBottom: '5px' }}>Ngày cập nhật: {dayjs(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</p>
          </div>
        </div>
        <button type="button" className="btn btn-primary w-25" onClick={handleUpdateOrderStatus}>
          Lưu đơn hàng
        </button>
      </form>
    </div>
  )
}

export default UpdateOrderStatus