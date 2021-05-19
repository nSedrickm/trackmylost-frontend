import React from 'react';
import "rsuite/dist/styles/rsuite-default.css";
import "tailwindcss/dist/base.css";
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "helpers/ScrollToTop";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/Header";
import Footer from "components/footers/Footer";
import HomePage from "pages/HomePage";
import SearchPage from 'pages/SearchPage';
import ReportPage from "pages/ReportPage";
import AlertPage from "pages/AlertPage";
import NotFoundPage from "pages/NotFoundPage";
import LoginPage from "pages/LoginPage";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <AnimationRevealPage>
          <Toaster />
          <Header tw="max-w-none" />

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

            <Route exact path="/login">
              <LoginPage />
            </Route>

            <Route>
              <NotFoundPage />
            </Route>
          </Switch>

          <Footer />
        </AnimationRevealPage>
      </ScrollToTop>
    </Router>
  );
}

export default App;
