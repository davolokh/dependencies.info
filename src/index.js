import React from "react";
import ReactGA from 'react-ga';
import ReactDOM from "react-dom";
import App from "App";
import DataProvider from "store/DataProvider";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);