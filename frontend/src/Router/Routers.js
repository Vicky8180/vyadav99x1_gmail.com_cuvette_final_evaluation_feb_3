import React from 'react'
import {Route,Routes,BrowserRouter as Router,} from "react-router-dom";
import HomePage from "../Pages/HomePage.js"
import ErrorPage from '../Components/Error/Error.js';
import DashboardPage from '../Pages/DashboardPage.js';
export default function Routers() {
  return (
  <>
         <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
  </>
  )
}
