import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.get('/sanctum/csrf-cookie')

export const registerItem = ({ document_type, first_name, other_names, phone_number, reward }) => {
    return axios.post("/api/items", {
        document_type: document_type,
        first_name: first_name,
        other_names: other_names,
        phone_number: phone_number,
        reward: reward
    }).then(response => response)
}

export const setAlert = ({ name, document_type, email, phone_number }) => {
    return axios.post("/api/alerts", {
        name: name,
        document_type: document_type,
        email: email,
        phone_number: phone_number
    }).then(response => response)
}

export const searchItem = ({ name }) => {
    return axios.get("/api/items",
        {
            params: {
                name: name
            }
        }).then(response => response)
}

export const getItems = () => {
    return axios.get("/api/items").then(response => response)
}

export const getAlerts = () => {
    return axios.get("/api/alerts").then(response => response)
}

export const updateItem = ({ id, document_type, first_name, other_names, phone_number, reward }) => {
    return axios.put("/api/items/" + id, {
        document_type: document_type,
        first_name: first_name,
        other_names: other_names,
        phone_number: phone_number,
        reward: reward
    }).then(response => response)
}