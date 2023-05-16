import React from 'react'
import './Main.scss'
import Logo from '../assets/logo1.svg'
import Welcome from '../components/Welcome'
import Send from '../assets/send.svg'
import Micro from '../assets/micro.svg'
export default function() {
  return (
    <div className='content-main'>
        <div className='row'>
            <div className='col-2'>
                <div className='logo'>
                    <img src={Logo}></img> <span>Chat ABC</span>
                </div>
                <div className="search">
                    <i className="fa-solid fa-magnifying-glass input-group-append"></i>
                    <input className="input-search" placeholder="Tìm kiếm" />
                </div>
                <div className='btn'>
                    <button className='btn-add'>Thêm đoạn chat <i class="fa-solid fa-plus"></i></button>
                </div>
                <div className='setting justify-content-end'>
                    <button className='btn-setting'>
                        <i class="fa-solid fa-gear"></i><span>Setting</span>
                    </button>
                </div>
            </div>
            <div className='col-10'>
                <Welcome />
                <div className='chat'>
                    <input className='input-chat' placeholder='Type your message....'></input>
                    <img src={Micro}></img>
                    <img src={Send}></img>
                </div>
            </div>

        </div>
    </div>
  )
}
