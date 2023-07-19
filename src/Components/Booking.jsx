import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Booking = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [loginData, setloginData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState(null);
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

    useEffect(() => {
        if (house && userData && loginData) {
            setFormData({
                name: house.name,
                address: house.address,
                city: house.city,
                bedrooms: house.bedrooms,
                bathrooms: house.bathrooms,
                roomSize: house.roomSize,
                picture: house.picture,
                availabilityDate: house.availabilityDate,
                rentPerMonth: house.rentPerMonth,
                phoneNumber: house.phoneNumber,
                description: house.description,
                userPhone: userData?.phoneNumber,
                userEmail: userData?.email,
                userName: userData?.fullName,
                queryPhone: loginData?.phoneNumber,
            });
        }
    }, [house, userData, loginData]);

    console.log(formData);
    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await axios.get(`https://assignment-server-10.vercel.app/api/house/${id}`);
                setHouse(response.data);
            } catch (err) {
                console.log('House not found', err);
                setHouse(null);
            }
        };
        fetchHouseDetails();
    }, [id]);


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


    const Navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        if (bookings?.length >= 2) {
            toast.error("can't add more than 2 house,If you need you can remove from dashboard")
        } else {
            event.preventDefault();
            axios.post('https://assignment-server-10.vercel.app/api/booking', formData)
                .then((response) => {
                    console.log(response.data.message);
                    toast.success(response?.data?.message)
                    Navigate('/')
                    // Reset the form after successful submission
                })
                .catch((error) => {
                    console.error('52', error);
                    toast.error('server error !! please fillUp with valid data')
                });
        }
        // if (!bookings?.length < 2) {
        //     toast.error("can't add more than 2 house,If you need you can remove from dashboard")
        // } else {
        //     axios.post('https://assignment-server-10.vercel.app/api/booking', formData)
        //         .then((response) => {
        //             console.log(response.data.message);
        //             toast.success(response?.data?.message)
        //             Navigate('/')
        //             // Reset the form after successful submission
        //         })
        //         .catch((error) => {
        //             console.error('52', error);
        //             toast.error('server error !! please fillUp with valid data')
        //         });
        // }
    };




    const isRenter = userData?.role === 'House Owner';
    useEffect(() => {
        if (!loginData?.phoneNumber) {
            setUserData(null);
            return;
        }
        axios.get(`https://assignment-server-10.vercel.app/api/getUserByPhoneNumber/${loginData?.phoneNumber}`)
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
        <div className='flex justify-center items-center'>
            <div className="modal-box">
                <h3 className='text-2xl font-semibold pb-2'>book Now</h3>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
                    <input readOnly defaultValue={userData?.fullName} name='name' type="text" placeholder="Your name" className="input input-bordered w-full " />
                    <input readOnly defaultValue={userData?.email} name='email' type="text" placeholder="Email address" className="input input-bordered w-full " />
                    <input readOnly defaultValue={userData?.phoneNumber} required name='phone' type="number" placeholder="Phone number" className="input input-bordered w-full " /> <br />
                    <input className='btn btn-accent btn-outline w-full ' type="submit" value='book Now' />
                </form>
            </div>
        </div>
    )
}

export default Booking