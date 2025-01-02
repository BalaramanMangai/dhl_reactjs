import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// ROOT APP COMPONENT

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//import store from './store/store';
import store, { persistor } from './store/store';


import App from "./app/App";
// THIRD PARTY CSS
import "perfect-scrollbar/css/perfect-scrollbar.css";

const root = createRoot(document.getElementById("root"));

root.render(
  // <StrictMode>
  //   <BrowserRouter>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </BrowserRouter>
  // </StrictMode>
  <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
</StrictMode>

);
