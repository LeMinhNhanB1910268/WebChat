import React, {useRef} from "react";
import { Routes, Route } from 'react-router-dom'

import LoginPage from './view/LoginPage';
import SignUp from './view/SignUp';
import Main from "./view/Main";
import ChatContainer from "./components/ChatContainer";
import Welcome from "./components/Welcome";


function Router() {
    const childParamRef = useRef('');
    // console.log(childParamRef)
    const handleChildParam = (param) => {
        // Lưu giá trị param vào ref
        childParamRef.current = param;
        // console.log(param);
    };
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />}>
            </Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
            <Route path='/' element={<Main childParamRef={childParamRef}/>}>
                <Route path='/' element={<Welcome />} />
                <Route path='/history/:id' element={<ChatContainer handleChildParam={handleChildParam}/>} />
            </Route>
        </Routes>
    )
}
export default Router;