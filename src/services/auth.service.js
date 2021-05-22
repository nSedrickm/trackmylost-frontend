import axios from 'axios';

let API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.get('/sanctum/csrf-cookie')
export const registerUser = ({ first_name, last_name, phone_number, town, password }) => {
    return axios.post("/api/register",
        {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            town: town,
            password: password
        }).then(response => response)
}

export const userLogin = async ({ phone_number, password }) => {
    return axios.post("/api/login",
        {
            phone_number: phone_number,
            password: password
        }).then(response => response)
};

export const getUser = () => {
    return axios.get("/api/user")
        .then(response => response)
}

export const logOut = () => {
    return axios.get("/api/logout")
        .then(response => response)
}

export const getToken = () => {
    return sessionStorage.getItem('MYLOST_TOKEN');
};

export const setToken = (token) => {
    sessionStorage.setItem('MYLOST_TOKEN', token);
};

export const removeToken = () => {
    sessionStorage.removeItem('MYLOST_TOKEN');
}
