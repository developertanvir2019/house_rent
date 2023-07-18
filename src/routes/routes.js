import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./privateRoute";
import AddHouse from "../Components/AddHouse";
import MyHouses from "../Components/MyHouses";
import BookedHouse from "../Components/BookedHouse";
import EditHouse from "../Components/EditHouse";

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
                element: <PrivateRoute> <DashBoard /></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard/add',
                        element: <AddHouse />
                    },
                    {
                        path: '/dashboard/edit/:id',
                        element: <EditHouse />
                    },
                    {
                        path: '/dashboard',
                        element: <MyHouses />
                    },
                    {
                        path: '/dashboard/bookedHouse',
                        element: <BookedHouse />
                    },
                ]
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