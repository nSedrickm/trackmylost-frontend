import React from 'react';
import "tailwindcss/dist/base.css";
import './App.css';

import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "helpers/ScrollToTop";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/Header";
import Footer from "components/footers/Footer";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <AnimationRevealPage>
          <Header tw="max-w-none" />
          <Footer />
        </AnimationRevealPage>
      </ScrollToTop>
    </Router>

  );
}

export default App;
