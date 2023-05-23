import axios from 'axios'
import createApiClient from "./apiService";
const api = createApiClient(' http://127.0.0.1:5000/');

const Login = async(data) => {
    return await api.post('api/login',data)
}

const Register = async (data) => {
    return await api.post('api/register',data)
}
export {
    Login,
    Register
}

