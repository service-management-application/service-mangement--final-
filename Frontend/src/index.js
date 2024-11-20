import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import '@coreui/coreui/dist/css/coreui.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <Router/>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
