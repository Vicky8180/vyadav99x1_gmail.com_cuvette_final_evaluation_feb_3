// import React from 'react'
// import {Route,Routes,BrowserRouter as Router,} from "react-router-dom";
// import HomePage from "../Pages/HomePage.js"
// import ErrorPage from '../Components/Error/Error.js';
// import DashboardPage from '../Pages/DashboardPage.js';
// import SharePage from '../Pages/SharePage/SharePage.js';
// import { useSelector } from 'react-redux';
// import UnAuthroizedPage from '../Pages/UnAuthroizedPage.js';
// export default function Routers() {
//   const loggedInOrNot=useSelector((state)=>state.LoggedOrNot).loggedin
//   console.log(loggedInOrNot)
//   return (
//   <>
//          <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           {loggedInOrNot?   <Route path="/dashboard" element={<DashboardPage />} />:
          
//           <Route path="/unauthroised" element={<UnAuthroizedPage />} />}
        
//           <Route path="/api/task/share/:id" element={<SharePage />} />  
//           <Route path="*" element={<ErrorPage />} />
//         </Routes>
//       </Router>
//   </>
//   )
// }


import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import HomePage from '../Pages/HomePage.js';
import ErrorPage from '../Components/Error/Error.js';
import DashboardPage from '../Pages/DashboardPage.js';
import SharePage from '../Pages/SharePage/SharePage.js';
import { useSelector } from 'react-redux';
import UnauthorizedPage from '../Pages/UnAuthroizedPage.js';

export default function Routers() {
  const loggedInOrNot = useSelector((state) => state.LoggedOrNot.loggedin);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage /> } />
        {/* <Route 
          path="/dashboard" 
          element={loggedInOrNot ? <DashboardPage /> : <Navigate to="/unauthorized" replace />} 
        /> */}
        {loggedInOrNot===false&&
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        }
      
        <Route path="/api/task/share/:id" element={<SharePage />} />
        
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
