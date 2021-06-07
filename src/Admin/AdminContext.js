import React, { useState, useReducer, useContext, useEffect } from "react";
import toast from 'react-hot-toast';
import LoginPage from "Admin/LoginPage";
import RegisterPage from "Admin/RegisterPage";
import DashboardPage from "Admin/DashboardPage";
// import NotFoundPage from "pages/NotFoundPage";
import AnimateLoader from "components/Loaders/AnimateLoader";

import { Redirect, Route, Switch } from "react-router-dom";
import { getAdminUser, adminLogin, logOut, registerUser, updateUser, deleteUser } from "services/admin.service";
import { registerItem, updateItem, deleteItem, setAlert, updateAlert, deleteAlert } from "services/api.service";
import { getLocalAdminState, setLocalAdminState, clearLocalAdminState, clearAdminItems, clearAdminAlerts, clearUsers } from "services/storage.service";

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

let localState = getLocalAdminState();

let initialState = localState || {
    isAuthorized: notAuthorized,
    userData: {}
}

const AdminProvider = () => {

    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useReducer(Reducer, initialState);

    const { isAuthorized, userData } = state;

    useEffect(() => {
        setLocalAdminState(state);
        initialState = getLocalAdminState();
    }, [state])

    const handleLogin = (evt) => {
        evt.preventDefault();

        let formData = {
            phone_number: evt.target.elements.phone_number?.value,
            password: evt.target.elements.password?.value,
        }

        setLoading(true);

        adminLogin(formData)
            .then(response => {
                toast.success(response.data.message);
                handleGetUser();
                dispatch({
                    type: "LOGIN",
                    payload: Authorized
                });
                setTimeout(() => {
                    window.location.replace("/admin/dashboard")
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
        getAdminUser()
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
                clearLocalAdminState();
                clearAdminItems();
                clearAdminAlerts();
                clearUsers();
                //set timeout so the state gets properly cleared
                setTimeout(() => { window.location.replace("/admin/login") }, 1000)
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
                clearAdminItems();
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
                clearAdminItems();
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
                clearAdminItems();
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

    const handleSetAlert = (evt) => {
        evt.preventDefault();

        let formData = {
            name: evt.target.elements.name?.value,
            document_type: evt.target.elements.document_type?.value,
            phone_number: evt.target.elements.phone_number?.value,
        }
        console.log(formData);

        setLoading(true);
        setAlert(formData)
            .then(response => {
                console.log(response);
                toast.success(`Alert for ${formData.name} set`);
                clearAdminAlerts();
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

    const handleUpdateAlert = (evt) => {
        evt.preventDefault();

        let formData = {
            id: evt.target.elements.id?.value,
            name: evt.target.elements.name?.value,
            document_type: evt.target.elements.document_type?.value,
            phone_number: evt.target.elements.phone_number?.value,
        }
        console.log(formData);

        setLoading(true);
        updateAlert(formData)
            .then(response => {
                console.log(response);
                toast.success(`Alert updated`);
                clearAdminAlerts();
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

    const handleDeleteAlert = (id) => {
        setLoading(true);
        deleteAlert(id)
            .then(response => {
                toast.success(`Alert deleted`);
                clearAdminAlerts();
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

    const handleRegisterAgent = (evt) => {
        evt.preventDefault();

        let formData = {
            first_name: evt.target.elements.first_name?.value,
            last_name: evt.target.elements.last_name?.value,
            phone_number: evt.target.elements.phone_number?.value,
            town: evt.target.elements.town?.value,
            password: evt.target.elements.password?.value,
        }
        console.log(formData);

        setLoading(true);
        registerUser(formData)
            .then(response => {
                console.log(response);
                toast.success(`Agent ${formData.phone_number} registered`);
                clearUsers();
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setLoading(false);
                    toast.error(error.response.data.errors.phone_number[0]);
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

    const handleUpdateAgent = (evt) => {
        evt.preventDefault();

        let formData = {
            first_name: evt.target.elements.first_name?.value,
            last_name: evt.target.elements.last_name?.value,
            phone_number: evt.target.elements.phone_number?.value,
            town: evt.target.elements.town?.value
        }
        console.log(formData);

        setLoading(true);
        updateUser(formData)
            .then(response => {
                console.log(response);
                toast.success(`Agent updated`);
                clearUsers();
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

    const handleDeleteAgent = (id) => {
        setLoading(true);
        deleteUser(id)
            .then(response => {
                toast.success(`Agent deleted`);
                clearUsers();
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
                handleDeleteItem,
                handleSetAlert,
                handleUpdateAlert,
                handleDeleteAlert,
                handleRegisterAgent,
                handleUpdateAgent,
                handleDeleteAgent
            }}
        >
            <Switch>
                <Route exact path="/admin/login">
                    {state.isAuthorized === Authorized ? <Redirect to="/admin/dashboard" /> : <LoginPage />}
                </Route>

                <Route exact path="/admin/sign-up">
                    <RegisterPage />
                </Route>

                <Route path="/admin/dashboard">
                    {state.isAuthorized === Authorized ? <DashboardPage /> : <Redirect to="/admin/login" />}
                </Route>

                <Route>
                    {/* <NotFoundPage /> */}
                    <Redirect to="/admin/login" />
                </Route>
            </Switch>
        </AdminContext.Provider>
    );
};

export { useAdminContext, AdminProvider };
