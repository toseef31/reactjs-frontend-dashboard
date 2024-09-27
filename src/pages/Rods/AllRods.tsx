import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';
import WidgetCard from '../GeneralComponenet/WidgetCard';

const AllRods: React.FC = () => {

  const [rodss, setRods] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [nextPageEnabled, setNextPageEnabled] = useState(false);
  const [prevPageEnabled, setPrevPageEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [pageInfo, setPageInfo] = useState({
      current_page: 1,
      total: 1,
  });
  const [searchParams, setSearchParams] = useState({
    rod_id: '',
    makers_name: '',
    model: '',
    sub_model: '',
    sold_price: '',
    size: '',
    cost_price: '',
  });

  const fetchRods = async (params = {}, nextPageUrl = null, perPage = 25) => {
    setLoading(true);
  
    // Filter out empty parameters
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
  
    try {
      const url = nextPageUrl || constants.BASE_URL + '/rods';
      const response = await axios.get(url, { params: { ...filteredParams, per_page: perPage } });
      setRods(response.data.data);
      setNextPage(response.data.pagination.next_page_url);
      setPrevPage(response.data.pagination.prev_page_url);
      setNextPageEnabled(response.data.pagination.next_page_url !== null);
      setPrevPageEnabled(response.data.pagination.prev_page_url !== null);
      setPageInfo({
        current_page: response.data.pagination.current_page,
        total: response.data.pagination.total,
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data);
      } else {
          console.error('Unexpected Error:', error);
          toast.error('An unexpected error occurred. Please try again.');
      }
    }
    setLoading(false);
  };
  

  const handleNextPage = async () => {
    fetchRods(searchParams, nextPage);
  };

  const handlePrevPage = async () => {
    fetchRods(searchParams, prevPage);
  };

  useEffect(() => {
    fetchRods();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault();
    fetchRods(searchParams,null, 1000);
  };
  const resetForm = () => {
    setSearchParams({
      rod_id: '',
      makers_name: '',
      model: '',
      sub_model: '',
      sold_price: '',
      size: '',
      cost_price: '',
    });

    fetchRods({}, null, 25);
  };

  const deleteRods = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Rods?');

    if (!isConfirmed) {
      return; // Exit if the user cancels the action
    }
    try {
      await axios.post(constants.BASE_URL + '/rods/delete', { id });
      // Update state to remove the deleted rods
      setRods(prevRods => prevRods.filter(rods => rods.id !== id));
      toast.success('Rods deleted successfully!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        toast.error(error.response.data.message || 'An unexpected error occurred. Please try again.');
      } else {
        console.error('Unexpected Error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="All Rods" backLink="/" createLink='/rods/create' />
      <WidgetCard parameter='rods'/>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-1" onSubmit={handleSearch}>
          <input
            type="text"
            name="rod_id"
            placeholder="Rods ID"
            value={searchParams.rod_id}
            onChange={handleInputChange}
            className="col-span-1 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            name="makers_name"
            placeholder="Makers Name"
            value={searchParams.makers_name}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={searchParams.model}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="sub_model"
            placeholder="Sub Model"
            value={searchParams.sub_model}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={searchParams.size}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="cost_price"
            placeholder="Price"
            value={searchParams.cost_price}
            onChange={handleInputChange}
            className="col-span-1 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="sold_price"
            placeholder="Sale Price"
            value={searchParams.sold_price}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="col-span-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            Search
          </button>
          <button
            type="button" onClick={resetForm}
            className="col-span-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >Reset</button>
        </form>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3 mt-2">
        {/* Table and Pagination */}
        <table className="min-w-full border-collapse border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-left text-gray-600">
            {/* Table Header */}
            <tr className="py-2">
              <th className="border-b border-gray-300 p-2 w-20">Rods ID</th>
              <th className="border-b border-gray-300 p-2 w-30">Makers Name</th>
              <th className="border-b border-gray-300 p-2 w-30">Model</th>
              <th className="border-b border-gray-300 p-2 w-30">Sub Model</th>
              <th className="border-b border-gray-300 p-2 w-30">Size</th>
              <th className="border-b border-gray-300 p-2 w-20">Price</th>
              <th className="border-b border-gray-300 p-2 w-30">Sale Price</th>
              <th className="border-b border-gray-300 p-2 w-20">Action</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr>
                <td colSpan={7} className="text-center">
                Loading...
                </td>
            </tr>
            ) : error ? (
            <tr>
                <td colSpan={7} className="text-center">
                Error: {error.message}
                </td>
            </tr>
            ) : null}
            {rodss.map((rods) => (
              <tr className="hover:bg-gray-50" key={rods.id}>
                <td className="border-b border-gray-50 p-1">{rods.rod_id}</td>
                <td className="border-b border-gray-50 p-1">{rods.makers_name}</td>
                <td className="border-b border-gray-50 p-1">{rods.model}</td>
                <td className="border-b border-gray-50 p-1">{rods.sub_model}</td>
                <td className="border-b border-gray-50 p-1">{rods.size}</td>
                <td className="border-b border-gray-50 p-1">{rods.cost_price}</td>
                <td className="border-b border-gray-50 p-1">{rods.sold_price}</td>
                <td className="border-b border-gray-50 p-1 w-30 pr-5">
                  <Link to={`/rods/edit/${rods.id}`} className="text-yellow-500 font-bold hover:underline">Edit</Link>
                  <span className="mx-2"></span>
                  <button onClick={() => deleteRods(rods.id)} className="text-red-500 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-gray-500">Total Rods: {pageInfo.total} | Page {pageInfo.current_page}</div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handlePrevPage}
              className="px-2 py-1 border border-blue-300 rounded-lg text-blue-700 bg-light-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!prevPageEnabled}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Previous
              </span>
            </button>

            <button
              onClick={handleNextPage}
              className="px-2 py-1 border border-blue-300 rounded-lg text-blue-700 bg-light-blue-100 hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!nextPageEnabled}
            >
              <span className="flex items-center">
                Next
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AllRods;