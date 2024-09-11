import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes.jsx';
import {  QueryClientProvider } from 'react-query'
import { queryClient } from "./Hooks/axiosQuery.js";

import axios from 'axios'
// set axios base url 
// axios.defaults.baseURL = "https://whiteboard-seven-gold.vercel.app/api/v1";
axios.defaults.baseURL = "http://localhost:5173";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
