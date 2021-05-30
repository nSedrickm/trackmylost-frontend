import React, { useState, useReducer, useContext, useEffect } from "react";
import toast from 'react-hot-toast';
import LoginPage from "Dashboard/LoginPage";
import RegisterPage from "Dashboard/RegisterPage";
import DashboardPage from "Dashboard/DashboardPage";
import NotFoundPage from "pages/NotFoundPage";
import AnimateLoader from "components/Loaders/AnimateLoader";
import Header from "components/headers/Header";

import { Redirect, Route, Switch } from "react-router-dom";
import { getUser, userLogin, logOut } from "services/auth.service";
import { registerItem, updateItem, deleteItem } from "services/api.service";
import { getLocalState, setLocalState, clearLocalState, clearItems } from "services/storage.service";

const AdminContext = React.createContext();
const useAdminContext = () => useContext(AdminContext);

const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            console.log("statebefore: ", state)
            return {
                ...state,
                isAuthorized: action.payload
            }
        }
        case "SETUSERDATA": {
            return {
                ...state,
                userData: action.payload
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                isAuthorized: action.payload.isAuthorized,
                userData: action.payload.userData
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

const notAuthorized = "notAuthorized";
const Authorized = "Authorized";

let localState = getLocalState();

let initialState = localState || {
    isAuthorized: notAuthorized,
    userData: {}
}

const AdminProvider = () => {

    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useReducer(
        Reducer, initialState);

    const { isAuthorized, userData } = state;

    useEffect(() => {
        setLocalState(state);
        initialState = getLocalState();
    }, [state])

    const handleLogin = (evt) => {
        evt.preventDefault();

        let formData = {
            phone_number: evt.target.elements.phone_number?.value,
            password: evt.target.elements.password?.value,
        }

        // console.log(formData);

        setLoading(true);

        userLogin(formData)
            .then(response => {
                // console.log(response.data);
                toast.success(response.data.message);
                handleGetUser();
                dispatch({
                    type: "LOGIN",
                    payload: Authorized
                });
                console.log("State efter: ", state);
                setTimeout(() => {
                    window.location.replace("/agent/dashboard")
                }, 1000)
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setLoading(false);
                    toast.error(error.response.data.message);
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

    //fetch user account details
    const handleGetUser = () => {
        getUser()
            .then(response => {
                dispatch({
                    type: "SETUSERDATA",
                    payload: response.data
                });
            })
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
                dispatch({
                    type: "LOGOUT",
                    payload: {
                        isAuthorized: notAuthorized,
                        userData: {}
                    }
                });
                clearLocalState();
                clearItems();
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

    const handleRegisterItem = (evt) => {
        evt.preventDefault();

        let formData = {
            document_type: evt.target.elements.document_type?.value,
            first_name: evt.target.elements.first_name?.value,
            other_names: evt.target.elements.other_names?.value,
            phone_number: evt.target.elements.phone_number?.value,
            reward: evt.target.elements.reward?.checked ? "yes" : "no"
        }
        console.log(formData);

        setLoading(true);
        registerItem(formData)
            .then(response => {
                console.log(response);
                toast.success(`Item ${formData.document_type} registered`);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
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

    const handleUpdateItem = (evt) => {
        evt.preventDefault();

        let formData = {
            id: evt.target.elements.id?.value,
            document_type: evt.target.elements.document_type?.value,
            first_name: evt.target.elements.first_name?.value,
            other_names: evt.target.elements.other_names?.value,
            phone_number: evt.target.elements.phone_number?.value,
            reward: evt.target.elements.reward?.checked ? "yes" : "no"
        }
        console.log(formData);

        setLoading(true);
        updateItem(formData)
            .then(response => {
                console.log(response);
                toast.success(`Item updated`);
                clearItems();
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
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

    const handleDeleteItem = (id) => {
        setLoading(true);
        deleteItem(id)
            .then(response => {
                toast.success(`Item deleted`);
                clearItems();
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
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
        <AdminContext.Provider
            value={{
                state,
                isAuthorized,
                userData,
                handleLogin,
                handleLogOut,
                handleRegisterItem,
                handleUpdateItem,
                handleDeleteItem
            }}
        >
            {state.isAuthorized === notAuthorized ? <Header /> : null}
            <Switch>
                <Route exact path="/agent/login">
                    {state.isAuthorized === Authorized ? <Redirect to="/agent/dashboard" /> : <LoginPage />}
                </Route>

                <Route exact path="/agent/sign-up">
                    <RegisterPage />
                </Route>

                <Route path="/agent/dashboard">
                    {state.isAuthorized === Authorized ? <DashboardPage /> : <Redirect to="/agent/login" />}
                </Route>

                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </AdminContext.Provider>
    );
};

export { useAdminContext, AdminProvider };
