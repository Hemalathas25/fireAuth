import React from 'react';
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from './component/login';
import SignUp from './component/register';
//import Profile from './component/profile';

import { ToastContainer } from 'react-toastify';
//import { useState } from 'react';

function App() {
 

  return (
  <Router>
    <div className='App'>
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          <Routes>
           
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
          
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>      
  </Router>
  );
}

export default App;
