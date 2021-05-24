import React from "react";
import LoginPage from "Dashboard/LoginPage";
import RegisterPage from "Dashboard/RegisterPage";
import DashboardPage from "Dashboard/DashboardPage";
import { Route, Switch } from "react-router-dom";
import { DashProvider } from "Dashboard/DasbhoardContext";

const DashContainer = () => {

    return (
        <DashProvider>
                <Switch>
                    <Route exact path="/agent/login">
                        <LoginPage />
                    </Route>

                    <Route exact path="/agent/sign-up">
                        <RegisterPage />
                    </Route>

                    <Route path="/agent/dashboard">
                        <DashboardPage />
                    </Route>
                </Switch>
        </DashProvider>
    )
}

export default DashContainer;