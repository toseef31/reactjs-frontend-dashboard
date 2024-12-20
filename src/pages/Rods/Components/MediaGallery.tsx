import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import constants from '../../../Constants';
import { toast, ToastContainer } from 'react-toastify';

interface MediaGalleryProps {
    rod_id: number;
}

const MediaGallery = ({ rod_id }: MediaGalleryProps) => {
    const [rodsMedia, setRodsMedia] = useState<any[]>([]);
    const [assetUrl, setAssetUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const basePath = constants.BASE_ASSET_URL+assetUrl;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getRodsMedia = async () => {
        try {
            const url = `${constants.BASE_URL}/rods-media/${rod_id}`;
            const response = await axios.get(url);
            setRodsMedia(response.data.data.media);
            setAssetUrl(response.data.data.media_path);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRodsMedia();
    }, [rod_id]);

    const deleteMedia = async (id: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this File?');

        if (!isConfirmed) {
          return; // Exit if the user cancels the action
        }
        try {
            const url = `${constants.BASE_URL}/rods-media/delete`;
            const response = await axios.post(url, { id });
            toast.success(response.data.message);
            getRodsMedia();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };
    const viewMedia = async (media_path: string) => {
        window.open(`${media_path}`, '_blank');
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the hidden file input
        }
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const formData = new FormData();
            formData.append('rod_id', String(rod_id));
            for (let i = 0; i < files.length; i++) {
                formData.append('media_file[]', files[i]); // Append each file to formData
            }

            try {
                const url = `${constants.BASE_URL}/create-rods-media`;
                await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Files uploaded successfully!');
                getRodsMedia(); // Refresh media after upload
            } catch (err) {
                toast.error('Failed to upload files.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-white p-5 mt-3">
            <div className="text-lg font-semibold my-4">Rods Media</div>
            <div className="grid grid-cols-12 gap-2">
                {rodsMedia.length > 0 ? (
                    rodsMedia.slice().reverse().map((media) => (
                        <div key={media.id} className="col-span-2 min-w-[150px] h-[150px] overflow-hidden border rounded-lg relative">
                            <img src={`${basePath}${media.media_path}`} alt={media.media_path} className="w-full h-full object-cover" />
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-baseline justify-between p-1">
                                <button className="bg-primary text-white p-1 text-sm rounded" onClick={() => viewMedia(basePath+media.media_path)}>View</button>
                                <button className="bg-danger text-white p-1 text-sm rounded" onClick={() => deleteMedia(media.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-12 text-center">No media available</div>
                )}
                <div className="col-span-2 min-w-[150px] h-[150px] overflow-hidden border border-dashed rounded-lg relative">
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-1">
                        <button onClick={handleUploadClick} className="bg-primary text-white p-1 text-sm rounded">
                            Upload
                        </button>
                    </div>
                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MediaGallery;
