import axios from "axios";

const getToken = () => {
    return localStorage.getItem('token');
};

const getCalender = () => {
    return axios({
        url: 'http://localhost:3001/calendar',
        method: 'get',
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    });
};

const getCategories = () => {
    return axios({
        url: 'http://localhost:3001/categories',
        method: 'get',
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    });
};

export {
    getCalender,
    getCategories
};
