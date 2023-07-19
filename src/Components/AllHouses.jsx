import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AllHouses = ({ house }) => {
    const [bookingsData, setBookingsData] = useState([])
    const [formData, setFormData] = useState({
        name: house?.name,
        address: house?.address,
        city: house?.city,
        bedrooms: house?.bedrooms,
        bathrooms: house?.bathrooms,
        roomSize: house?.roomSize,
        picture: house?.picture,
        availabilityDate: house?.availabilityDate,
        rentPerMonth: house?.rentPerMonth,
        phoneNumber: house?.phoneNumber,
        description: house?.description,
        userPhone: '',
        userEmail: '',
        userName: '',
        queryPhone: '',
    });
    const Navigate = useNavigate()
    const [loginData, setloginData] = useState(null);
    const [userData, setUserData] = useState(null);
    const isRenter = userData?.role === 'House Owner';
    useEffect(() => {
        if (!loginData?.phoneNumber) {
            setUserData(null);
            return;
        }
        axios.get(`https://assignment-server-10.vercel.app/api/getUserByPhoneNumber/${loginData?.phoneNumber}`)
            .then((response) => {
                setUserData(response.data);
                setFormData({ ...formData, userEmail: response?.data?.email, userName: response?.data?.fullName });
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
            setFormData({ ...formData, queryPhone: decodedToken?.phoneNumber });
        }
    }, []);


    // get booking data for check the total booking

    // useEffect(() => {
    //     const fetchBookings = async () => {
    //         try {
    //             const response = await axios.get(`https://assignment-server-10.vercel.app/api/booking/${userData?.phoneNumber}`);
    //             setBookingsData(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchBookings();
    // }, [userData?.phoneNumber]);








    return (
        <>
            <div key={house?._id} className='grid grid-cols-3 my-6 h-44'>
                <div>
                    <img className='h-44 w-full' src={house?.picture} alt="" />
                </div>
                <div className='bg-gray-200 py-3'>
                    <h3 className="text-xl font-semibold">{house?.name}</h3>
                    <p className="font-semibold">{house?.description}</p>
                    <p className="font-semibold">{house?.address} ,{house?.city}</p>
                    <p className="font-semibold">Phone: {house?.phoneNumber}</p>
                    <p className="font-semibold">Cost: <span className='text-green-600'>{house?.rentPerMonth} Tk</span></p>

                </div>
                <div className='bg-gray-200 py-3'>
                    <p className="font-semibold">Bedrooms : {house?.bedrooms} pic</p>
                    <p className="font-semibold">Bathrooms : {house?.bathrooms} pic</p>
                    <p className="font-semibold">Size : {house?.roomSize}</p>
                    {!isRenter ? <Link to={`/booking/${house._id}`} className='btn btn-outline btn-success mt-2' htmlFor="my_modal_7">Book Now</Link> :
                        <button disabled className='btn btn-outline btn-success mt-2'>Book Now</button>}
                </div>
            </div>

        </>
    )
}

export default AllHouses