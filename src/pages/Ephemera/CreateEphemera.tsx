import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import constants from '../../Constants';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CreateEphemera: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any | null>(null);
    const [nextEphemera, setNextEphemera] = useState<any>(null);
    const [types, setTypes] = useState<any[]>([]);
    const [ephemeraForm, setEphemeraForm] = useState({
        type: '',
        details: '',
        size: '',
        approximate_date:'',
        condition: '',
        add_date: '',
        cost_price: '',
        sold_price: '',
        sold_date: '',
        buyer_name: '',
        buyer_email: '',
        valuation: '',
    });

  const submitEphemera = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try{
        const url = constants.BASE_URL + '/create-ephemera';
        const response = await axios.post(url, ephemeraForm);
        toast.success(response.data.message);
        navigate(`/ephemeras/edit/${response.data.data.id}?newCreated=true`);
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

  const fetchNextEphemera = async () => {
    try{
        const url = constants.BASE_URL + '/ephemeras/next';
        const response = await axios.get(url);
        setNextEphemera(response.data.data.ephemera_id);
    }catch(err){
        if (axios.isAxiosError(err) && err.response) {
            console.error(err.response.data);
        } else {
            console.error('Unexpected Error:', err);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
  }
  const fetchTypes = async () => {
    try{
        const url = constants.BASE_URL + '/types';
        const response = await axios.get(url);
        setTypes(response.data.data);
    }catch(err){
        if (axios.isAxiosError(err) && err.response) {
            console.error(err.response.data);
        } else {
            console.error('Unexpected Error:', err);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
  };

  useEffect(() => {
    fetchNextEphemera();
    fetchTypes();
  }, []);

  const resetForm = () => {
    setEphemeraForm({
        type: '',
        details: '',
        size: '',
        approximate_date:'Nill',
        condition: '',
        add_date: '',
        cost_price: '',
        sold_price: '',
        sold_date: '',
        buyer_name: '',
        buyer_email: '',
        valuation: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEphemeraForm((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <>
    <Breadcrumb pageName="Create Ephemera" backLink='/ephemeras/all' />
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-4 p-4 mx-auto bg-white rounded-lg" onSubmit={submitEphemera}>
            <div className="col-span-6 flex flex-col gap-2">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Ephemera Details</label>
                    </div>
                    <div className='col-span-3 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Ephemera ID</label>
                        <input
                        type="text"
                        name="ephemera_id"
                        placeholder="Ephemera ID"
                        value={nextEphemera}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-yellow-100 disabled:cursor-not-allowed"
                        disabled
                        />
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Details</label>
                        <input
                        type="text"
                        name="details"
                        placeholder="Ephemera Details"
                        value={ephemeraForm.details}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-3 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Size (W x H)</label>
                        <input
                        type="text"
                        name="size"
                        placeholder="Size"
                        value={ephemeraForm.size}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Approximate Year</label>
                        <input
                            type="number"
                            name="approximate_date"
                            placeholder="Enter Year"
                            value={ephemeraForm.approximate_date}
                            onChange={handleInputChange}// Restrict to current year
                            className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Type</label>
                        <select
                            name="type"
                            onChange={handleInputChange}
                            required
                            value={ephemeraForm.type}
                            className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                            <option value="">Select</option>
                            {types.map((size) => (
                                <option key={size.id} value={size.id}>
                                    {size.type}
                                </option>
                            ))}
                               
                        </select>

                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Ephemera Condition</label>
                        <textarea
                        name="condition"
                        placeholder="Ephemera Condition"
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >{ephemeraForm.condition}</textarea>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-2 mt-3">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Costing and History</label>
                    </div>
                    <div className='hidden col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Date Added</label>
                        <input
                        type="date"
                        name="add_date"
                        value={ephemeraForm.add_date || new Date().toISOString().split('T')[0]}// Default to today's date
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Cost</label>
                        <input
                        type="number"
                        name="cost_price"
                        placeholder="Cost"
                        value={ephemeraForm.cost_price}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Valuation</label>
                        <input
                        type="text"
                        name="valuation"
                        placeholder="Valuation"
                        value={ephemeraForm.valuation}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Date Sold</label>
                        <input
                        type="date"
                        name="sold_date"
                        value={ephemeraForm.sold_date}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Sold Cost</label>
                        <input
                        type="number"
                        name="sold_price"
                        placeholder="Sold Cost"
                        value={ephemeraForm.sold_price}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-12 flex flex-col gap-2 border-b hidden'>
                        <label className="text-lg font-semibold text-gray-600">Customer Information</label>
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Sold To</label>
                        <input
                        type="text"
                        name="buyer_name"
                        placeholder="Buyer Name"
                        value={ephemeraForm.buyer_name}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Buyer Email</label>
                        <input
                        type="email"
                        name="buyer_email"
                        placeholder="Buyer Email"
                        value={ephemeraForm.buyer_email}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
            </div>

            <div className="col-span-2 flex flex-wrap flex-col gap-2">

            </div>
          
            <div className="col-span-12 flex justify-between mt-4">
                <button
                type="button"
                onClick={resetForm}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                Reset
                </button>
                {error && <div className="text-red-500">{error.message+" : "+error.error}</div>}
                <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                >
                {loading ? ("Saving...") : ("Submit")}
                </button>
            </div>
        </form>
    </div>
    <ToastContainer />
    </>
  );
};

export default CreateEphemera;
