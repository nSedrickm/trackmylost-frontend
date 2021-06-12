import React from "react";
import AdminHeader from 'components/headers/AdminHeader';
import ItemsPage from "Admin/ItemsPage";
import AlertsPage from "Admin/AlertsPage";
import AgentsPage from "Admin/AgentsPage";
import SearchPage from "pages/SearchPage";
import { Route, Switch } from "react-router-dom";
import { useAdminContext } from "Admin/AdminContext";

const DashboardPage = () => {

    const { state } = useAdminContext();
    console.log(state);

    return (
        <>
            <AdminHeader />
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

                    <Route exact path="/admin/dashboard/agents">
                        <AgentsPage />
                    </Route>

                    <Route exact path="/admin/dashboard/search">
                        <SearchPage />
                    </Route>
                </Switch>
        </>
    )
}

export default DashboardPage;