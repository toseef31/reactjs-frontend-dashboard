import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';

const Types: React.FC = () => {
    const [types, setTypes] = useState<any[]>([]);
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [nextPageEnabled, setNextPageEnabled] = useState(false);
    const [prevPageEnabled, setPrevPageEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        current_page: 1,
        total: 1,
    });
    const [error, setError] = useState<any>(null);


  const fetchTypes = async (nextPageUrl = null, perPage = 50) => {
    setLoading(true);
  
    try {
      const url = nextPageUrl || constants.BASE_URL + '/types';
      const response = await axios.get(url, { params: { per_page: perPage } });
      setTypes(response.data.data);
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
    fetchTypes(nextPage);
  };

  const handlePrevPage = async () => {
    fetchTypes(prevPage);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const deleteType = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Type?');

    if (!isConfirmed) {
      return; // Exit if the user cancels the action
    }
    try {
      await axios.post(constants.BASE_URL + '/type/delete', { id });
      // Update state to remove the deleted book
      setTypes(prevBooks => prevBooks.filter(book => book.id !== id));
      toast.success('Type deleted successfully!');
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
      <Breadcrumb pageName="All Types" backLink="/" createLink="/ephemera-types/create" />
      <div className="w-full overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3 mt-2">
        {/* Table and Pagination */}
        <table className="min-w-full border-collapse border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-left text-gray-600">
            {/* Table Header */}
            <tr className="py-2">
              <th className="border-b border-gray-300 p-2 w-10"></th>
              <th className="border-b border-gray-300 p-2 w-40 pl-5">Type</th>
              <th className="border-b border-gray-300 p-2">Description</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr>
                <td colSpan={3} className="text-center">
                Loading...
                </td>
            </tr>
            ) : error ? (
            <tr>
                <td colSpan={3} className="text-center">
                Error: {error.message}
                </td>
            </tr>
            ) : null}
            {types.map((type) => (
              <tr className="hover:bg-gray-50" key={type.id}>
                {/* Table Data */}
                <td className="border-b border-gray-50 p-1 w-10 pr-5 relative">
                  <div className="action-buttons w-60 bg-white">
                    <Link to={`/ephemera-types/edit/${type.id}`} className="text-yellow-500 font-bold hover:underline">Edit</Link>
                    <span className="mx-2"></span>
                    <button onClick={() => deleteType(type.id)} className="text-red-500 font-bold">Delete</button>
                  </div>
                </td>
                <td className="border-b border-gray-50 p-1 pl-5">{type.type}</td>
                <td className="border-b border-gray-50 p-1">{type.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-gray-500">Total Types: {pageInfo.total} | Page {pageInfo.current_page}</div>
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

export default Types;
