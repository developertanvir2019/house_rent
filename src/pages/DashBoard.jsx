import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import OwnerDashboard from '../Components/OwnerDashboard';
import RenterDashboard from '../Components/RenterDashboard';

const DashBoard = () => {
    const [loginData, setloginData] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!loginData?.phoneNumber) {
            setUserData(null);
            return;
        }
        axios.get(`http://localhost:5000/api/getUserByPhoneNumber/${loginData?.phoneNumber}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error(error);
                setUserData(null);
            });
    }, [loginData?.phoneNumber]);

    useEffect(() => {
        // Decode the JWT token and set the user data in the state when the component mounts
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setloginData(decodedToken);
        }
    }, []);

    return (
        <>
            {

                userData?.role === 'House Owner' && <OwnerDashboard />

            }
            {
                userData?.role === 'House Renter' && <RenterDashboard />
            }
        </>

    )
}

export default DashBoard