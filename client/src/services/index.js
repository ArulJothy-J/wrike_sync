import axios from "axios";

const endpoint = 'http://localhost:3001';

const getToken = () => {
    return localStorage.getItem('token');
};

const axiosRequest = (url, method, data) => {
    return axios({
        url: endpoint + url,
        method: method,
        headers: {
            authorization: `Bearer ${getToken()}`
        },
        data
    });
};

const getCalender = (start) => {
    return axiosRequest(`/calendar?start=${start}`, 'get');
}

const getCategories = () => {
    return axiosRequest('/categories', 'get');
};

const updateTimelog = (data) => {
    return axiosRequest('/updatetimelog', 'post', data);
};

export {
    getCalender,
    getCategories,
    updateTimelog
};
