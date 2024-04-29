import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    const verifyEmail = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/verify-email', {
          params: { token },
        });

        console.log('Email verified successfully!', response.data);

        // Redirect the user to a success page or perform other actions
        history.push('/verification-success');
      } catch (error) {
        console.error('Failed to verify email:', error);

        // Redirect the user to an error page or perform other actions
        history.push('/verification-error');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      console.error('Email verification token not found!');
      history.push('/verification-error');
    }
  }, [history, location.search]);

  return null; // or display a loading spinner
};

export default VerifyEmail;