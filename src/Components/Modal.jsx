import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Modal = ({ house }) => {
    const Navigate = useNavigate()
    const [loginData, setloginData] = useState(null);
    const [userData, setUserData] = useState(null);
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
        if (!loginData?.phoneNumber) {
            setUserData(null);
            return;
        }
        axios.get(`http://localhost:5000/api/getUserByPhoneNumber/${loginData?.phoneNumber}`)
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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/booking', formData)
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
        // if (!bookingsData?.length < 2) {
        //     toast.error("can't add more than 2 house,If you need you can remove from dashboard")
        // } else {
        //     axios.post('http://localhost:5000/api/booking', formData)
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
    console.log('aci', formData);
    return (
        <>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className='text-2xl font-semibold pb-2'>book Now {house?.name}</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
                        <input readOnly defaultValue={userData?.fullName} name='name' type="text" placeholder="Your name" className="input input-bordered w-full " />
                        <input readOnly defaultValue={userData?.email} name='email' type="text" placeholder="Email address" className="input input-bordered w-full " />
                        <input onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })} required name='phone' type="number" placeholder="Phone number" className="input input-bordered w-full " /> <br />
                        <input className='btn btn-accent btn-outline w-full ' type="submit" value='book Now' />
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </>
    )
}

export default Modal