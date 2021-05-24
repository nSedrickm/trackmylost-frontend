import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import DashHeader from 'components/headers/DashHeader';
import { Route, Switch } from "react-router-dom";
import ItemsPage from "Dashboard/ItemsPage";
import AlertsPage from "Dashboard/AlertsPage";

const DashboardPage = () => {

    return (
        <>
            <DashHeader />
            <AnimationRevealPage>
                <Switch>
                    <Route exact path="/agent/dashboard">
                        <ItemsPage />
                    </Route>

                    <Route exact path="/agent/dashboard/items">
                        <ItemsPage />
                    </Route>

                    <Route exact path="/agent/dashboard/alerts">
                        <AlertsPage />
                    </Route>
                </Switch>
            </AnimationRevealPage>
        </>
    )
}

export default DashboardPage;