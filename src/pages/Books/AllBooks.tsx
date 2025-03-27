import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';
import WidgetCard from '../GeneralComponenet/WidgetCard';

const AllBooks: React.FC = () => {

  const navigate = useNavigate();

  const [books, setBooks] = useState<any[]>([]);
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
    book_id: '',
    title: '',
    author: '',
    publisher: '',
    publication_year: '',
    edition: '',
  });
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const fetchBooks = async (params = {}, nextPageUrl = null, perPage = 25) => {
    setLoading(true);
  
    // Filter out empty parameters
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
  
    try {
      const url = nextPageUrl || constants.BASE_URL + '/books';
      const response = await axios.get(url, { params: { ...filteredParams, per_page: perPage } });
      setBooks(response.data.data);
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
    fetchBooks(searchParams, nextPage);
  };

  const handlePrevPage = async () => {
    fetchBooks(searchParams, prevPage);
  };

  useEffect(() => {
    fetchBooks();
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
    fetchBooks(searchParams,null, 1000);
  };
  const resetForm = () => {
    setSearchParams({
      book_id: '',
      title: '',
      author: '',
      publisher: '',
      publication_year: '',
      edition: '',
    });

    fetchBooks({}, null, 25);
  };

  const duplicateBook = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to duplicate this Book?');

    if (!isConfirmed) {
      return; // Exit if the user cancels the action
    }
    try {
      const response = await axios.post(constants.BASE_URL + '/book/duplicate/'+id );
      fetchBooks();
      toast.success(response.data.message);
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

  const deleteBook = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Book?');

    if (!isConfirmed) {
      return; // Exit if the user cancels the action
    }
    try {
      await axios.post(constants.BASE_URL + '/book/delete', { id });
      // Update state to remove the deleted book
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      toast.success('Book deleted successfully!');
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

  const handleCheckboxChange = (id: number) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((bookId) => bookId !== id) : [...prevSelected, id]
    );
  };

  const handleCompare = () => {
    console.log('Selected Books for Comparison:', selectedBooks);
    if(selectedBooks.length < 2){
      toast.error('Please select at least two books to compare.');
    }else{
      navigate('/books/compare?book_ids=' + selectedBooks.join(','));
    }
  };
  return (
    <>
      <Breadcrumb pageName="All Books" backLink="/" createLink='/books/create' />
      <WidgetCard parameter='books'/>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-1" onSubmit={handleSearch}>
          <input
            type="text"
            name="book_id"
            placeholder="Book ID"
            value={searchParams.book_id}
            onChange={handleInputChange}
            className="col-span-1 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={searchParams.title}
            onChange={handleInputChange}
            className="col-span-3 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="author"
            placeholder="Book Author"
            value={searchParams.author}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="publisher"
            placeholder="Book Publisher"
            value={searchParams.publisher}
            onChange={handleInputChange}
            className="col-span-2 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="publication_year"
            placeholder="Publication Year"
            value={searchParams.publication_year}
            onChange={handleInputChange}
            className="col-span-1 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="edition"
            placeholder="Edition"
            value={searchParams.edition}
            onChange={handleInputChange}
            className="col-span-1 border border-blue-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <tr className="py-2">
      <th className="border-b border-gray-300 p-2 w-10 pl-4">&nbsp;</th>
      <th className="border-b border-gray-300 p-2 w-10"></th>
      <th className="border-b border-gray-300 p-2 w-40">Book ID</th>
      <th className="border-b border-gray-300 p-2 w-20">Thumbnail</th>
      <th className="border-b border-gray-300 p-2">Book Name</th>
      <th className="border-b border-gray-300 p-2 w-40">Author</th>
      <th className="border-b border-gray-300 p-2 w-40">Publisher</th>
      <th className="border-b border-gray-300 p-2 w-20">Year</th>
      <th className="border-b border-gray-300 p-2 w-30">Edition</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan={7} className="text-center">Loading...</td>
      </tr>
    ) : error ? (
      <tr>
        <td colSpan={7} className="text-center">Error: {error.message}</td>
      </tr>
    ) : null}
    {books.map((book) => (
      <tr className="hover:bg-gray-50" key={book.id}>
        <td className="border-b border-gray-50 p-1 w-10 pl-4">
          <input
            type="checkbox"
            className="w-4 h-4"
            name="id"
            value={book.id}
            onChange={() => handleCheckboxChange(book.id)}
          />
        </td>
        <td className="border-b border-gray-50 p-1 w-10 pr-5 relative">
          <div className="action-buttons w-60">
            <Link to={`/books/edit/${book.id}`} className="text-yellow-500 font-bold hover:underline">Edit</Link>
            <span className="mx-2"></span>
            <button onClick={() => duplicateBook(book.id)} className="text-green-500 font-bold hover:underline">Duplicate</button>
            <span className="mx-2"></span>
            <button onClick={() => deleteBook(book.id)} className="text-red-500 font-bold">Delete</button>
          </div>
        </td>
        <td className="border-b border-gray-50 p-1">{book.book_id}</td>
        <td className="border-b border-gray-50 p-1">
        {(() => {
          const thumbnailImage = book?.book_media?.find(media => media.thumbnail === 'thumbnail');
          // const firstImage = book?.book_media?.[0];

          const imagePath = thumbnailImage
              ? `${constants.BASE_ASSET_URL}/storage/${thumbnailImage.media_path}`
              // : firstImage
              // ? `${constants.BASE_ASSET_URL}/storage/${firstImage.media_path}`
              : null;

            return imagePath ? (
                <img 
                    src={imagePath}
                    alt="Thumbnail"
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '50%'
                    }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                />
            ) : null;
        })()}

        </td>
        <td className="border-b border-gray-50 p-1">{book.title}</td>
        <td className="border-b border-gray-50 p-1">{book.author}</td>
        <td className="border-b border-gray-50 p-1">{book.publisher}</td>
        <td className="border-b border-gray-50 p-1">{book.publication_year}</td>
        <td className="border-b border-gray-50 p-1">{book.edition}</td>
      </tr>
    ))}
  </tbody>
</table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-3">
          <button className='bg-primary py-1 px-3 rounded-lg text-white' onClick={handleCompare}>Compare Books</button>
          <div className="text-gray-500">Total Books: {pageInfo.total} | Page {pageInfo.current_page}</div>
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

export default AllBooks;
