import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'

const DashBoard = () => {
    const [userData, setUserData] = useState(null);
    const { _id, phoneNumber } = userData || null;

    useEffect(() => {
        // Decode the JWT token and set the user data in the state when the component mounts
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setUserData(decodedToken);
        }
    }, []);

    return (
        <div>DashBoard</div>
    )
}

export default DashBoard