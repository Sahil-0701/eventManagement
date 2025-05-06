import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Gallery = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });
  const [newVideo, setNewVideo] = useState({ url: '', caption: '' });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get(`/api/gallery/event/${eventId}`);
        setGallery(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load gallery');
        setLoading(false);
      }
    };

    fetchGallery();
  }, [eventId]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/gallery/event/${eventId}/images`, newImage);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
      setNewImage({ url: '', caption: '' });
    } catch (err) {
      setError('Failed to add image');
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/gallery/event/${eventId}/videos`, newVideo);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
      setNewVideo({ url: '', caption: '' });
    } catch (err) {
      setError('Failed to add video');
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await api.delete(`/api/gallery/event/${eventId}/images/${imageId}`);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
    } catch (err) {
      setError('Failed to delete image');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await api.delete(`/api/gallery/event/${eventId}/videos/${videoId}`);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
    } catch (err) {
      setError('Failed to delete video');
    }
  };

  if (loading) return <div className="text-center py-8">Loading gallery...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Event Gallery</h2>
      
      {/* Image Upload Form */}
      {user && (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Image</h3>
          <form onSubmit={handleAddImage} className="space-y-4">
            <input
              type="text"
              placeholder="Image URL"
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Caption"
              value={newImage.caption}
              onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Image
            </button>
          </form>
        </div>
      )}

      {/* Video Upload Form */}
      {user && (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Video</h3>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <input
              type="text"
              placeholder="Video URL"
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Caption"
              value={newVideo.caption}
              onChange={(e) => setNewVideo({ ...newVideo, caption: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Video
            </button>
          </form>
        </div>
      )}

      {/* Images Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery?.images.map((image) => (
            <div key={image._id} className="relative group">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-64 object-cover rounded-lg"
              />
              {image.caption && (
                <p className="mt-2 text-gray-600">{image.caption}</p>
              )}
              {user && (
                <button
                  onClick={() => handleDeleteImage(image._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery?.videos.map((video) => (
            <div key={video._id} className="relative group">
              <iframe
                src={video.url}
                title={video.caption}
                className="w-full h-64 rounded-lg"
                allowFullScreen
              />
              {video.caption && (
                <p className="mt-2 text-gray-600">{video.caption}</p>
              )}
              {user && (
                <button
                  onClick={() => handleDeleteVideo(video._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery; 
import { useParams } from 'react-router-dom';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Gallery = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });
  const [newVideo, setNewVideo] = useState({ url: '', caption: '' });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get(`/api/gallery/event/${eventId}`);
        setGallery(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load gallery');
        setLoading(false);
      }
    };

    fetchGallery();
  }, [eventId]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/gallery/event/${eventId}/images`, newImage);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
      setNewImage({ url: '', caption: '' });
    } catch (err) {
      setError('Failed to add image');
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/gallery/event/${eventId}/videos`, newVideo);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
      setNewVideo({ url: '', caption: '' });
    } catch (err) {
      setError('Failed to add video');
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await api.delete(`/api/gallery/event/${eventId}/images/${imageId}`);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
    } catch (err) {
      setError('Failed to delete image');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await api.delete(`/api/gallery/event/${eventId}/videos/${videoId}`);
      const response = await api.get(`/api/gallery/event/${eventId}`);
      setGallery(response.data);
    } catch (err) {
      setError('Failed to delete video');
    }
  };

  if (loading) return <div className="text-center py-8">Loading gallery...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Event Gallery</h2>
      
      {/* Image Upload Form */}
      {user && (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Image</h3>
          <form onSubmit={handleAddImage} className="space-y-4">
            <input
              type="text"
              placeholder="Image URL"
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Caption"
              value={newImage.caption}
              onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Image
            </button>
          </form>
        </div>
      )}

      {/* Video Upload Form */}
      {user && (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Video</h3>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <input
              type="text"
              placeholder="Video URL"
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Caption"
              value={newVideo.caption}
              onChange={(e) => setNewVideo({ ...newVideo, caption: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Video
            </button>
          </form>
        </div>
      )}

      {/* Images Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery?.images.map((image) => (
            <div key={image._id} className="relative group">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-64 object-cover rounded-lg"
              />
              {image.caption && (
                <p className="mt-2 text-gray-600">{image.caption}</p>
              )}
              {user && (
                <button
                  onClick={() => handleDeleteImage(image._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery?.videos.map((video) => (
            <div key={video._id} className="relative group">
              <iframe
                src={video.url}
                title={video.caption}
                className="w-full h-64 rounded-lg"
                allowFullScreen
              />
              {video.caption && (
                <p className="mt-2 text-gray-600">{video.caption}</p>
              )}
              {user && (
                <button
                  onClick={() => handleDeleteVideo(video._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery; 