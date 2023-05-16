import React from "react";
import {Routes, Route} from 'react-router-dom'

import Login from './view/Login';
import SignUp from './view/SignUp';
import Main from "./view/Main";


function Router() {
    return (
        <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
            <Route path='/' element={<Main />}></Route>
        </Routes>
    )
}
export default Router;