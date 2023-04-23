import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import store from './store'
import App from './App'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import './index.css'


ReactDOM.render(
  <Router>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
     <Provider store={store}>
      <App/> 
     </Provider>
     </GoogleOAuthProvider>
  </Router>
, document.getElementById('root'));
