import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';
import WidgetCard from '../GeneralComponenet/WidgetCard';

const AllReels: React.FC = () => {

  const [reels, setReels] = useState<any[]>([]);
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
    reel_id: '',
    makers_name: '',
    model: '',
    sub_model: '',
    handle: '',
    foot: '',
    tension_regultor: '',
    size: '',
    cost_price: '',
  });

  const fetchReels = async (params = {}, nextPageUrl = null, perPage = 25) => {
    setLoading(true);
  
    // Filter out empty parameters
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
  
    try {
      const url = nextPageUrl || constants.BASE_URL + '/hardyreels';
      const response = await axios.get(url, { params: { ...filteredParams, per_page: perPage } });
      setReels(response.data.data);
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
    fetchReels(searchParams, nextPage);
  };

  const handlePrevPage = async () => {
    fetchReels(searchParams, prevPage);
  };

  useEffect(() => {
    fetchReels();
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
    fetchReels(searchParams,null, 1000);
  };
  const resetForm = () => {
    setSearchParams({
      reel_id: '',
      makers_name: '',
      model: '',
      sub_model: '',
      handle: '',
      foot: '',
      tension_regultor: '',
      size: '',
      cost_price: '',
    });

    fetchReels({}, null, 25);
  };

  const deleteReel = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Reel?');

    if (!isConfirmed) {
      return; // Exit if the user cancels the action
    }
    try {
      await axios.post(constants.BASE_URL + '/hardyreel/delete', { id });
      // Update state to remove the deleted reel
      setReels(prevReels => prevReels.filter(reel => reel.id !== id));
      toast.success('Reel deleted successfully!');
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
      <Breadcrumb pageName="All Hardy Reels" backLink="/" createLink='/hardyreels/create' />
      <WidgetCard parameter='hardy_reels'/>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-1" onSubmit={handleSearch}>
          <input
            type="text"
            name="reel_id"
            placeholder="Reel ID"
            value={searchParams.reel_id}
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
            name="foot"
            placeholder="Foot"
            value={searchParams.foot}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="cost_price"
            placeholder="Cost"
            value={searchParams.cost_price}
            onChange={handleInputChange}
            className="col-span-1 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="handle"
            placeholder="Handle"
            value={searchParams.handle}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="tension_regultor"
            placeholder="Tension Regulator"
            value={searchParams.tension_regultor}
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
      <div className="w-full overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3 mt-2">
        {/* Table and Pagination */}
        <table className="min-w-full border-collapse border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-left text-gray-600">
            {/* Table Header */}
            <tr className="py-2">
              <th className="border-b border-gray-300 p-2"></th>
              <th className="border-b border-gray-300 p-2 w-20">Reel ID</th>
              <th className="border-b border-gray-300 p-2 w-30">Makers Name</th>
              <th className="border-b border-gray-300 p-2 w-30">Model</th>
              <th className="border-b border-gray-300 p-2 w-30">Sub Model</th>
              <th className="border-b border-gray-300 p-2 w-30">Size</th>
              <th className="border-b border-gray-300 p-2 w-30">Foot</th>
              <th className="border-b border-gray-300 p-2 w-30">Handle</th>
              <th className="border-b border-gray-300 p-2 w-30">Tension Regulator</th>
              <th className="border-b border-gray-300 p-2 w-20">Cost</th>
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
            {reels.map((reel) => (
              <tr className="hover:bg-gray-50" key={reel.id}>
                <td className="border-b border-gray-50 p-1 w-10 relative">
                <div className="action-buttons w-40">
                    <Link to={`/hardyreels/edit/${reel.id}`} className="text-yellow-500 font-bold hover:underline">Edit</Link>
                    <span className="mx-2"></span>
                    <button onClick={() => deleteReel(reel.id)} className="text-red-500 font-bold">Delete</button>
                  </div>
                </td>
                <td className="border-b border-gray-50 p-1">{reel.reel_id}</td>
                <td className="border-b border-gray-50 p-1">{reel.makers_name}</td>
                <td className="border-b border-gray-50 p-1">{reel.model}</td>
                <td className="border-b border-gray-50 p-1">{reel.sub_model}</td>
                <td className="border-b border-gray-50 p-1">{reel.size}</td>
                <td className="border-b border-gray-50 p-1">{reel.foot}</td>
                <td className="border-b border-gray-50 p-1">{reel.handle}</td>
                <td className="border-b border-gray-50 p-1">{reel.transition_regulator}</td>
                <td className="border-b border-gray-50 p-1">{Math.floor(reel.cost_price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-gray-500">Total Reels: {pageInfo.total} | Page {pageInfo.current_page}</div>
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

export default AllReels;
