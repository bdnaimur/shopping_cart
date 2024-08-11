import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
function App() {
  return (
    <>
     <Router>
     <Header/>
      {/* <Navbar /> */}
      <Routes>
        
         <Route path="/" element={<Home />} />
         <Route path="/cart" element={<Cart />} />
       
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
