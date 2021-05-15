import React from 'react';
import "tailwindcss/dist/base.css";
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "helpers/ScrollToTop";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/Header";
import Footer from "components/footers/Footer";

import HomePage from "pages/HomePage";
import SearchPage from 'pages/SearchPage';
import ReportPage from "pages/ReportPage";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <AnimationRevealPage>
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
          </Switch>
          <Footer />
        </AnimationRevealPage>
      </ScrollToTop>
    </Router>

  );
}

export default App;
