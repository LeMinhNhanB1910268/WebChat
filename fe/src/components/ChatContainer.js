import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHistory } from '../service/historyService'
import './ChatContainer.scss'
import Audo from '../assets/audio.svg'
import { getQuestion } from '../service/questionService'
import { createHistory, getAllHistory } from '../service/historyService'
import { createQuestion } from '../service/questionService'
import Micro from '../assets/micro.svg'
import Send from '../assets/send.svg'
import axios from 'axios'

export default function ChatContainer(props) {
  const [history, setHistory] = useState('')
  const [question, setQuestion] = useState('')
  const [InputChat, setInputChat] = useState('');
  const [recognition, setRecognition] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const [ID] = useState(localStorage.getItem('userID'))
  const { id } = params;
  // console.log(id);
  useEffect(() => {

    // const ID = props.History_id;
    // console.log(props.History_id);
    // setHistory(id)
    // console.log(history)
    var objDiv = document.querySelector(".Chatbox")
    var scrollHeight = objDiv.scrollHeight;
    objDiv.scrollTop = scrollHeight;  
  }, [question])
  useEffect(() => { 
    if (id) {
      getAHistory();
      getChat();
    }
  }, [id])
  useEffect(() => {
    // Truyền giá trị param lên ref
    props.handleChildParam(params);
  }, [props.handleChildParam, params]);
  useEffect(()=>{
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
  },[])
  const getAHistory = async () => {
    // console.log('ID', id)
    let rp = await getQuestion(id)
    console.log('ahuuh', rp)
  }
  const getChat = async () => {
    let rp = await getQuestion(id);
    setQuestion(rp)
    console.log(rp);
  }
  const play_Audio = () => {
    const audio = new Audio('https://chunk.lab.zalo.ai/7feba81d037eea20b36f/7feba81d037eea20b36f');
    audio.play();
  }
  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };
  const handleSendChat = async () => {
    const formdata = new URLSearchParams()
    formdata.append('input', InputChat)
    axios.post('https://api.zalo.ai/v1/tts/synthesize', formdata,
      {
        headers: {
          apikey: 'Wn5P5FrSoPb1uJhb2t8TOI8gkpStUVPj',
        }
      }).then(async res => {
        console.log();
        let rp1 = await createQuestion({
          history_id: id,
          content: InputChat,
          answer: InputChat,
          url_audio_content: res.data.data.url,
          url_audio_answer: res.data.data.url
        })
        // const timeoutId = setTimeout(() => {
        //   setIsOpen(true);
        // }, 4000);
        getChat();

        console.log(rp1);
      }).catch(e => console.log(e))
    // let title = InputChat
    // let user_id = ID
    // let data = {title, user_id}
    // let rp = await createHistory(data);
    // let IDChat = rp.id;
    // setIDHistory(IDChat)
    // console.log(IDChat)
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
    menu.style.display = 'block'
    document.querySelector(".col-10").style.pointerEvents = 'none'
    document.querySelector(".col-10").style.opacity = 0.5
  }
  return (
    <div className='content-chat'>
       <div className='header1-chat'>
          <i onClick={() => { showMenu() }} type='button' className="fa-solid fa-list" ></i>
        </div>
      <div className='Chatbox'>
        {
          question && question.map((item, index) => {
            return (
              <div key={index}>
                <div className='chat-user'>
                  <div className='chat-item'>
                    <div className='chatUser'>
                      <p>{item.content}</p>
                    </div>
                    <hr className='space'></hr>
                    <div className='operation'>
                      <div className='ahuhu'>
                        <span><i className="fa-regular fa-clipboard"></i></span>
                        <span type="button" onClick={() => { playAudio(item.url_audio_content) }}><img src={Audo}></img></span>
                      </div>
                      <div>
                        <span>Thowfi gian</span>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  item.answer !== null ?
                    (<div className='chat-bot'>
                      <div className='chat-item'>
                        <div className='chatUser'>
                          <p>{item.answer}</p>
                        </div>
                        <hr className='space'></hr>
                        <div className='operation'>
                          <div className='ahuhu'>
                            <span><i className="fa-regular fa-clipboard"></i></span>
                            <span><i className="fa-solid fa-thumbs-up"></i></span>
                            <span><i className="fa-solid fa-thumbs-down"></i></span>
                            <span type="button" onClick={() => { playAudio(item.url_audio_content) }}><img src={Audo}></img></span>
                          </div>
                          <div>
                            <span>Thowfi gian</span>
                          </div>
                        </div>
                      </div>
                    </div>) : null
                }
              </div>
            )
          })
        }
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
