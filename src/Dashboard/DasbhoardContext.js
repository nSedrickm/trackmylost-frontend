import AnimateLoader from "components/Loaders/AnimateLoader";
import React, { useState, useContext } from "react";
import toast from 'react-hot-toast';
import { getUser, logOut, removeToken } from "services/auth.service";

const DashContext = React.createContext();

const DashProvider = ({ children }) => {

    const notAuthorized = "notAuthorized";
    const Authorized = "Authorized";

    const [isAuthorized, setAuthStatus] = useState(notAuthorized);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleGetUser = () => {
        getUser().then(response => setUserData(response.data))
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("Could not get agent details. Please log out and login again");
                    setLoading(false);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                }
            });
    }

    const handleLogOut = () => {
        setLoading(true);
        logOut()
            .then(response => {
                toast.success(response.data.message);
                removeToken();
                setUserData({});
                setAuthStatus(notAuthorized);
                setTimeout(() => { window.location.replace("/agent/login") }, 1000)
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occurred Please check your network and try again");
                    setLoading(false);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                }
            });
    }

    if (loading) {
        return (
            <AnimateLoader />
        );
    }

    return (
        <DashContext.Provider
            value={{
                isAuthorized,
                Authorized,
                notAuthorized,
                setAuthStatus,
                userData,
                handleLogOut,
            }}
        >
            {children}
        </DashContext.Provider>
    );
};


const useDashContext = () => useContext(DashContext);

export { useDashContext, DashProvider };
