import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import DashHeader from 'components/headers/DashHeader';
import { Route, Switch } from "react-router-dom";
import { DashProvider } from "Dashboard/DasbhoardContext";
import ItemsPage from "Dashboard/ItemsPage";
import AlertsPage from "Dashboard/AlertsPage";

const DashboardPage = () => {

    return (
        <DashProvider>
            <DashHeader />
            <AnimationRevealPage>
                <Switch>
                    <Route exact path="/dashboard">
                        <ItemsPage />
                    </Route>

                    <Route exact path="/dashboard/items">
                        <ItemsPage />
                    </Route>

                    <Route exact path="/dashboard/alerts">
                        <AlertsPage />
                    </Route>
                </Switch>
            </AnimationRevealPage>
        </DashProvider>
    )
}
export default DashboardPage;