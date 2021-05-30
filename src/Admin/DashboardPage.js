import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import DashHeader from 'components/headers/DashHeader';
import ItemsPage from "Admin/ItemsPage";
import AlertsPage from "Admin/AlertsPage";
import { Route, Switch } from "react-router-dom";
import { useAdminContext } from "Admin/AdminContext";

const DashboardPage = () => {

    const { state } = useAdminContext();
    console.log(state);

    return (
        <>
            <DashHeader />
            <AnimationRevealPage>
                <Switch>
                    <Route exact path="/admin/dashboard">
                        <ItemsPage />
                    </Route>

                    <Route exact path="/admin/dashboard/items">
                        <ItemsPage />
                    </Route>

                    <Route exact path="/admin/dashboard/alerts">
                        <AlertsPage />
                    </Route>
                </Switch>
            </AnimationRevealPage>
        </>
    )
}

export default DashboardPage;