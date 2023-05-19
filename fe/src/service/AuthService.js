import axios from 'axios'
import createApiClient from "./apiService";
const api = createApiClient(' http://127.0.0.1:5000/');

const Login = async(data) => {
    console.log('dataLogin',data)
    return (await api.post('api/login',data))
}

const Register = async (data) => {
    console.log(data)
    return await api.post('api/register',data)
}



export {
    Login,
    Register
}

