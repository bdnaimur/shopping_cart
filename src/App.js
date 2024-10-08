import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import ProductList from "./components/product/DummyProducts";
import Checkout from "./components/checkout/Checkout";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import LoginPage from "./components/authenticate/Login";
import SignUpPage from "./components/authenticate/SignUp";
function App() {
  return (
    <>
     <Router>
     <Header/>
      {/* <Navbar /> */}
      <Routes>
      <Route path="/" element={<Home />} />
        
         <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignUpPage />} />
         {/* <Route path="/" element={<ProductList />} /> */}
         <Route path="/cart" element={<Cart />} />
         <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
       
       {/* <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
