// PrivateRoute.js
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ element }) => {
//     // Check if the user is logged in
//     const isLoggedIn = localStorage.getItem('jwtToken') !== null;

//     return isLoggedIn ? (
//         <Route element={element} />
//     ) : (
//         <Navigate to="/login" replace />
//     );
// };

// export default PrivateRoute;



const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('jwtToken') !== null;
    if (isLoggedIn) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
};

export default PrivateRoute;