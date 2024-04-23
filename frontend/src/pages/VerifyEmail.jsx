import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        console.log('Token:', token); // Log the token to verify it's correctly extracted from the URL

        const verifyEmail = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/verify-email', {
                    params: { token },
                });
                console.log('Response:', response.data); // Log the response from the backend
                console.log('Email verified successfully!');
                navigate('/verification-success');
            } catch (error) {
                console.error('Failed to verify email:', error.response); // Log the error response from the backend
                navigate('/verification-error');
            }
        };

        if (token) {
            verifyEmail();
        } else {
            console.error('Email verification token not found!');
            navigate('/verification-error');
        }
    }, [location.search, navigate]);

    return null;
};

export default VerifyEmail;
