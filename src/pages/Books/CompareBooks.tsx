import React from "react";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const CompareBooks: React.FC = () => {
    return <>
    <Breadcrumb pageName="Compare Books" backLink="/books/all" />
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
    <div className="overflow-x-auto">
            <div className="min-w-max flex space-x-4 p-2 pb-4">

                <div className="bg-white shadow-md rounded-md p-2 w-64 flex-shrink-0 border border-dashed border-primary">
                    <h3 className="text-xl font-semibold mb-2">Book Title 1</h3>
                    <img src="https://via.placeholder.com/150" alt="Book 1" className="w-full h-40 object-cover mb-4 rounded-md" />
                    <p className="text-gray-700"><span className="font-medium">Author:</span> Author Name 1</p>
                    <p className="text-gray-700"><span className="font-medium">Genre:</span> Fiction</p>
                    <p className="text-gray-700"><span className="font-medium">Pages:</span> 320</p>
                    <p className="text-gray-700"><span className="font-medium">Price:</span> $20.99</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-2 w-64 flex-shrink-0 border border-dashed border-primary">
                    <h3 className="text-xl font-semibold mb-2">Book Title 1</h3>
                    <img src="https://via.placeholder.com/150" alt="Book 1" className="w-full h-40 object-cover mb-4 rounded-md" />
                    <p className="text-gray-700"><span className="font-medium">Author:</span> Author Name 1</p>
                    <p className="text-gray-700"><span className="font-medium">Genre:</span> Fiction</p>
                    <p className="text-gray-700"><span className="font-medium">Pages:</span> 320</p>
                    <p className="text-gray-700"><span className="font-medium">Price:</span> $20.99</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-2 w-64 flex-shrink-0 border border-dashed border-primary">
                    <h3 className="text-xl font-semibold mb-2">Book Title 1</h3>
                    <img src="https://via.placeholder.com/150" alt="Book 1" className="w-full h-40 object-cover mb-4 rounded-md" />
                    <p className="text-gray-700"><span className="font-medium">Author:</span> Author Name 1</p>
                    <p className="text-gray-700"><span className="font-medium">Genre:</span> Fiction</p>
                    <p className="text-gray-700"><span className="font-medium">Pages:</span> 320</p>
                    <p className="text-gray-700"><span className="font-medium">Price:</span> $20.99</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-2 w-64 flex-shrink-0 border border-dashed border-primary">
                    <h3 className="text-xl font-semibold mb-2">Book Title 1</h3>
                    <img src="https://via.placeholder.com/150" alt="Book 1" className="w-full h-40 object-cover mb-4 rounded-md" />
                    <p className="text-gray-700"><span className="font-medium">Author:</span> Author Name 1</p>
                    <p className="text-gray-700"><span className="font-medium">Genre:</span> Fiction</p>
                    <p className="text-gray-700"><span className="font-medium">Pages:</span> 320</p>
                    <p className="text-gray-700"><span className="font-medium">Price:</span> $20.99</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-2 w-64 flex-shrink-0 border border-dashed border-primary">
                    <h3 className="text-xl font-semibold mb-2">Book Title 1</h3>
                    <img src="https://via.placeholder.com/150" alt="Book 1" className="w-full h-40 object-cover mb-4 rounded-md" />
                    <p className="text-gray-700"><span className="font-medium">Author:</span> Author Name 1</p>
                    <p className="text-gray-700"><span className="font-medium">Genre:</span> Fiction</p>
                    <p className="text-gray-700"><span className="font-medium">Pages:</span> 320</p>
                    <p className="text-gray-700"><span className="font-medium">Price:</span> $20.99</p>
                </div>

            </div>
        </div>
    </div>
    </>;
};

export default CompareBooks;