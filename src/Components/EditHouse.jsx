import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditHouse = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);

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
        userPhone: house?.userPhone,
    });
    console.log(formData);
    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/house/${id}`);
                setHouse(response.data);
                setFormData(
                    {
                        name: response.data?.name,
                        address: response.data?.address,
                        city: response.data?.city,
                        bedrooms: response.data?.bedrooms,
                        bathrooms: response.data?.bathrooms,
                        roomSize: response.data?.roomSize,
                        picture: response.data?.picture,
                        availabilityDate: response.data?.availabilityDate,
                        rentPerMonth: response.data?.rentPerMonth,
                        phoneNumber: response.data?.phoneNumber,
                        description: response.data?.description,
                        userPhone: response.data?.userPhone,
                    }
                )

            } catch (err) {
                console.log('House not found', err);
                setHouse(null);
            }
        };
        fetchHouseDetails();
    }, [id]);

    // For editing functionality 

    const Navigate = useNavigate()



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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/house/${id}`, formData);
            setFormData(response.data);
            toast.success('update success')
            Navigate('/dashboard')
        } catch (err) {
            toast.error('Update failed');
        }
    };



    return (
        <div>
            <h4 className="text-2xl font-semibold text-accent mt-3">Edit House</h4>

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
                            Edit House
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditHouse