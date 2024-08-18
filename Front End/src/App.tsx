import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import SignUpPage from './pages/signup/signup';
import LoginPage from './pages/login/login';
import PromotionsPage from './components/promotions/promotions';
import MenuPage from './pages/MenuPage/MenuPage';
import AdminDashboard from './pages/Admin/admin-dashboard/admin-dashboard';
import AdminUsersPage from './pages/Admin/view-user/view-user';
import AddMenu from './pages/Admin/menu/menu-add';
import AdminAddUser from './pages/Admin/admin-add/admin-manage';
import AddPromotion from './pages/Admin/promotion/promotion-add';
import CheckoutPage from './pages/checkout/checkout';
import OrdersPage from './pages/Admin/view-order/vieworder';
import ContactUsPage from './pages/contact/contact';
import ViewMessagesPage from './pages/Admin/contact/contact';
import OrderDetailsPage from './pages/Dashboard/dashboard';
import AdminLogin from './pages/Admin/login/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/add-menu" element={<AddMenu />} />
        <Route path="/admin/add-user" element={<AdminAddUser />} />
        <Route path="/admin/add-promotion" element={<AddPromotion />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="admin/orders" element={<OrdersPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/admin/message" element={<ViewMessagesPage />} />
        <Route path="/order" element={<OrderDetailsPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />


      </Routes>
    </BrowserRouter>
  );
}
export default App;
