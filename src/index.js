import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import tw from "twin.macro";
import ScaleLoader from "react-spinners/ScaleLoader";
import App from './App';
import reportWebVitals from './reportWebVitals';

const Container = tw.div`grid place-items-center h-screen`;
const LoadingAnimation = () => {
  return (
    <Container>
      <ScaleLoader color="#dc2626"
        height={60}
        width={6}
      />
    </Container>
  )
}

ReactDOM.render(
  <Suspense fallback={<LoadingAnimation />}>
    <App />
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
