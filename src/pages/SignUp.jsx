import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState({
        fullName: '',
        role: '',
        phoneNumber: '',
        email: '',
        password: '',
    });
    console.log(registrationData);
    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response, e.g., show success message, redirect to login page, etc.
                if (data?.message) {
                    console.log('Registration successful:', data.message);
                    toast.success('Registration success. please login')
                    navigate('/login')
                } else {
                    toast.error(data.error)

                }
            })
            .catch((error) => {
                console.error('Error during registration:', error);
                // Handle errors, display error message, etc.
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (

        <div class="bg-yellow-300 overflow-hidden flex items-center justify-center py-12">
            <div class="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
                <h2 className='text-cyan-500 text-3xl -mb-8 pt-4'> Register Now</h2>
                <form class="p-12 md:px-20" onSubmit={handleRegistrationSubmit}>
                    <div class=" text-lg mb-6 md:mb-4">
                        <input class="bg-gray-200 pl-8 py-2 md:py-2 focus:outline-none w-full" type="text" name="fullName" placeholder="Your Name" required onChange={handleInputChange} />
                    </div>

                    <div class=" text-lg mb-6 md:mb-4">
                        <select class="bg-gray-200 px-6 py-2 md:py-2 focus:outline-none w-full" name="role" required onChange={handleInputChange}>
                            <option value="">Select Role</option>
                            <option value="House Owner">House Owner</option>
                            <option value="House Renter">House Renter</option>
                        </select>
                    </div>
                    <div class=" text-lg mb-6 md:mb-4">
                        <input class="bg-gray-200 pl-8 py-2 md:py-2 focus:outline-none w-full" type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleInputChange} />
                    </div>
                    <div class=" text-lg mb-6 md:mb-4">
                        <input class="bg-gray-200 pl-8 py-2 md:py-2 focus:outline-none w-full" type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} />
                    </div>
                    <div class=" text-lg mb-6 md:mb-4">
                        <input class="bg-gray-200 pl-8 py-2 md:py-2 focus:outline-none w-full" type="password" name="password" placeholder="enter your password" required onChange={handleInputChange} />
                    </div>
                    <button class="bg-gradient-to-b from-orange-700 to-blue-700 font-medium p-2 md:p-4 text-white uppercase w-full" type='submit'>Registration</button>
                </form>
                <p className='pb-8'><span className='text-gray-500'>Already have an account?</span><Link to={'/login'} className='text-blue-600 font-semibold'>Login</Link></p>

            </div>
        </div>



    )
}

export default SignUp


