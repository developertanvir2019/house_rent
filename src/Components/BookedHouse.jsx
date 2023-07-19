import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'

const BookedHouse = () => {
    const [bookedHouses, setBookedHouses] = useState([])
    console.log(bookedHouses);
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
        const fetchHouses = async () => {
            try {
                const response = await axios.get(`https://assignment-server-10.vercel.app/api/ownerBooking/${loginData?.phoneNumber}`);
                setBookedHouses(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchHouses();
    }, [loginData?.phoneNumber]);
    return (
        <>
            {
                bookedHouses?.length ?

                    <>
                        <h2 className="text-3xl font-semibold">Booked House</h2>
                        <div className='lg:mx-24'>

                            {
                                bookedHouses?.map(house =>
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
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </> :

                    <h2 className='flex justify-center items-center my-32 text-accent font-semibold text-3xl'>Your any house is not rent yet</h2>
            }
        </>
    )
}

export default BookedHouse 