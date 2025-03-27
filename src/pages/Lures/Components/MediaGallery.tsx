import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import constants from '../../../Constants';
import { toast, ToastContainer } from 'react-toastify';

interface MediaGalleryProps {
  lures_id: number;
  onPreviewImage: (imageUrl: string) => void;
  onMediaChange: () => void;
}

const MediaGallery = ({ lures_id, onPreviewImage, onMediaChange }: MediaGalleryProps) => {
  const [luresMedia, setLuresMedia] = useState<any[]>([]);
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const basePath = constants.BASE_ASSET_URL + assetUrl;

  const getLuresMedia = async () => {
    try {
      const url = `${constants.BASE_URL}/lures-media/${lures_id}`;
      const response = await axios.get(url);
      setLuresMedia(response.data.data.media);
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
    getLuresMedia();
  }, [lures_id]);

  const deleteMedia = async (id: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this File?');
    if (!isConfirmed) return;

    try {
      const url = `${constants.BASE_URL}/lures-media/delete`;
      const response = await axios.post(url, { id });
      toast.success(response.data.message);
      getLuresMedia();
      onMediaChange();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const viewMedia = (media_path: string) => {
    window.open(`${media_path}`, '_blank');
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const formData = new FormData();
      formData.append('lures_id', String(lures_id));
      for (let i = 0; i < files.length; i++) {
        formData.append('media_file[]', files[i]);
      }

      try {
        const url = `${constants.BASE_URL}/create-lures-media`;
        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Files uploaded successfully!');
        getLuresMedia();
        onMediaChange();
      } catch (err) {
        // toast.error('Failed to upload files.');
      }
    }
  };

  const setAsThumbnail = async (mediaId: number, media_file: string) => {
    try {
      const url = `${constants.BASE_URL}/lures-media/set-thumbnail`;
      await axios.post(url, {
        lures_id,
        media_id: mediaId,
      });
      onPreviewImage(media_file);
      toast.success('Thumbnail set successfully!');
      getLuresMedia();
      onMediaChange();
    } catch (err) {
    //   toast.error('Failed to set thumbnail.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-5 mt-3">
      <div className="text-lg font-semibold my-4">Lures Media</div>
      <div className="grid grid-cols-12 gap-2">
        {luresMedia.length > 0 ? (
          luresMedia.map((media) => (
            <div key={media.id} className="col-span-2 min-w-[150px] h-[150px] overflow-hidden border rounded-lg relative group">
              <img src={`${basePath}${media.media_path}`} alt={media.media_path} className="w-full h-full object-cover" />
              <div className="absolute top-0 right-2 mt-1 rounded p-1 bg-slate-300">
                <div className="relative">
                  <button className="text-black text-xl font-bold focus:outline-none">&#8942;</button>
                  <div className="absolute right-0 mt-0 hidden group-hover:block bg-white shadow-lg rounded-md text-sm z-10 min-w-[120px]">
                    <button onClick={() => viewMedia(basePath + media.media_path)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">
                      View
                    </button>
                    <button onClick={() => deleteMedia(media.id)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">
                      Delete
                    </button>
                    <button onClick={() => onPreviewImage(basePath + media.media_path)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">
                      Preview
                    </button>
                    <button onClick={() => setAsThumbnail(media.id, basePath + media.media_path)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">
                      Thumbnail
                    </button>
                  </div>
                </div>
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
          <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.gif" multiple className="hidden" onChange={handleFileChange} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MediaGallery;
