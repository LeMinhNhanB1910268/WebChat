import axios from "axios";
const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: process.env.DATABASE_PORT=5000,
    headers: {Authorization: `Bearer ${token}`},

})
export {instance}