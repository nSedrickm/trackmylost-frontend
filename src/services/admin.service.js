import axios from 'axios';

let API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.get('/sanctum/csrf-cookie')
export const registerAdminUser = ({ first_name, last_name, phone_number, town, password }) => {
    return axios.post("/admin/register",
        {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            town: town,
            password: password
        }).then(response => response)
}

export const adminLogin = async ({ phone_number, password }) => {
    return axios.post("/admin/login",
        {
            phone_number: phone_number,
            password: password
        }).then(response => response)
};

export const getAdminUser = () => {
    return axios.get("/admin/user")
        .then(response => response)
}

export const logOut = () => {
    return axios.get("/admin/logout")
        .then(response => response)
}

export const getToken = () => {
    return sessionStorage.getItem('MYLOST_ADMIN');
};

export const setToken = (token) => {
    sessionStorage.setItem('MYLOST_ADMIN', token);
};

export const removeToken = () => {
    sessionStorage.removeItem('MYLOST_ADMIN');
}

//agents 
export const registerUser = ({ first_name, last_name, phone_number, town, password }) => {
    return axios.post("/admin/users/", {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        town: town,
        password: password
    }).then(response => response)
}

export const getUsers = () => {
    return axios.get("/admin/users").then(response => response)
}

export const updateUser = ({ id, first_name, last_name, phone_number, town }) => {
    return axios.put("/admin/users/" + id, {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        town: town
    }).then(response => response)
}

export const deleteUser = (id) => {
    return axios.delete("/admin/users/" + id).then(response => response)
}