import React from "react";
import DashHeader from 'components/headers/DashHeader';
import DashFooter from "components/footers/DashFooter";
import ItemsPage from "Dashboard/ItemsPage";
import SearchPage from "pages/SearchPage";
import { Route, Switch } from "react-router-dom";
import { useDashContext } from "Dashboard/DashboardContext";

const DashboardPage = () => {

    const { state } = useDashContext();
    console.log(state);

    return (
        <>
            <DashHeader />
            <Switch>
                <Route exact path="/agent/dashboard">
                    <ItemsPage />
                </Route>

                <Route exact path="/agent/dashboard/items">
                    <ItemsPage />
                </Route>

                <Route exact path="/agent/dashboard/search">
                    <SearchPage />
                </Route>
            </Switch>
            <DashFooter />
        </>
    )
}

export default DashboardPage;