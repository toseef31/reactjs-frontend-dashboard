import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import constants from '../../Constants';

const ForgotPassword: React.FC = () => {
  const [forgotForm, setforgotForm] = React.useState({
    email: '',
  });

  const navigate = useNavigate();
  const [signInBtn, setSignInBtn] = React.useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate('/'); // Redirect to dashboard if already authenticated
    }
  }, [navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setforgotForm({ ...forgotForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignInBtn(true);
    try {
      const response = await axios.post(constants.BASE_URL + '/forgot-password', forgotForm);
      const userData = response.data.data;
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
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
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Forgot Password!
              </h2>
              <span className="mb-1.5 block font-medium">Don't worry, we are here</span>

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
                      value={forgotForm.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5">
                    <button type="submit"
                    value={signInBtn ? 'Submitting...' : 'Submit'}
                    disabled={signInBtn}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:bg-opacity-70 disabled:cursor-not-allowed">{signInBtn ? 'Submitting...' : 'Submit'}</button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    <Link to="/auth/signin" className="text-primary">
                      I remeber my password SingIn!
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

export default ForgotPassword;
