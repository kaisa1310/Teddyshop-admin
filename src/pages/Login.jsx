import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Đăng nhập</h3>
        <p className="text-center">Đăng nhập bằng tài khoản để tiếp tục.</p>
        <form>
          <CustomInput type="email" label="Email" id="email" />
          <CustomInput type="passworrd" label="Mật khẩu" id="pass" />
          <div className="my-3 text-end">
            <Link to="/forgot-password">Quên mật khẩu.</Link>
          </div>
          <Link
            to="/admin"
            className="rounded-2 border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
            style={{ background: '#ffd333' }}
          >
            Đăng nhập
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
