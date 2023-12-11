import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Home from './components/homepage/Home'
import LogIn from './components/login/LogIn'
import SignIn from './components/signin/SignIn'
import SingleProduct from './components/singleproduct/SingleProduct'
import Dashboard from './components/dashboard/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="singleproduct/:id" element={<SingleProduct />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
