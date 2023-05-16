import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Username from '../assets/user-octagon.svg'
import Password from '../assets/frame.svg'
import './SignUp.scss'
export default function SignUp() {
  return (
    <div className="Content-SignUp">
      <div className='row'>
        <div className='col-6'>
          <div className='signup'>
            <div className='title-signup'>
              <span>Sign-in Your Account</span>
            </div>
            <div className='input-signup'>
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
              <div className='row'>
                <div className='col-3'>
                  <img src={Password}></img>
                </div>
                <div className='col-9'>
                  <input placeholder='Re-Password'></input>
                </div>
              </div>
              <button className='btn-signup'>
                  Sign Up
              </button>
            </div>
            <div className='footer-signup'>
              <div className='row'>
                <div className='col-9'>
                  <span>Already have an account?</span>
                </div>
                <div className='col-3'>
                  <Link to='/login'><span>Log in</span></Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-1'>
          <div className="vertical-line"></div>
        </div>
        <div className='col-5'>
          <div className='signup-left'>
            <img className='logo' src={Logo}></img>
            <div className='text-signup'>
              <span>Welcome to signup CHATABC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
