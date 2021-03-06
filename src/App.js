import React from 'react';
import "rsuite/dist/styles/rsuite-default.css";
import "tailwindcss/dist/base.css";
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import ScrollToTop from "helpers/ScrollToTop";
import Header from "components/headers/Header";
import Footer from "components/footers/Footer";
import HomePage from "pages/HomePage";
import SearchPage from 'pages/SearchPage';
import ReportPage from "pages/ReportPage";
import AlertPage from "pages/AlertPage";
import NotFoundPage from "pages/NotFoundPage";
import { DashProvider } from 'Dashboard/DashboardContext';
import { AdminProvider } from "Admin/AdminContext";

function App() {

  return (
    <Router>
      <ScrollToTop>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 5000,
            style: {
              padding: "20px"
            }
          }}
        />

        <Switch>
          <Route path="/agent">
            <DashProvider />
          </Route>

          <Route path="/admin">
            <AdminProvider />
          </Route>

          <Route path="/">
            <MainSection />
          </Route>
        </Switch>

      </ScrollToTop>
    </Router>
  );
}

const MainSection = () => {

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/search">
          <SearchPage />
        </Route>

        <Route exact path="/report-item">
          <ReportPage />
        </Route>

        <Route exact path="/alert-me">
          <AlertPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      <Footer />
    </>
  );
}

export default App;
