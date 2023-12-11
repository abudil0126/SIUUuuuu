import React from 'react'
import './SignIn.css'
import { useState } from 'react'
import { NavLink,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Container } from '../../utils'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { instance } from "../../api";

const SignIn = () => {

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = (e) => {
    e.preventDefault();
    setLoading(true);
    instance.post("/api/auth/signup", {
        firstname,
        lastname,
        email,
        password
    })
      .then(response => {
        setLoading(false);
        if(response.status === 201){
          toast.success("You registered successfully");
          navigate("/login")
        }
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
        toast.error("Who is error?");
      })

  }

  return (
    <>
    <Container>
        <div className='login__wp'>
        <div className='signin__card'>
        <NavLink className={({isActive}) => isActive ? "login__logo" : "login__logo"} to="/">EASY &copy;</NavLink>
        <p className='login__p'>Sign Up</p>
        <form className='signin__form' onSubmit={handleCreateUser}>
        <input className='login__input' type="text" placeholder='Firstname' required value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
        <input className='login__input' type="text" placeholder='Lastname' required value={lastname} onChange={(e) => setLastname(e.target.value)}/>
        <input className='login__input' type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div className='password-wrapper'>
          <input className='login__password' type={isVisiblePassword ? "text" : "password"} placeholder='Your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
          {
            isVisiblePassword ? <IoEyeOff onClick={() => setIsVisiblePassword(false)} />  : <IoEye onClick={() => setIsVisiblePassword(true)}/>
          }
        </div>
        <p className='login__info'>Don’t you have an account? <a className='login__a' href="/login">Login</a>.</p>
        <button className='login__btn' type='submit' disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>
        </form>
        </div>
        </div>
    </Container>
    </>
  )
}

export default SignIn