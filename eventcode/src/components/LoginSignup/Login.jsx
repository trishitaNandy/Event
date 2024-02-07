import React, { useContext } from 'react'
import './LoginSignup.css'
import { useRef, useState, useEffect } from "react";
import { Link,  useLocation,useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth"
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LOGIN_URL='/auth/login';   //This has to match with backend URL
const Login = () => {
  const navigate=useNavigate();
    

  const {setAuth}=useAuth();

  
  const userRef=useRef();
  const errRef=useRef();

  const [loginDetail,setLoginDetail]=useState({
    username:'',
    password:''
  })
  const [errMsg, setErrMsg] = useState('');

  useEffect(()=>{
    userRef.current.focus();
  },[])

  useEffect(()=>{
    setErrMsg('');
  },[loginDetail.username,loginDetail.password])

  const handleChange=(e,field)=>{
    let actualValue=e.target.value
    setLoginDetail({
        ...loginDetail,
        [field]:actualValue
    })
  }
  const handleSubmit=async(event)=>{
    event.preventDefault();
    try{
      const response=await axios.post(LOGIN_URL,
          JSON.stringify({email:loginDetail.username,password:loginDetail.password}),
          {
              headers:{'Content-Type':'application/json'},
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      localStorage.setItem('token',response.data.jwtToken);
      localStorage.setItem('userId',response.data.userId);
      
      
      setAuth({loginDetail});
      setLoginDetail({
        username: '',
        password: ''
      });

      console.log("successful login")
      
      navigate("/home");

    }catch(err){
      if(!err?.response){
          setErrMsg('No server response');
          console.log(err)
      }else if(err.response?.status===400){
          setErrMsg('Wrong username or password');
      }else if(err.response?.status===401){
          setErrMsg('Unauthorized');
      }else{
          setErrMsg('Login failed');
      }
      errRef.current.focus();

   }
  }


  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form className='container' onSubmit={handleSubmit}>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <label htmlFor="username">
                      <img src={email_icon} alt=""/>
                    </label>
                    <input 
                      type="text"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e)=>handleChange(e,'username')}
                      value={loginDetail.username}
                      required
                      placeholder='Email Id' 
                    />
                </div>
                <div className='input'>
                      <label htmlFor="password">
                        <img src={password_icon} alt=""/>
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e)=>handleChange(e,'password')}
                        value={loginDetail.password}
                        required
                        placeholder='Password'
                      />

                </div>
            </div>
            <div className='submit-container'>
                <button className='submit'>Login</button>
            </div>
            <p className="line">
                Need an Account?<br />
                <span >
                    {/*Router link here*/}
                    <a href="/">Sign Up</a>
                </span>
            </p>
      </form>
    </section>
  )
}

export default Login