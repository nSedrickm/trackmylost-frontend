
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