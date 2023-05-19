import React, { useEffect,useState} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Main.scss'
import Logo from '../assets/logo1.svg'
import Welcome from '../components/Welcome'
import Send from '../assets/send.svg'
import Micro from '../assets/micro.svg'
import { getUser } from '../service/userService'
import { createHistory, getHistory} from '../service/historyService'
import { createQuestion } from '../service/questionService'
import ChatContainer from '../components/ChatContainer'
const Main = React.memo((props) => {
    console.log(props.childParamRef.current.id)
    const navigate = useNavigate();
    const [user,setUser] = useState('')
    // const [userID,setUserID] = useState('646351ef839941af7fbdcbb6')
    const [InputChat, setInputChat] = useState('');
    const [ArrHistory, setArrHistory] = useState('');
    const [ID] = useState(localStorage.getItem('userID'))
    const [IDHistory, setIDHistory] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
        // getPeople();
        getHistorys();
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
    useEffect(()=>{
        if(InputChat){
            console.log(InputChat)
        }
    },[InputChat])
    // const getPeople = async () => {
    //     let rp = await getUser(userID);
    //     if(rp){
    //         setUser(rp.data)
    //         console.log(rp.data);
    //         console.log(ID)
    //     }
    // }
    const getHistorys = async () => {
        let rp = await getHistory(ID);
        setArrHistory(rp)
        console.log(rp);
    }
    const handleSendChat = async () => {
        let title = InputChat
        let user_id = ID
        let data = {title, user_id}
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
    const handleClick = (id) => {
        console.log(id)
        setIsActive(!isActive);
        navigate(`/history/${id}`)
    }
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);
  

  
    const startListening = () => {
      if (recognition) {
        recognition.start();
      }
      
    };
  
    const stopListening = () => {
      if (recognition) {
        recognition.stop();
      }
    };
    // const classes = isActive ? 'btn active' : 'btn';
    const closeMenu = () => {
        // console.log('a');
        const menu = document.querySelector(".col-2")
        // console.log(menu.style.display)
        menu.style.position = 'absolute'
        menu.style.animation = "slideOutToLeft 0.2s forwards"
        // menu.style.display = 'none'
        
        document.querySelector(".col-10").style.pointerEvents = 'auto'
        document.querySelector(".col-10").style.opacity = 1
      }
  return (
    <div className='content-main'>
        <div className='row'>
            <div className='col-2' style={{animation: "slideInFromRight 0.2s ease-out"}}>
                <div style={{display:'flex', flexDirection: 'row',alignItems:'center'}}>
                    <div className='logo'>
                        <img src={Logo}></img> <span>Chat ABC</span>
                    </div>
                    <i onClick={()=>{closeMenu()}} type="button" class="icon-close fa-solid fa-chevron-left"></i>
                </div>
                <div className="search">
                    <i className="fa-solid fa-magnifying-glass input-group-append"></i>
                    <input className="input-search" placeholder="Tìm kiếm" />
                </div>
                <div className='btn'>
                    <button className='btn-add'>Thêm đoạn chat <i className="fa-solid fa-plus"></i></button>
                </div>
                { ArrHistory && ArrHistory.map((item, index)=>{
                    const classes = (item._id == props.childParamRef.current.id ? 'btn active' : 'btn') ;
                    return (
                        // <Link to={`/history/${item._id}`} key={index}>{item.title}</Link>
                        <div className={classes} key={index} onClick={()=>{handleClick(item._id)}}>
                            <button className='btn-chat'>{item.title}</button>
                        </div>
                    )
                })

                }
                <div className='setting justify-content-end'>
                    <button className='btn-setting'>
                        <i className="fa-solid fa-gear"></i><span>Setting</span>
                    </button>
                </div>
            </div>
            <div className='col-10'>
                {/* <Welcome /> */}
                <Outlet></Outlet>
                {/* <ChatContainer 
                History_id={IDHistory}
            /> */}

            </div>
            <div className='bg-menu'></div>

        </div>
    </div>
  )
})
export default Main;