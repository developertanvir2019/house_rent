import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
const MyHouses = () => {
    const [houses, setHouses] = useState([])
    const [loginData, setLoginData] = useState(null)
    console.log(houses);
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
                const response = await axios.get(`https://assignment-server-10.vercel.app/api/houses/${loginData?.phoneNumber}`);
                setHouses(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHouses();
    }, [loginData?.phoneNumber]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this house?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://assignment-server-10.vercel.app/api/houses/${id}`);
                // If successful, remove the deleted house from the local state
                setHouses((prevHouses) => prevHouses.filter((house) => house._id !== id));
                console.log('House deleted successfully');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>

            <div className='lg:mx-24'>
                {
                    houses?.map(house =>
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
                                    <Link to={`/dashboard/edit/${house?._id}`}>  <BiSolidEdit className='text-green-600' /></Link>
                                    <RiDeleteBin6Line onClick={() => handleDelete(house?._id)} className='text-red-500' />
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default MyHouses