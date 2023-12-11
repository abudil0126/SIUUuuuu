import React from 'react'
import { useState } from 'react'
import './LogIn.css'
import { NavLink } from "react-router-dom";
import { Container } from '../../utils'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { instance } from '../../api';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const handleLoginUser = (e) => {
    e.preventDefault();
    setLoading(true)
    instance.post("/api/auth/login", {
      email: email,
      password: password
    })
      .then((response) => {
        setLoading(false)
        if (response.status === 200) {
          toast.success("You have logged in successfully!")
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        }
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
        toast.error("Who is error?")
      });
  }

  return (
    <>
      <Container>
        <div className='login__wp'>
          <div className='login__card'>
            <NavLink className={({ isActive }) => isActive ? "login__logo" : "login__logo"} to="/">EASY &copy;</NavLink>
            <p className='login__p'>Login</p>
            <form className='login__form' onSubmit={handleLoginUser}>
                <input
                className='login__input'
                type="email"
                placeholder='Email'
                required
                value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='password-wrapper'>
                <input
                  className='login__password'
                  type={isVisiblePassword ? "text" : "password"}
                  placeholder='Password'
                  required
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                {
                  isVisiblePassword ? <IoEyeOff onClick={() => setIsVisiblePassword(false)} /> : <IoEye onClick={() => setIsVisiblePassword(true)} />
                }
              </div>
              <p className='login__info'>Don’t you have an account? <a className='login__a' href="/signin">Sign Up</a>.</p>
              <button className='login__btn' type='submit' disabled={loading}>Login</button>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}

export default LogIn