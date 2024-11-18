import React, { useEffect,useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';
import MediaGallery from './Components/MediaGallery';

const CreateReel: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isNewCreated = queryParams.get('newCreated') === 'true';

    const [reelProtected, setReelProtected] = useState({
        id:id,
        reel_id: '',
    });
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any[] | null>(null);
    const [reelForm, setReelForm] = useState({
        id:id,
        makers_name: '',
        model: '',
        sub_model: '',
        handle: '',
        foot: '',
        approximate_date: '',
        tension_regultor: '',
        size: '',
        details: '',
        condition: '',
        cost_price: '',
        add_date: '',
        sold_price: '',
        sold_date: '',
        buyer_name: '',
        buyer_email: '',
        valuation: '',
        reel_media: [],
    });
      
    const updateReelId = (newReelId:string) => {
        setReelProtected((prevState) => ({
          ...prevState, // Keep the existing state
          reel_id: newReelId, // Update the reel_id
        }));
      };
  const submitReel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
        try{
            const url = constants.BASE_URL + '/hardyreel/edit';
            await axios.post(url, reelForm);
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

  const fetchReel = async () => {
    try{
        const url = constants.BASE_URL + '/hardyreel/' + id;
        const response = await axios.get(url);
        updateReelId(response.data.data.reel_id);
        delete response.data.data.reel_id;
        setReelForm(response.data.data);
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
    fetchReel();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReelForm((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <>
    <Breadcrumb pageName="Edit Hardy Reel" backLink='/hardyreels/all' createLink='/hardyreels/create' />
    <div>
    {isNewCreated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        Reel created successfully!
        </div>
    )}
    {updated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        Reel Updated successfully!
        </div>
    )}
    </div>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-4 p-4 mx-auto bg-white rounded-lg" onSubmit={submitReel}>
        <div className="col-span-6 flex flex-col gap-2">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Reel Details</label>
                    </div>
                    <div className='col-span-3 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Reel ID</label>
                        <input
                        type="text"
                        name="reel_id"
                        placeholder="Reel ID"
                        value={reelProtected.reel_id}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-yellow-100 disabled:cursor-not-allowed"
                        disabled
                        />
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Makers Name</label>
                        <input
                        type="text"
                        name="makers_name"
                        placeholder="Makers Name"
                        value={reelForm.makers_name}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-3 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Model</label>
                        <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={reelForm.model}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Sub Model</label>
                        <input
                        type="text"
                        name="sub_model"
                        placeholder="Sub Model"
                        value={reelForm.sub_model}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Approximate Date</label>
                        <input
                        type="text"
                        name="approximate_date"
                        placeholder="Approximate Date"
                        value={reelForm.approximate_date}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Size</label>
                        <input
                        type="text"
                        name="size"
                        placeholder="Size"
                        value={reelForm.size}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-8 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Foot</label>
                        <input
                        type="text"
                        name="foot"
                        placeholder="Foot"
                        value={reelForm.foot}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Handle</label>
                        <input
                        type="text"
                        name="handle"
                        placeholder="Handle"
                        value={reelForm.handle}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Tension Regulator</label>
                        <input
                        type="text"
                        name="tension_regultor"
                        placeholder="Tension Regulator"
                        value={reelForm.tension_regultor}
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
                        value={reelForm.condition}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >{reelForm.condition}</textarea>
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Details</label>
                        <textarea
                        name="details"
                        placeholder="Details"
                        value={reelForm.details}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >{reelForm.details}</textarea>
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
                        value={reelForm.add_date}
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
                        value={reelForm.cost_price}
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
                        value={reelForm.valuation}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Date Sold</label>
                        <input
                        type="date"
                        name="sold_date"
                        value={reelForm.sold_date}
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
                        value={reelForm.sold_price}
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
                        value={reelForm.buyer_name}
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
                        value={reelForm.buyer_email}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-12'>
                    {reelForm?.reel_media?.length > 0 && (
                        <img 
                            src={`${constants.BASE_ASSET_URL}/storage/${reelForm?.reel_media[reelForm?.reel_media?.length-1].media_path}`} 
                            alt='404'
                            style={{width: '100%', height: '320px', objectFit: 'cover', borderRadius: '15px'}} 
                        />
                    )}
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
    <MediaGallery reel_id={id} />
    <ToastContainer />
    </>
  );
};

export default CreateReel;
