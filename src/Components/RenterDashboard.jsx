import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';

const RenterDashboard = () => {
    const [bookings, setBookings] = useState([])
    const [loginData, setLoginData] = useState(null)
    useEffect(() => {
        // Decode the JWT token and set the user data in the state when the component mounts
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setLoginData(decodedToken);
        }
    }, []);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`https://assignment-server-10.vercel.app/api/booking/${loginData?.phoneNumber}`);
                setBookings(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookings();
    }, [loginData?.phoneNumber]);


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Booking?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://assignment-server-10.vercel.app/api/booking/${id}`);
                // If successful, remove the deleted house from the local state
                setBookings((prevHouses) => prevHouses.filter((house) => house._id !== id));
                console.log('House deleted successfully');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            {
                bookings?.length ?

                    <>
                        <h2 className="text-3xl font-semibold">Booked House</h2>
                        <div className='lg:mx-24'>

                            {
                                bookings?.map(house =>
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
                                            <div className='flex justify-center mt-2 gap-3 text-2xl'>
                                                <div className='badge badge-secondary'>Booked</div>
                                                <RiDeleteBin6Line onClick={() => handleDelete(house?._id)} className='text-red-500' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </>
                    :
                    <h2 className='flex justify-center items-center my-32 text-accent font-semibold text-3xl'>Your Booking is empty. Please book from home</h2>
            }
        </>
    )
}

export default RenterDashboard