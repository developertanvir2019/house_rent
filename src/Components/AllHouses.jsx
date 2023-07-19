import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AllHouses = ({ house }) => {
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


    // get booking data for check the total booking
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/booking/${loginData?.phoneNumber}`);
                setBookings(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookings();
    }, [loginData?.phoneNumber]);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (bookings?.length < 2) {
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
        } else {
            toast.error("can't add more than 2 house,If you need you can remove from dashboard")
        }
    };







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
                    {!isRenter ? <label className='btn btn-outline btn-success mt-2' htmlFor="my_modal_7">Book Now</label> :
                        <button disabled className='btn btn-outline btn-success mt-2'>Book Now</button>}
                </div>
            </div>


            {/* The button to open modal */}
            {/* The button to open modal */}
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className='text-2xl font-semibold pb-2'>book Now</h3>
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

export default AllHouses