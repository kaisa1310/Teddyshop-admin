import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Resetpassword from './pages/Resetpassword'
import Forgotpassword from './pages/Forgotpassword'
import MainLayout from './components/MainLayout'
import Users from './pages/Users'
import ManagerAdmin from './pages/ManagerAdmin'
import ManagerStaff from './pages/ManagerStaff'
import AddMember from './pages/AddMember'
import BrandList from './pages/BrandList'
import AddBrand from './pages/AddBrand'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import ProcatList from './pages/ProcatList'
import AddProcat from './pages/AddProCat'
import Orders from './pages/Orders'
import BlogCatList from './pages/BlogCatList'
import AddBlogCat from './pages/AddBlogCat'
import Blogs from './pages/Blogs'
import AddBlog from './pages/AddBlog'
import Events from './pages/Events'
import AddEvent from './pages/AddEvent'
import Feedbacks from './pages/Feedbacks'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="manager-admin" element={<ManagerAdmin />} />
          <Route path="manager-staff" element={<ManagerStaff />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="edit-member/:id" element={<AddMember />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand-add" element={<AddBrand />} />
          <Route path="brand-edit/:id" element={<AddBrand />} />
          <Route path="product-list" element={<Products />} />
          <Route path="product-add" element={<AddProduct />} />
          <Route path="procat-list" element={<ProcatList />} />
          <Route path="procat-add" element={<AddProcat />} />
          <Route path="procat-edit/:id" element={<AddProcat />} />
          <Route path="order-list" element={<Orders />} />
          <Route path="blog-category-list" element={<BlogCatList />} />
          <Route path="blog-category-add" element={<AddBlogCat />} />
          <Route path="blog-list" element={<Blogs />} />
          <Route path="blog-add" element={<AddBlog />} />
          <Route path="event-list" element={<Events />} />
          <Route path="event-add" element={<AddEvent />} />
          <Route path="feedbacks" element={<Feedbacks />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
