import React, { useEffect,useState} from 'react'
import './Login.scss';
import {Routes, Route, Link} from 'react-router-dom'
import { useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.svg'
import Username from '../assets/user-octagon.svg'
import Password from '../assets/frame.svg'
import {Login} from '../service/AuthService'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function LoginPage() {
  const navigate = useNavigate();
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [isShowPassword,setisShowPassword] = useState(false)

  const handleLogin = async () => {
    let isValid = true;
    if(isValid){
      const data = {username, password};
      console.log(data);
      let rp = await Login(data);
      console.log('haha',rp);
      if(rp){
        localStorage.setItem('token', rp.data.token);
        localStorage.setItem('userID', rp.data.id);
        navigate('../');
      }

    }
  }
  const handleShowHidenPassword = () => {
    setisShowPassword(!isShowPassword)
  }
  return (
    <div className="Content-login">
      <div className='row'>
        <div className='col-5'>
          <div className='login-left'>
            <img className='logo' src={Logo}></img>
            <div className='text-login'>
              <span>Welcome to LOGIN CHATABC</span>
            </div>
          </div>
        </div>
        <div className='col-1'>
          <div className="vertical-line"></div>
        </div>
        <div className='col-6'>
          <div className='login'>
            <div className='title-login'>
              <span>Sign-in Your Account</span>
            </div>
            <div className='input-login'>
              <div className='row'>
                  <div className='col-3'>
                    <img src={Username}></img>
                  </div>
                  <div className='col-9'>
                    <input placeholder='Username'
                      onChange={(event)=>{setUsername(event.target.value)}}
                      value ={username}>
                  </input>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-3'>
                    <img src={Password}></img>
                  </div>
                  <div className='col-9'>
                    <input placeholder='Password'
                      type={isShowPassword ? 'text' : 'password'}
                      onChange={(event)=>{setPassword(event.target.value)}}
                      value ={password}>
                    </input>
                    <span onClick={()=>{handleShowHidenPassword()}}>
                      <i className={isShowPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}></i>
                    </span>
                  </div>
                </div>
              <button className='btn-login' onClick={()=>{handleLogin()}}>
                  Log in
              </button>
            </div>
            <div className='footer-login'>
              <div className='row'>
                <div className='col-9'>
                  <span>Don't have an account?</span>
                </div>
                <div className='col-3'>
                  <Link to='/sign-up'>
                    <span>Sign up</span>
                  </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
