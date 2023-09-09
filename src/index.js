import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

export const baseURL = "https://intelliverse.backend-ripik.com/api/"; //Dev backend URL
// export const baseURL = 'https://ultratech-ripik.com/images/'; //Prod backend URL

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( 
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
);

reportWebVitals();
