import React, { useEffect,useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import constants from '../../Constants';
import { toast, ToastContainer } from 'react-toastify';
import MediaGallery from './Components/MediaGallery';


const CreateBook: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const [previewImage, setPreviewImage] = useState<string>('');

    const queryParams = new URLSearchParams(location.search);
    const isNewCreated = queryParams.get('newCreated') === 'true';

    const [bookProtected, setBookProtected] = useState({
        id:id,
        book_id: '',
    });
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any[] | null>(null);
    const [sizes, setSizes] = useState<any[]>([]);
    const [bookForm, setBookForm] = useState({
        id:id,
        book_id:'',
        title: '',
        author: '',
        publisher: '',
        publication_year: '',
        edition: '',
        pages: '',
        size: '',
        status: '',
        book_condition: '',
        jacket_condition: '',
        comment: '',
        add_date: '',
        cost_price: '',
        sold_price: '',
        sold_date: '',
        buyer_name: '',
        buyer_email: '',
        valuation: '',
        book_media: [],
    });
      
    const updateBookId = (newBookId:string) => {
        setBookProtected((prevState) => ({
          ...prevState, // Keep the existing state
          book_id: newBookId, // Update the book_id
        }));
      };
  const submitBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
        try{
            const url = constants.BASE_URL + '/book/edit';
            await axios.post(url, bookForm);
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

  const fetchBook = async () => {
    try{
        const url = constants.BASE_URL + '/book/' + id;
        const response = await axios.get(url);
        updateBookId(response.data.data.book_id);
        // delete response.data.data.book_id;
        setBookForm(response.data.data);
         // Reset preview image if the thumbnail was deleted
    const thumbnail = response.data.data.book_media?.find((m: any) => m.thumbnail === 'thumbnail');
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

  const fetchSizes = async () => {
    try{
        const url = constants.BASE_URL + '/sizes';
        const response = await axios.get(url);
        setSizes(response.data.data);
    }catch(err){
        if (axios.isAxiosError(err) && err.response) {
            console.error(err.response.data);
            toast.error('Error while fetching sizes, Check Console');
        } else {
            console.error('Unexpected Error:', err);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
  };
  useEffect(() => {
    fetchSizes();
    fetchBook();
    
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookForm((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <>
    <Breadcrumb pageName="Edit Book" backLink='/books/all' createLink='/books/create' />
    <div>
    {isNewCreated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        Book created successfully!
        </div>
    )}
    {updated && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
        Book Updated successfully!
        </div>
    )}
    </div>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        <form className="grid grid-cols-12 gap-4 p-4 mx-auto bg-white rounded-lg" onSubmit={submitBook}>
            <div className="col-span-6 flex flex-col gap-2">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Book Details</label>
                    </div>
                    <div className='col-span-3 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Book ID</label>
                        <input
                            type="text"
                            name="book_id"
                            placeholder="Book ID"
                            value={bookForm.book_id}
                            onChange={(e) =>
                                setBookForm((prevForm) => ({
                                    ...prevForm,
                                    book_id: e.target.value, // Allow editing
                                }))
                            }
                            className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />

                    </div>
                    <div className='col-span-12 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Title</label>
                        <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        value={bookForm.title}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-3 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Author</label>
                        <input
                        type="text"
                        name="author"
                        placeholder="Book Author"
                        value={bookForm.author}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Publisher</label>
                        <input
                        type="text"
                        name="publisher"
                        placeholder="Book Publisher"
                        value={bookForm.publisher}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Year of Publication</label>
                        <input
                        type="text"
                        min={1200}
                        max={new Date().getFullYear()}
                        name="publication_year"
                        placeholder="Year of Publication"
                        value={bookForm.publication_year}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Edition</label>
                        <input
                        type="text"
                        name="edition"
                        placeholder="Edition"
                        value={bookForm.edition}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Pages</label>
                        <input
                        type="number"
                        name="pages"
                        placeholder="Pages"
                        value={bookForm.pages}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2'>
                        <label className="text-sm font-semibold text-gray-600">Size</label>
                        <select
                        name="size"
                        value={bookForm.size}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="0">Select Size</option>
                            {sizes.map((size) => (
                                <option key={size.id} value={size.id} selected={bookForm.size === size.id}>
                                    {size.size + ' (' + size.description + ') '}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-12 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Status</label>
                        <select
                        name="size"
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="not_selected" selected={bookForm.status === 'not_selected'}>
                                Select Status
                            </option>
                            <option value="for_sale" selected={bookForm.status === 'for_sale'}>For Sale</option>
                            <option value="collection" selected={bookForm.status === 'collection'}>Collection</option>
                            <option value="sold" selected={bookForm.status === 'sold'}>Sold</option>
                        </select>
                    </div>
                        <div className="col-span-12 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Book Condition</label>
                        <textarea
                            name="book_condition"
                            placeholder="Book Condition"
                            onChange={handleInputChange}
                            value={bookForm.book_condition} // Use value prop here
                            className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        <div className="col-span-12 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Jacket Condition</label>
                        <textarea
                            name="jacket_condition"
                            placeholder="Jacket Condition"
                            onChange={handleInputChange}
                            value={bookForm.jacket_condition} // Use value prop here
                            className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        <div className="col-span-12 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-600">Comments</label>
                        <textarea
                            name="comment"
                            placeholder="Comments"
                            onChange={handleInputChange}
                            value={bookForm.comment} // Use value prop here
                            className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                </div>
                <div className="col-span-4 flex flex-col gap-2 mt-3">
                <div className='grid grid-cols-12 gap-4 '>
                    <div className='col-span-12 flex flex-col gap-2 border-b'>
                        <label className="text-lg font-semibold text-gray-600">Costing and History</label>
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Date Added</label>
                        <input
                        type="date"
                        name="add_date"
                        value={bookForm.add_date || new Date().toISOString().split('T')[0]} // Default to today's date
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
                        value={bookForm.cost_price}
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
                        value={bookForm.valuation}
                        onChange={handleInputChange}
                        className="border border-blue-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-6 flex flex-col gap-2 hidden'>
                        <label className="text-sm font-semibold text-gray-600">Date Sold</label>
                        <input
                        type="date"
                        name="sold_date"
                        value={bookForm.sold_date}
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
                        value={bookForm.sold_price}
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
                        value={bookForm.buyer_name}
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
                        value={bookForm.buyer_email}
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
                ) : (
                    (() => {
                    const thumbnailImage = bookForm?.book_media?.find(media => media.thumbnail === 'thumbnail');
                    // const lastImage = bookForm?.book_media?.length > 0 ? bookForm.book_media[bookForm.book_media.length - 1] : null;
                    const imageUrl = thumbnailImage
                        ? `${constants.BASE_ASSET_URL}/storage/${thumbnailImage.media_path}`
                        // : lastImage
                        // ? `${constants.BASE_ASSET_URL}/storage/${lastImage.media_path}`
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
                )}
                </div>
            </div>
            <div className="col-span-12 flex justify-between mt-4">
                <div>{error && <div className="text-red-500">{`${error.message} : ${error.error}`}</div>}</div>
                <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                >
                {loading ? ("Saving...") : ("Update")}
                </button>
            </div>
        </form>
    </div>
    <MediaGallery book_id={id} onPreviewImage={(imageUrl) => setPreviewImage(imageUrl)} onMediaChange={fetchBook}/>
    <ToastContainer />
    </>
  );
};

export default CreateBook;
