import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import constants from '../../../Constants';
import { toast, ToastContainer } from 'react-toastify';

interface MediaGalleryProps {
  rod_id: number;
  onPreviewImage?: (imageUrl: string) => void;
  onMediaChange?: () => void;
}

const MediaGallery = ({ rod_id, onPreviewImage, onMediaChange }: MediaGalleryProps) => {
  const [rodsMedia, setRodsMedia] = useState<any[]>([]);
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const basePath = constants.BASE_ASSET_URL + assetUrl;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRodsMedia = async () => {
    try {
      const url = `${constants.BASE_URL}/rods-media/${rod_id}`;
      const response = await axios.get(url);
      setRodsMedia(response.data.data.media);
      setAssetUrl(response.data.data.media_path);
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRodsMedia();
  }, [rod_id]);

  const deleteMedia = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await axios.post(`${constants.BASE_URL}/rods-media/delete`, { id });
      toast.success('Media deleted');
      await getRodsMedia();
      onMediaChange?.();
    } catch {
      toast.error('Failed to delete media');
    }
  };

  const setAsThumbnail = async (mediaId: number, fullPath: string) => {
    try {
      await axios.post(`${constants.BASE_URL}/rods-media/set-thumbnail`, {
        rod_id,
        media_id: mediaId,
      });
      toast.success('Thumbnail updated');
      onPreviewImage?.(fullPath);
      await getRodsMedia();
      onMediaChange?.();
    } catch {
      toast.error('Failed to set thumbnail');
    }
  };

  const viewMedia = (url: string) => {
    window.open(url, '_blank');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    formData.append('rod_id', String(rod_id));
    Array.from(files).forEach(file => {
      formData.append('media_file[]', file);
    });

    try {
      await axios.post(`${constants.BASE_URL}/create-rods-media`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Files uploaded');
      await getRodsMedia();
      onMediaChange?.();
    } catch {
      toast.error('Upload failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-5 mt-3">
      <div className="text-lg font-semibold my-4">Rods Media</div>
      <div className="grid grid-cols-12 gap-2">
        {rodsMedia.length > 0 ? (
          rodsMedia.map((media) => {
            const fullPath = `${basePath}${media.media_path}`;
            return (
              <div key={media.id} className="col-span-2 min-w-[150px] h-[150px] overflow-hidden border rounded-lg relative group">
                <img src={fullPath} alt={media.media_path} className="w-full h-full object-cover" />
                <div className="absolute top-0 right-2 mt-1 rounded p-1 bg-slate-300">
                  <div className="relative">
                    <button className="text-black text-xl font-bold focus:outline-none">&#8942;</button>
                    <div className="absolute right-0 mt-0 hidden group-hover:block bg-white shadow-lg rounded-md text-sm z-10 min-w-[120px]">
                      <button onClick={() => viewMedia(fullPath)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">View</button>
                      <button onClick={() => deleteMedia(media.id)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">Delete</button>
                      <button onClick={() => onPreviewImage?.(fullPath)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">Preview</button>
                      <button onClick={() => setAsThumbnail(media.id, fullPath)} className="block w-full px-4 py-1 text-left hover:bg-gray-100">Thumbnail</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-12 text-center">No media available</div>
        )}
        <div className="col-span-2 min-w-[150px] h-[150px] overflow-hidden border border-dashed rounded-lg relative">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-1">
            <button onClick={handleUploadClick} className="bg-primary text-white p-1 text-sm rounded">
              Upload
            </button>
          </div>
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
