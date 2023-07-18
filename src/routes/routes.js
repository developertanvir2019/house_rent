import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./privateRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/dashboard',
                element: <PrivateRoute> <DashBoard /></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <SignUp />
            },
        ]
    }
])