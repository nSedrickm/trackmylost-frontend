import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.get('/sanctum/csrf-cookie')

// item routes
export const registerItem = ({ document_type, first_name, other_names, phone_number, reward }) => {
    return axios.post("/api/items", {
        document_type: document_type,
        first_name: first_name,
        other_names: other_names,
        phone_number: phone_number,
        reward: reward
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

export const getRecentItems = () => {
    return axios.get("/api/items",
        {
            params: {
                recent: ""
            }
        }).then(response => response)
}

export const getItems = () => {
    return axios.get("/api/items").then(response => response)
}

export const getUserItems = (phone_number) => {
    return axios.get("/api/items",
        {
            params: {
                phone_number: phone_number
            }
        }).then(response => response)
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

export const deleteItem = (id) => {
    return axios.delete("/api/items/" + id).then(response => response)
}

// notification routes
export const getNotifications = () => {
    return axios.get("/api/notifications").then(response => response)
}
export const deleteNotification = (id) => {
    return axios.delete("/api/notifications/" + id).then(response => response)
}

// alert routes
export const setAlert = ({ name, document_type, phone_number }) => {
    return axios.post("/api/alerts", {
        name: name,
        document_type: document_type,
        phone_number: phone_number
    }).then(response => response)
}

export const getAlerts = () => {
    return axios.get("/api/alerts").then(response => response)
}

export const updateAlert = ({ id, name, document_type, phone_number }) => {
    return axios.put("/api/alerts/" + id, {
        name: name,
        document_type: document_type,
        phone_number: phone_number,
    }).then(response => response)
}

export const deleteAlert = (id) => {
    return axios.delete("/api/alerts/" + id).then(response => response)
}