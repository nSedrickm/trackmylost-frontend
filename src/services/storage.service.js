
// localStorage API helper

export const setLocalState = (state) => {
    sessionStorage.setItem("TrackMyLost", JSON.stringify(state))
}

export const getLocalState = () => {
    return JSON.parse(sessionStorage.getItem("TrackMyLost"));
}

export const clearLocalState = () => {
    sessionStorage.removeItem("TrackMyLost");
}

export const saveItems = (data) => {
    localStorage.setItem("TrackMyLostItems", JSON.stringify(data))
}

export const getSavedItems = () => {
    return JSON.parse(localStorage.getItem("TrackMyLostItems"))
}

export const clearItems = () => {
    localStorage.removeItem("TrackMyLostItems")
}

// storage management for Admin section
export const setLocalAdminState = (state) => {
    sessionStorage.setItem("TrackMyLostAdmin", JSON.stringify(state))
}

export const getLocalAdminState = () => {
    return JSON.parse(sessionStorage.getItem("TrackMyLostAdmin"));
}

export const clearLocalAdminState = () => {
    sessionStorage.removeItem("TrackMyLostAdmin");
}

export const saveAdminItems = (data) => {
    localStorage.setItem("TrackMyLostAdminItems", JSON.stringify(data))
}

export const getSavedAdminItems = () => {
    return JSON.parse(localStorage.getItem("TrackMyLostAdminItems"))
}

export const clearAdminItems = () => {
    localStorage.removeItem("TrackMyLostAdminItems")
}

export const saveAdminAlerts = (data) => {
    localStorage.setItem("TrackMyLostAdminAlerts", JSON.stringify(data))
}

export const getSavedAdminAlerts = () => {
    return JSON.parse(localStorage.getItem("TrackMyLostAdminAlerts"))
}

export const clearAdminAlerts = () => {
    localStorage.removeItem("TrackMyLostAdminAlerts")
}