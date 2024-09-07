import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import constants from '../../Constants';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const EditSize: React.FC = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    
    const [sizeForm, setSizeForm] = useState({
        id: id,
        size: '',
        description: '',
    });

    const fetchSize = async () => {
        try{
            const url = constants.BASE_URL + '/size/' + id;
            const response = await axios.get(url);
            setSizeForm(response.data.data);
        }catch(err){
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data);
            } else {
                console.error('Unexpected Error:', err);
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    };

    useEffect(() => {
        fetchSize();
    }, []);

  const submitSize = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try{
        const url = constants.BASE_URL + '/size/edit';
        const response = await axios.post(url, sizeForm);
        toast.success(response.data.message);
    }catch(err){
        if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data);
        } else {
            console.error('Unexpected Error:', err);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
    setLoading(false);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSizeForm((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <>
    <Breadcrumb pageName="Edit Size" backLink="/books/sizes" createLink="/books/size/create" />
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-4 p-4 mx-auto bg-white rounded-lg" onSubmit={submitSize}>
            <div className="col-span-12 flex flex-col gap-2">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Size Details</label>
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Size</label>
                        <input
                        type="text"
                        name="size"
                        placeholder="Size"
                        value={sizeForm.size}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Description</label>
                        <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={sizeForm.description}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="col-span-12 flex justify-between mt-4">
                    <div>
                {error && <div className="text-red-500">{error.message+" : "+error.error}</div>}
                </div>
                <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                >
                {loading ? ("Saving...") : ("Submit")}
                </button>
            </div>
            </div>
        </form>
    </div>
    <ToastContainer />
    </>
  );
};

export default EditSize;
