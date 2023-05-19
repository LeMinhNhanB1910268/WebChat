import axios from 'axios'
import createApiClient from "./apiService";
const api = createApiClient(' http://127.0.0.1:5000/');

const getAllHistory = async () => {
    return (await api.get('api/history')).data;
}

const getHistory = async (historyID) => {
    return (await api.get('api/history/user_id='+historyID)).data;
}

const createHistory = async (data) => {
    return (await api.post('api/history',data)).data
}

const updateHistory = async (historyID, data) => {
    return (await api.put('api/history/'+historyID, data)).data
}

const deleteHistory = async (historyID) => {
    return (await api.delete('api/history/'+historyID))
}

export {
    getAllHistory,
    getHistory,
    createHistory,
    updateHistory,
    deleteHistory,
}