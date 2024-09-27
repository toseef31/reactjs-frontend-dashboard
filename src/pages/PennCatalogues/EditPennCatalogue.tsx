import React, { useEffect,useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';
import MediaGallery from './Components/MediaGallery';

const EditPennCatalogue: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isNewCreated = queryParams.get('newCreated') === 'true';

    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any[] | null>(null);
    const [pennCataloguesForm, setPennCataloguesForm] = useState({
        id:id,
        name: '',
        year: '',
        catalogue_no: '',
        condition: '',
        cost_price: '',
        add_date: '',
        sold_price: '',
        sold_date: '',
        buyer_name: '',
        buyer_email: '',
        valuation: '',
    });
      
  const submitPennCatalogue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
        try{
            const url = constants.BASE_URL + '/penn-catalogues/edit';
            await axios.post(url, pennCataloguesForm);
            setUpdated(true);
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

  const fetchPennCatalogue = async () => {
    try{
        const url = constants.BASE_URL + '/penn-catalogue/' + id;
        const response = await axios.get(url);
        setPennCataloguesForm(response.data.data);
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
    fetchPennCatalogue();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPennCataloguesForm((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <>
    <Breadcrumb pageName="Edit Penn Catalogue" backLink='/penn-catalogues/all' createLink='/penn-catalogues/create' />
    <div>
    {isNewCreated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        PennCatalogue created successfully!
        </div>
    )}
    {updated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        PennCatalogue Updated successfully!
        </div>
    )}
    </div>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-4 p-4 mx-auto bg-white rounded-lg" onSubmit={submitPennCatalogue}>
        <div className="col-span-6 flex flex-col gap-2">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">PennCatalogues Details</label>
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Name</label>
                        <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={pennCataloguesForm.name}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-3 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Year</label>
                        <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={pennCataloguesForm.year}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Catalogue #</label>
                        <input
                        type="text"
                        name="catalogue_no"
                        placeholder="Catalogue #"
                        value={pennCataloguesForm.catalogue_no}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Condition</label>
                        <textarea
                        name="condition"
                        placeholder="Condition"
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >{pennCataloguesForm.condition}</textarea>
                    </div>

                </div>
            </div>

            <div className="col-span-2 flex flex-wrap flex-col gap-2">

            </div>
            <div className="col-span-4 flex flex-col gap-2">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Costing and History</label>
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Date Added</label>
                        <input
                        type="date"
                        name="add_date"
                        value={pennCataloguesForm.add_date}
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
                        value={pennCataloguesForm.cost_price}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Valuation</label>
                        <input
                        type="text"
                        name="valuation"
                        placeholder="Valuation"
                        value={pennCataloguesForm.valuation}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Date Sold</label>
                        <input
                        type="date"
                        name="sold_date"
                        value={pennCataloguesForm.sold_date}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Sold Price</label>
                        <input
                        type="number"
                        name="sold_price"
                        placeholder="Sold Price"
                        value={pennCataloguesForm.sold_price}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Customer Information</label>
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Sold To</label>
                        <input
                        type="text"
                        name="buyer_name"
                        placeholder="Buyer Name"
                        value={pennCataloguesForm.buyer_name}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Buyer Email</label>
                        <input
                        type="email"
                        name="buyer_email"
                        placeholder="Buyer Email"
                        value={pennCataloguesForm.buyer_email}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-12 flex justify-between mt-4">
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
    <MediaGallery pennCatalogue_id={id} />
    <ToastContainer />
    </>
  );
};

export default EditPennCatalogue;
