import React, { useEffect, useState } from 'react'
import './Welcome.scss'
import { createHistory, getAllHistory } from '../service/historyService'
import { createQuestion } from '../service/questionService'
import Micro from '../assets/micro.svg'
import Send from '../assets/send.svg'
export default function () {
  const [InputChat, setInputChat] = useState('');
  const [ID] = useState(localStorage.getItem('userID'))
  const [IDHistory, setIDHistory] = useState('');
  const [ArrHistory, setArrHistory] = useState('');
  const [recognition, setRecognition] = useState(null);

  const getHistorys = async () => {
    let rp = await getAllHistory();
    setArrHistory(rp)
    console.log(rp);
  }
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;

    if (!SpeechRecognition) {
      console.log('Trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'vi-VN';

    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setInputChat(transcript);
    };

    setRecognition(recognitionInstance);
  }, [])
  const handleSendChat = async () => {
    let title = InputChat
    let user_id = ID
    let data = { title, user_id }
    let rp = await createHistory(data);
    let IDChat = rp.id;
    setIDHistory(IDChat)
    console.log(IDChat)
    let rp1 = await createQuestion({
      history_id: IDChat,
      content: InputChat,
      answer: InputChat,
      url_audio_content: 'hihi',
      url_audio_answer: "ahihi"
    })
    getHistorys();
    console.log(rp1);
  }
  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };
  const showMenu = () => {
    // console.log('a');
    const menu = document.querySelector(".col-2")
    // console.log(menu.style.display)
    menu.style.position = 'absolute'
    menu.style.animation = "slideInFromRight 0.2s ease-out"
    menu.style.display = 'block'
    document.querySelector(".col-10").style.pointerEvents = 'none'
    document.querySelector(".col-10").style.opacity = 0.5
  }
  return (
    <div className='content-welcome'>
      <div className='header-chat'>
        <i onClick={() => { showMenu() }} type='button' className="fa-solid fa-list" ></i>
      </div>
      <div className='title'>
        <div className='row'>
          <div style={{display:'flex',justifyContent:'center'}}>
            <h1>Welcome to ChatABC</h1>
          </div>
          <div className='col-4'><span>Example</span>
          </div>
          <div className='col-4'><span>Example</span></div>
          <div className='col-4'><span>Example</span></div>
        </div>
      </div>
      <div className='footer-chat'>
        <div className='chat'>
          <input className='input-chat'
            placeholder='Type your message....'
            onChange={(event) => { setInputChat(event.target.value) }}
            value={InputChat}>
          </input>
          <div className='group-button'>
            <img src={Micro} onClick={() => { startListening() }}></img>
            <img src={Send} onClick={() => { handleSendChat() }}></img>
          </div>
        </div>
      </div>
    </div>
  )
}
