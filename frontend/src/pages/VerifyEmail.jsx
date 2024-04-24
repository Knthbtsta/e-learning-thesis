// VerifyEmail.jsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate hook to get navigation function

    useEffect(() => {
        
        const token = new URLSearchParams(location.search).get('token');

        const EmailVerificationSuccess = async () => {
            try {
                const response = await axios.post(`http://localhost:8800/api/verify-email?token=${token}`, 
                );
                console.log('Email verified successfully!', response.data);

                // Navigate to the success page

            } catch (error) {
                console.error('Failed to verify email:', error);

                // Navigate to the error page
            }
        };

        if (token) {
            VerifyEmail();
        } else {
            console.error('Email verification token not found!');
            navigate('/verification-error');
        }
    }, [location.search, navigate]);

    return null; // or display a loading spinner
};

export default VerifyEmail;