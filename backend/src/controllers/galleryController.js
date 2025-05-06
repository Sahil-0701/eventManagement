import Gallery from '../models/Gallery.js';
import { Event } from '../models/eventModels.js';

// Get gallery for an event
export const getEventGallery = async (req, res) => {
  try {
    const { eventId } = req.params;
    const gallery = await Gallery.findOne({ eventId })
      .populate('images.uploadedBy', 'username')
      .populate('videos.uploadedBy', 'username');

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add image to gallery
export const addImage = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { url, caption } = req.body;
    const userId = req.user._id;

    let gallery = await Gallery.findOne({ eventId });
    
    if (!gallery) {
      gallery = new Gallery({ eventId });
    }

    gallery.images.push({
      url,
      caption,
      uploadedBy: userId
    });

    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add video to gallery
export const addVideo = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { url, caption } = req.body;
    const userId = req.user._id;

    let gallery = await Gallery.findOne({ eventId });
    
    if (!gallery) {
      gallery = new Gallery({ eventId });
    }

    gallery.videos.push({
      url,
      caption,
      uploadedBy: userId
    });

    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete image from gallery
export const deleteImage = async (req, res) => {
  try {
    const { eventId, imageId } = req.params;
    const gallery = await Gallery.findOne({ eventId });

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    gallery.images = gallery.images.filter(img => img._id.toString() !== imageId);
    await gallery.save();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete video from gallery
export const deleteVideo = async (req, res) => {
  try {
    const { eventId, videoId } = req.params;
    const gallery = await Gallery.findOne({ eventId });

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    gallery.videos = gallery.videos.filter(vid => vid._id.toString() !== videoId);
    await gallery.save();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
