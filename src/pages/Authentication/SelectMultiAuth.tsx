import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import constants from '../../Constants';

const SelectMultiAuth: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [disabledMethod, setDisabledMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/'); // Redirect to dashboard if already authenticated
    }
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    const disabledMethods = queryParams.get('disabledMethods');
    setToken(tokenFromUrl);
    setDisabledMethod(disabledMethods);
  }, [navigate]);

  const handleSubmit = async (authType: string) => {
    if(authType === 'otp'){
        toast.info('OTP email is being sent to your email.');
    }else{
        toast.info('Processing ...');
    }
    try {
        const response = await axios.post(constants.BASE_URL + '/select-two-factor/' + token + '/'+ authType);
        navigate('/auth/verify-auth?token=' + response.data.data.two_factor_signature+'&authType='+response.data.data.two_factor_type);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error('Unexpected Error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
            <div className="w-full text-center p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
                Select Authentication Method
              </h2>
              <div className='py-3'>Click the Following any One Method to Continue</div>
              <div className='text-center flex justify-center'>
                <button onClick={() => handleSubmit('otp')} disabled={disabledMethod === 'otp' ? true : false} className="w-100 rounded bg-gray py-2 px-6 font-bold text-primary hover:bg-opacity-90 border border-primary disabled:opacity-50 disabled:cursor-not-allowed">Email OTP</button>
              </div>

              <div className='text-center flex justify-center mt-4'>
                <button onClick={() => handleSubmit('secret_codes')} disabled={disabledMethod === 'secret_codes' ? true : false} className="w-100 rounded bg-gray py-2 px-6 font-bold text-primary hover:bg-opacity-90 border border-primary disabled:opacity-50 disabled:cursor-not-allowed">Secret Code</button>
              </div>
             <Link className='text-center text-primary flex justify-center mt-4' to='/auth/signin'>Back to SignIn</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiAuth;