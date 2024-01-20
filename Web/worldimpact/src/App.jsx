import React from "react";
import { BrowserRouter, Route, NavLink, Routes, Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import './App.css';

const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      </Routes> 
    </BrowserRouter>
  );
};

export default App;