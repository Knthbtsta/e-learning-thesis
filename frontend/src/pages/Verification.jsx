import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Verification = () => {
    const location = useLocation();
    const formData = location.state?.formData;
    const email = formData ? formData.email : '';
    console.log(formData);
    const handleVerifyClick = async () => {
        try {
            if (!formData) {
                console.error('Form data is missing');
                return;
            }

            const response = await axios.post('http://localhost:8800/api/send-verification-email', formData);

    
            console.log('Email sent successfully!', response.data);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-red-500'>
            <div className='flex flex-col justify-center items-center gap-y-5 bg-green-600 h-[300px] w-[500px]'>
                <p>PLEASE INPUT THE VERIFICATION CODE</p>
                <p>TO YOUR EMAIL: {email}</p>
                <button className='text-black' onClick={handleVerifyClick}>
                    SEND LINK
                </button>
                <input type="text" className='rounded-2xl border-[5px] border-black text-black text-2xl' />
            </div>
        </div>
    );
};
export default Verification;