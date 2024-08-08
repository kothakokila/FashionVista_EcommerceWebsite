import './App.css';
import { Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux';
import Login from './Components/Login/login';
import Signup from './Components/Login/signUp';
import Navbar from './Components/layout/navbar';
import Home from './Components/WelcomePage/Home';
import ViewProductCard from './Components/Product_Card/ViewProductCard';
import Mens from './Components/pages/mens';
import Womens from './Components/pages/womens';
import Kids from './Components/pages/kids';
import HomeLiving from './Components/pages/homeLiving';
import Accessories from './Components/pages/accessories';
import Beauty from './Components/pages/beauty';
import Wishlist from './Components/Wishlist/wishlist';
import Cart from './Components/Cart/cart';
import AboutUs from './Components/Footer/AboutUs';
import ContactUs from './Components/Footer/ContactUs';
import PaymentPage from './Components/Payment/paymentPage';
import OrderHistoryPage from './Components/OrderHistory/OrderHistoryPage';
import RequestCode from './Components/ForgetPassword/requestCode';
import ValidateCode from './Components/ForgetPassword/validateCode';
import ResetPassword from './Components/ForgetPassword/resetPassword';



function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/mens" element={<Mens />} />
              <Route path="/womens" element={<Womens />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/home-living" element={<HomeLiving />} />
              <Route path="/beauty" element={<Beauty />} />
              <Route path="/product/:id" element={<ViewProductCard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<PaymentPage />}/>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/orderHistory" element={<OrderHistoryPage />}/>
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/user/login" element={<Login />} />
            <Route path="/forget-password" element={<RequestCode/>} />
            <Route path="/validatecode" element={<ValidateCode/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/user/login" />} />
          </Routes> 
         )} 
    </div>
  );
}

export default App;
