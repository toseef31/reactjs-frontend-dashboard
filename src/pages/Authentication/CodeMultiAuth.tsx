import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import constants from '../../Constants';

const CodeMultiAuth: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [authType, setAuthType]=useState<string | null>(null)
  const [resendBtn, setResendBtn] = useState(false);
  const [verifyForm, setVerifyForm] = useState({
      type_value: '',
      two_factor_type: '',
  });
  const navigate = useNavigate();
  
  // Check if user is already authenticated
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/'); // Redirect to dashboard if already authenticated
    }
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    const authTypeFromUrl = queryParams.get('authType');
    setToken(tokenFromUrl);
    setAuthType(authTypeFromUrl);
    setVerifyForm({type_value: '', two_factor_type: authTypeFromUrl});
  }, [navigate]);

  const handleSubmit = async () => {
    setResendBtn(true);
    try {
        const response = await axios.post(constants.BASE_URL + '/submit-two-factor/' + token, verifyForm);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        toast.success(response.data.message);
        window.location.href = '/';
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error('Unexpected Error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
    setResendBtn(false);
  };
  const resendOTP = async () => {
    setResendBtn(true);
    try {
        const response = await axios.post(constants.BASE_URL + '/resend-otp/' + token);
        toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error('Unexpected Error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
    setResendBtn(false);
  }
if(authType === 'otp'){
    return (
        <>
          <ToastContainer />
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-wrap items-center">
              <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                <div className="w-full text-center p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
                    Enter your OTP<br/>(OTP: One Time Password)
                  </h2>
                  <div className='py-3'>An OTP email has been sent to your email. Please check your email and enter the OTP</div>

                  <div className='text-center flex justify-center'>
                    <input className='border border-primary rounded p-2 my-2 text-center' type="text" onChange={(event) => setVerifyForm({ ...verifyForm, type_value: event.target.value })} placeholder='Enter OTP' />
                  </div>
                    <div className='text-center mb-4'>
                    Did not received OTP? <button onClick={() => resendOTP()} className="rounded font-bold text-primary disabled:cursor-not-allowed disabled:opacity-50" disabled={resendBtn}> {resendBtn ? 'Sending...' : 'Resend OTP'}</button>
                    </div>
                  <div className='text-center flex justify-center'>
                    <button onClick={handleSubmit} className="w-100 rounded bg-gray py-2 px-6 font-bold text-primary hover:bg-opacity-90 border border-primary" disabled={resendBtn}>Submit</button>
                  </div>
                  <Link className='text-center text-primary flex justify-center mt-4' to='/auth/signin'>Back to SignIn</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}else{
    return (
        <>
          <ToastContainer />
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-wrap items-center">
              <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
                <div className="w-full text-center p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
                    Enter your Secret Code
                  </h2>
                  <div className='py-3'>Enter your secret code from the list of codes.</div>
                  <div className='text-center flex justify-center'>
                    <input className='border border-gray rounded p-2 my-2 text-center' type="text" onChange={(event) => setVerifyForm({ ...verifyForm, type_value: event.target.value })} placeholder='Enter Secret Code' />
                  </div>
                  <div className='text-center flex justify-center'>
                    <button onClick={handleSubmit} className="w-100 rounded bg-gray py-2 px-6 font-bold text-primary hover:bg-opacity-90 border border-primary">Submit</button>
                  </div>
                  <Link className='text-center text-primary flex justify-center mt-4' to='/auth/signin'>Back to SignIn</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}
  
};

export default CodeMultiAuth;