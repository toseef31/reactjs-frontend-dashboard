import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios, { AxiosError } from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';

// Define the type for user form state
interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
}

const CreateUser: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message?: string; error?: string } | null>(null);
  const [userForm, setUserForm] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
    role: '',
    is_active: false,
  });

  const submitUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      setError(null);
      const url = `${constants.BASE_URL}/create-user`;
      const response = await axios.post(url, userForm);
      toast.success(response.data.message);
      resetForm();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data as { message?: string; error?: string });
      } else {
        console.error('Unexpected Error:', err);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
    setLoading(false);
  };

  const resetForm = () => {
    setUserForm({
      name: '',
      email: '',
      password: '',
      role: '',
      is_active: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserForm((prevParams) => ({
      ...prevParams,
      [name]: name === 'is_active' ? value === 'true' : value, // Convert to boolean for 'is_active'
    }));
  };

  return (
    <>
      <Breadcrumb pageName="Create User" backLink="/users/all" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form
          className="grid grid-cols-12 gap-4 p-4 mx-auto bg-white rounded-lg"
          onSubmit={submitUser}
        >
          <div className="col-span-12 flex flex-col gap-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 flex flex-col gap-2 border-b">
                <label className="text-lg font-semibold text-gray-600">Size Details</label>
              </div>
              <div className="col-span-6 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={userForm.name}
                  onChange={handleInputChange}
                  className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  value={userForm.email}
                  onChange={handleInputChange}
                  className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Role</label>
                <input
                  type="text"
                  name="role"
                  placeholder="Admin"
                  value={userForm.role}
                  onChange={handleInputChange}
                  className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password (min 8 characters)"
                  value={userForm.password}
                  onChange={handleInputChange}
                  className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Is Active?</label>
                <select
                  name="is_active"
                  value={userForm.is_active ? 'true' : 'false'}
                  onChange={handleInputChange}
                  className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="col-span-12 flex justify-between mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reset
              </button>
              {error && <div className="text-red-500">{error.message + ' : ' + error.error}</div>}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateUser;
