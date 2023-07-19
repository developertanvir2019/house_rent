import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddHouse = () => {
    const [loginData, setloginData] = useState(null);
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        bedrooms: '',
        bathrooms: '',
        roomSize: '',
        picture: '',
        availabilityDate: '',
        rentPerMonth: '',
        phoneNumber: '',
        description: '',
        userPhone: '',
    });
    useEffect(() => {
        // Decode the JWT token and set the user data in the state when the component mounts
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setFormData({ ...formData, userPhone: decodedToken?.phoneNumber });
        }
    }, []);
    const isValidBangladeshiPhoneNumber = (phoneNumber) => {
        // Regular expression to validate Bangladeshi phone number
        const regex = /^(\+?88)?01[3-9]\d{8}$/;
        return regex.test(phoneNumber);
    };

    const [errPhone, setErrPhone] = useState('')
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "phoneNumber") {
            if (!isValidBangladeshiPhoneNumber(value)) {
                setErrPhone('Use BD number(01******)')
            } else {
                setErrPhone('')
            }
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://assignment-server-10.vercel.app/api/houses', formData)
            .then((response) => {
                console.log(response.data.message);
                toast.success(response?.data?.message)
                Navigate('/dashboard')
                // Reset the form after successful submission
                setFormData({
                    name: '',
                    address: '',
                    city: '',
                    bedrooms: '',
                    bathrooms: '',
                    roomSize: '',
                    picture: '',
                    availabilityDate: '',
                    rentPerMonth: '',
                    phoneNumber: '',
                    description: '',
                });
            })
            .catch((error) => {
                console.error('52', error);
                toast.error('server error !! please fillUp with valid data')
            });
    };

    return (
        <div>
            <h4 className="text-2xl font-semibold text-accent mt-3">Add House</h4>

            <div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                required
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <input
                                required
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="bedrooms">Bed rooms</label>
                            <input
                                required
                                type="number"
                                id="bedrooms"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="bathrooms">Bathrooms</label>
                            <input
                                required
                                type="number"
                                id="bathrooms"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="roomSize">Room Size</label>
                            <input
                                required
                                type="text"
                                id="roomSize"
                                name="roomSize"
                                value={formData.roomSize}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="picture">Picture Url</label>
                            <input
                                required
                                type="text"
                                id="picture"
                                name="picture"
                                value={formData.picture}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="availabilityDate">availabilityDate</label>
                            <input
                                required
                                type="date"
                                id="availabilityDate"
                                name="availabilityDate"
                                value={formData.availabilityDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="rentPerMonth">rentPerMonth</label>
                            <input
                                required
                                type="number"
                                id="rentPerMonth"
                                name="rentPerMonth"
                                value={formData.rentPerMonth}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">phoneNumber</label>
                            <input
                                required
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <p className="text-red-500">{errPhone}</p>
                        </div>
                    </div>
                    {/* More fields go here */}
                    <div className="mt-4">
                        <label htmlFor="description">Description</label>
                        <textarea
                            required
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-accent text-white"
                        >
                            Add Home
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddHouse