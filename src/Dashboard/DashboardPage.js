import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import DashHeader from 'components/headers/DashHeader';
import { Route, Switch } from "react-router-dom";
import { DashProvider } from "Dashboard/DasbhoardContext";
import ItemsPage from "Dashboard/ItemsPage";


const DashboardPage = () => {

    return (
        <DashProvider>
            <DashHeader />
            <AnimationRevealPage>
                <Switch>
                    <Route path="/dashboard">
                        <ItemsPage />
                    </Route>

                    <Route path="/dashboard/items">
                        <ItemsPage />
                    </Route>
                </Switch>
            </AnimationRevealPage>
        </DashProvider>
    )
}
export default DashboardPage;