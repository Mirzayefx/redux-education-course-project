import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getUser } from '../action/MainAction'

const Login = () => {
  if(localStorage.getItem('ACCESS_TOKEN')){
    window.location.href = '/dashboard'
}
  const [error,setError] = useState('')
  const [loginEmailInpValue, setLoginEmailInpValue] = useState('')
  const [loginPswInpValue, setLoginPswInpValue] = useState('')
  // const [loginUser, setLoginUser] = useState() 

  // useEffect(()=>{
  //   axios.get("https://itticoursebaku.pythonanywhere.com/api/accounts/")
  //   .then(resp=>{
  //     setLoginUser(resp.data)
  //     localStorage.setItem('users', JSON.stringify(loginUser))
  //     console.log(resp.data);
  //   })
  // },[])

  const loginSubmit =(e) => {
    e.preventDefault()

    const dataLogin = {
        email: loginEmailInpValue,
        password: loginPswInpValue
    }
    localStorage.setItem("loginEmail", dataLogin.email)
    // console.log(dataLogin);

    axios.post("https://itticoursebaku.pythonanywhere.com/api/token/", dataLogin,{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
      }
    }
    ).then(resp=>{
      // console.log(resp);
      localStorage.setItem('ACCESS_TOKEN', resp.data.access)
      if(resp.status === 200){
        Swal.fire({
          title: 'Welcome back!',
          text: 'You have successfully logged in',
          icon: 'success',
          type: "success"}).then(okay => {
            if (okay) {
             window.location.href = "/dashboard";
           }
        })
      }
      
    }).catch(err=>{
      Swal.fire({
        title: 'Error!',
        text: 'Unfortunately, could not verify this account',
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    })


  }
  const loginEmailInp =(e) => {
    setLoginEmailInpValue(e.target.value)
  }
  const loginPswInp =(e) => {
    setLoginPswInpValue(e.target.value)
  }



  // const dispatch=useDispatch()

 
  // useEffect(()=>{
  //   // dispatch(getUser()) 



  //   // axios.get(`https://itticoursebaku.pythonanywhere.com/api/account/${loggedEmail}/`, {
  //   //   headers: {
  //   //     Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
  //   //   }
  //   // })
  //   // .then(resp=>{
  //   //   console.log(resp.data);
  //   //   dispatch()
  //   //   localStorage.setItem("loggedInUser", JSON.stringify(resp.data))
  //   // })
  // },[])


  return (
    <div className='login_container'>
    <h1 className='login_topic'>LOGIN</h1>
    <form onSubmit={loginSubmit} className='login_form'>
      <label htmlFor="log_email">Email</label>
      <input required value={loginEmailInpValue} onChange={loginEmailInp} id='log_email' className='log_reg_inp' type="email" placeholder='Enter your email' />
      <label htmlFor="log_pass">Password</label>
      <input required value={loginPswInpValue} onChange={loginPswInp} id='log_pass' className='log_reg_inp' type="password" placeholder='Enter your password' />
      <Link to={"/register"}><span className='go_register'>Forgot password?</span></Link>
      <p>{error}</p>
      <button className='login_reg_btn'>Login</button>
    </form>
  </div>
  )
}

export default Login