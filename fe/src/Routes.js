import React, {useEffect, useRef,useState} from "react";
import { Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './view/LoginPage';
import Main from "./view/Main";
import ChatContainer from "./components/ChatContainer";
import Welcome from "./components/Welcome";
import WelcomePage from"./view/WelcomePage"
import { createHistory, getHistory} from '../src/service/historyService'
function Router() {
    const childParamRef = useRef('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [History,setHistory ]= useState('')
    const getHistorys = async () => {
        const id = localStorage.getItem('user_i')
        let rp = await getHistory(id);
        setHistory(rp)
    }
    useState(()=>{
        getHistorys();
        const token = localStorage.getItem('token');
        const user_i = localStorage.getItem('user_i');
        // console.log(user_i)
        if(token || user_i){
            setIsLoggedIn(true)
        }
    })
    
    const handleChildParam = (param) => {
        childParamRef.current = param;
    };
    return (
        <Routes>
            <Route path="/welcome" element = {<WelcomePage />}/>
            <Route path='/auth/:params' element= {<LoginPage />}/>
            {/* <Route path='/sign-up' element={<SignUp />}/> */}
            <Route path='/' element={isLoggedIn ? <Main getHistorys ={getHistorys} childParamRef={childParamRef} History={History} meta={{ requiresAuth: true }}/> : <Navigate to="auth/Login" />}>
                <Route path='/' element={<Welcome getHistorys ={getHistorys}/>} />
                <Route path='/history/:id' element={<ChatContainer handleChildParam={handleChildParam}/>} />
            </Route>
        </Routes>
    )
}
export default Router;
