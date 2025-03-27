import React, { useEffect,useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';
import MediaGallery from './Components/MediaGallery';

const EditRods: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isNewCreated = queryParams.get('newCreated') === 'true';
    const [previewImage, setPreviewImage] = useState<string>('');


    const [rodsProtected, setRodsProtected] = useState({
        id:id,
        rod_id: '',
    });
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any[] | null>(null);
    const [rodsForm, setRodsForm] = useState({
        id:id,
        makers_name: '',
        model: '',
        sub_model: '',
        serial_no: '',
        approximate_date: '',
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
        rods_media: [],
    });
      
    const updateRodsId = (newRodsId:string) => {
        setRodsProtected((prevState) => ({
          ...prevState, // Keep the existing state
          rod_id: newRodsId, // Update the rod_id
        }));
      };
  const submitRods = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
        try{
            const url = constants.BASE_URL + '/rods/edit';
            await axios.post(url, rodsForm);
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

  const fetchRods = async () => {
    try{
        const url = constants.BASE_URL + '/rod/' + id;
        const response = await axios.get(url);
        updateRodsId(response.data.data.rod_id);
        delete response.data.data.rod_id;
        setRodsForm(response.data.data);
        const thumbnail = response.data.data.rods_media?.find((m: any) => m.thumbnail === 'thumbnail');
       setPreviewImage(thumbnail ? `${constants.BASE_ASSET_URL}/storage/${thumbnail.media_path}` : '');
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
    fetchRods();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRodsForm((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <>
    <Breadcrumb pageName="Edit Rods" backLink='/rods/all' createLink='/rods/create' />
    <div>
    {isNewCreated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        Rods created successfully!
        </div>
    )}
    {updated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        Rods Updated successfully!
        </div>
    )}
    </div>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-4 p-4 mx-auto bg-white rounded-lg" onSubmit={submitRods}>
        <div className="col-span-6 flex flex-col gap-2">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Rods Details</label>
                    </div>
                    <div className='col-span-3 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Rods ID</label>
                        <input
                        type="text"
                        name="rod_id"
                        placeholder="Rods ID"
                        value={rodsProtected.rod_id}
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
                        value={rodsForm.makers_name}
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
                        value={rodsForm.model}
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
                        value={rodsForm.sub_model}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Approximate Date</label>
                        <input
                        type="date"
                        name="approximate_date"
                        placeholder="Approximate Date"
                        value={rodsForm.approximate_date}
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
                        value={rodsForm.size}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-8 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Serial Number</label>
                        <input
                        type="text"
                        name="serial_no"
                        placeholder="Serial Number"
                        value={rodsForm.serial_no}
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
                        >{rodsForm.condition}</textarea>
                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Details</label>
                        <textarea
                        name="details"
                        placeholder="Details"
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >{rodsForm.details}</textarea>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-2 mt-3">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Costing and History</label>
                    </div>
                    {/* <div className='col-span-6 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Date Added</label>
                        <input
                        type="date"
                        name="add_date"
                        value={rodsForm.add_date || new Date().toISOString().split('T')[0]}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> */}
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Cost</label>
                        <input
                        type="number"
                        name="cost_price"
                        placeholder="Cost"
                        value={rodsForm.cost_price}
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
                        value={rodsForm.valuation}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Date Sold</label>
                        <input
                        type="date"
                        name="sold_date"
                        value={rodsForm.sold_date}
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
                        value={rodsForm.sold_price}
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
                        value={rodsForm.buyer_name}
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
                        value={rodsForm.buyer_email}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                 
                </div>
            </div>
            </div>

            <div className="col-span-1 flex flex-wrap flex-col gap-2">

            </div>
            <div className="col-span-5 flex flex-wrap flex-col gap-2">
                <div className="col-span-12">
                    {previewImage ? (
                    <img
                        src={previewImage}
                        alt="Preview"
                        style={{ objectFit: 'cover', borderRadius: '15px' }}
                    />
                    ) : rodsForm?.rods_media?.length > 0 ? (
                    (() => {
                        const thumbnailImage = rodsForm.rods_media.find(
                        (media) => media.thumbnail === 'thumbnail'
                        );
                        const imageUrl = thumbnailImage
                        ? `${constants.BASE_ASSET_URL}/storage/${thumbnailImage.media_path}`
                        : null;

                        return imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            style={{ objectFit: 'cover', borderRadius: '15px' }}
                        />
                        ) : (
                        <div className="w-full h-[320px] flex items-center justify-center border border-gray-300 rounded-lg text-gray-400">
                            No Image Available
                        </div>
                        );
                    })()
                    ) : (
                    <div className="w-full h-[320px] flex items-center justify-center border border-gray-300 rounded-lg text-gray-400">
                        No Image Available
                    </div>
                    )}
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
    <MediaGallery
        rod_id={id}
        onPreviewImage={(imgUrl) => setPreviewImage(imgUrl)}
        onMediaChange={() => fetchRods()}
      />
    {/* <ToastContainer /> */}
    </>
  );
};

export default EditRods;
