import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import DashHeader from 'components/headers/DashHeader';
import ItemsPage from "Dashboard/ItemsPage";
import { Route, Switch } from "react-router-dom";
import { useDashContext } from "Dashboard/DashboardContext";

const DashboardPage = () => {

    const { state } = useDashContext();
    console.log(state);

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
                </Switch>
            </AnimationRevealPage>
        </>
    )
}

export default DashboardPage;