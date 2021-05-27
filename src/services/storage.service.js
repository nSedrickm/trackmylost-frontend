
// localStorage API helper

export const saveItems = (data) => {
    localStorage.setItem("TrackMyLostItems", JSON.stringify(data))
}

export const getSavedItems = () => {
    return JSON.parse(localStorage.getItem("TrackMyLostItems"))
}

export const clearItems = () => {
    localStorage.removeItem("TrackMyLostItems")
}