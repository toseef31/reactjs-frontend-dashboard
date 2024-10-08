import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import constants from '../../Constants';

const SignIn: React.FC = () => {
  const [loginForm, setLoginForm] = React.useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [signInBtn, setSignInBtn] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
      navigate('/'); // Redirect to dashboard if already authenticated
    }
  }, [navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignInBtn(true);
    try {
      const response = await axios.post(constants.BASE_URL + '/login', loginForm);
      const userData = response.data.data;
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Successfully Logged in');
        window.location.href = '/';
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if(error.response.data.status == 'success'){
          toast.info(error.response.data.message);
          navigate('/auth/select-auth?token=' + error.response.data.data.timeline.two_factor_signature+'&disabledMethods='+error.response.data.data.disabled);
        }else{
          toast.error(error.response.data.message);
        }
      } else {
        console.error('Unexpected Error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
    setSignInBtn(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Welcome Back</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Collection Portal
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      value={loginForm.password}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value={signInBtn ? 'Signing In...' : 'Sign In'}
                    disabled={signInBtn}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:bg-opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Forgot Password?{' '}
                    <Link to="/auth/forgot-password" className="text-primary">
                      Reset Password
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
