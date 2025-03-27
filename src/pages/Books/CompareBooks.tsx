import React , { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';

const CompareBooks = () => {
    const location = useLocation();
    const bookIds = location.search.split('=')[1].split(',');

    const [books, setBooks] = useState<any[]>([]);

    const fetchBooks = async () => {
        try {
            const url = constants.BASE_URL + '/books/compare';
            const response = await axios.post(url, { book_ids: bookIds });
            setBooks(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Unexpected Error:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);
    return <>
    <Breadcrumb pageName="Compare Books" backLink="/books/all" />
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
    <div className="overflow-x-auto">
            <div className="min-w-max flex space-x-4 p-2 pb-4">

                {books.map((book) => (
                    <div className="bg-white shadow-md rounded-md p-2 w-64 flex-shrink-0 border border-dashed border-primary">
                        <div className="min-h[400px] h-auto max-h-[600px]">
                            <h3 className="text-xl text-primary font-semibold mb-2">{book.title}</h3>
                            <p className="text-gray-700 mb-2"><span className="font-medium text-primary">Author:</span>{book.author}</p>
                            <hr />
                            <p className="text-gray-700 mt-2"><span className="font-medium text-primary">Publisher:</span> {book.publisher}</p>
                            <p className="text-gray-700"><span className="font-medium text-primary">Publication Year:</span> {book.publication_year}</p>
                            <p className="text-gray-700"><span className="font-medium text-primary">Edition:</span> {book.edition}</p>
                            <p className="text-gray-700"><span className="font-medium text-primary">Size:</span> {book.book_size ? book.book_size.size: 'N/A'}</p>
                            <p className="text-gray-700"><span className="font-medium text-primary">Pages:</span> {book.pages}</p>
                            <p className="text-gray-700 mb-2"><span className="font-medium text-primary">Status:</span> {
                                    book.status == 'for_sale' ? 'For Sale' : book.status == 'collection' ? 'Collection' : book.status == 'sold' ? 'Sold' : 'N/A'}</p>
                            <hr />
                            <p className="text-gray-700 mt-2"><span className="font-medium text-primary">Cost:</span> {book.cost_price ? `$${book.cost_price}` : 'N/A'}</p>
                            <p className="text-gray-700"><span className="font-medium text-primary">Added Date:</span> {book.add_date}</p>
                            <p className="text-gray-700"><span className="font-medium text-primary">Valuation:</span> {book.valuation ? `$${book.valuation}` : 'N/A'}</p>
                            <p className="text-gray-700"><span className="font-medium text-primary">Sold Cost:</span> {book.sold_price ? `$${book.sold_price}` : 'N/A'}</p>
                            <p className="text-gray-700 mb-2"><span className="font-medium text-primary">Sold Date:</span> {book.sold_date}</p>
                            <hr />
                            <p className="text-gray-700 mt-2"><span className="font-medium text-primary">Book Condition:</span> {book.book_condition}</p>
                            <p className="text-gray-700 mt-2"><span className="font-medium text-primary">Jacket Condition:</span> {book.jacket_condition}</p>
                            <p className="text-gray-700 mt-2"><span className="font-medium text-primary">Comments:</span> {book.comment}</p>
                        </div>
                        <div className="flex justify-start items-center flex-wrap gap-2 my-3">
                            {book.book_media.slice().map((image: any) => (
                                <img src={`${constants.BASE_ASSET_URL}/storage/${image.media_path}`} onClick={() => window.open(`${constants.BASE_ASSET_URL}/storage/${image.media_path}`, '_blank')} alt={book.title} className="w-[70px] h-[70px] object-cover rounded-md cursor-pointer first-compare-image" />
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    </div>
    <ToastContainer />
    </>;
};

export default CompareBooks;