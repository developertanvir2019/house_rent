import React, { useState } from 'react'

const SignUp = () => {
    const [registrationData, setRegistrationData] = useState({
        fullName: '',
        role: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        // You can perform form validation here if needed
        // Submit the registrationData to the server for user registration
        // You can use axios or fetch to make an API call to your backend
        // Example with fetch:

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
                console.log('Registration successful:', data.message);
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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleRegistrationSubmit}>
                <input type="text" name="fullName" placeholder="Full Name" required onChange={handleInputChange} />
                <select name="role" required onChange={handleInputChange}>
                    <option value="">Select Role</option>
                    <option value="House Owner">House Owner</option>
                    <option value="House Renter">House Renter</option>
                </select>
                <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp


