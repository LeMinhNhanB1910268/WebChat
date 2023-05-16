import React from 'react'
import './Login.scss';
import {Routes, Route, Link} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Username from '../assets/user-octagon.svg'
import Password from '../assets/frame.svg'
export default function Login() {
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
                  <input placeholder='Username'></input>
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <img src={Password}></img>
                </div>
                <div className='col-9'>
                  <input placeholder='Password'></input>
                </div>
              </div>
              <button className='btn-login'>
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
