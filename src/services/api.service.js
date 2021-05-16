import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

export const registerItem = ({ document_type, first_name, other_names, phone_number, reward }) => {
    return axios.post("/items", {
        document_type: document_type,
        first_name: first_name,
        other_names: other_names,
        phone_number: phone_number,
        reward: reward
    }).then(response => response)
}

export const setAlert = ({ name, document_type, email, phone_number }) => {
    return axios.post("/alerts", {
        name: name,
        document_type: document_type,
        email: email,
        phone_number: phone_number
    }).then(response => response)
}
export const searchItem = ({ first_name }) => {
    return axios.get("/items",
        {
            params: {
                name: first_name
            }
        }).then(response => response)
}