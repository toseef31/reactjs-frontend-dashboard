import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import constants from '../../Constants';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [otp, setOTP] = useState(false);
  const [secretCode, setSecretCode] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  if (!loggedInUser) {
    return null;
  }
  const convertStringToArray = (inputString: string) => {
    if (inputString) {
      return inputString.split(',').map(item => item.trim());
    }
    return [];
  }
  
  useEffect(() => {
    setAuthToken(loggedInUser.token);
    const enabledMethods = loggedInUser.user.two_factor_type;
    if(enabledMethods){
      const methods = convertStringToArray(enabledMethods);
      if(methods.includes('otp')){
        setOTP(true);
      }
      if(methods.includes('secret_codes')){
        setSecretCode(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth/signin';
  }
  const enableDisabled2FA = async (type : string) => {
    try{
      toast.info('Processing ...');
      const enableUrl = constants.BASE_URL + '/enable-two-factor';
      const disableUrl = constants.BASE_URL + '/disable-two-factor';
      if(type === 'otp'){
        if(otp){
          const response = await axios.post(disableUrl, {two_factor_type: type}, {headers: {Authorization: `Bearer ${authToken}`}});
          toast.success(response.data.message);
          setOTP(false);
        }else{
          const response = await axios.post(enableUrl, {two_factor_type: type}, {headers: {Authorization: `Bearer ${authToken}`}});
          toast.success(response.data.message);
          setOTP(true);
        }
      }else{
        if(secretCode){
          const response = await axios.post(disableUrl, {two_factor_type: type}, {headers: {Authorization: `Bearer ${authToken}`}});
          toast.success(response.data.message);
          setSecretCode(false);
        }else{
          const response = await axios.post(enableUrl, {two_factor_type: type}, {headers: {Authorization: `Bearer ${authToken}`}});
          toast.success(response.data.message);
          setSecretCode(true);
        }
      }
      toast.warning('Please logout, and login to apply changes');
    }catch(error){
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error('Unexpected Error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  }
  
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {loggedInUser.user.name}
          </span>
          <span className="block text-xs">{loggedInUser.user.email}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
<div className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base border-b border-stroke dark:border-strokedark">
<input type="checkbox" onChange={() => enableDisabled2FA('otp')} checked={otp} className="mr-2" />
2FA: OTP
</div>
<div className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base border-b border-stroke dark:border-strokedark">
<input type="checkbox" onChange={() => enableDisabled2FA('secret_codes')} checked={secretCode} className="mr-2" />
2FA: Secret Codes
</div>

          <button onClick={handleLogout} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                fill=""
              />
              <path
                d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                fill=""
              />
            </svg>
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
      <ToastContainer />
    </ClickOutside>
  );
};

export default DropdownUser;
