import express from 'express';
import {
  getEventGallery,
  addImage,
  addVideo,
  deleteImage,
  deleteVideo
} from '../controllers/galleryController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { protect, authorize } = authMiddleware;

const router = express.Router();

// Public routes
router.get('/event/:eventId', getEventGallery);

// Protected routes
router.use(protect);
router.post('/event/:eventId/images', addImage);
router.post('/event/:eventId/videos', addVideo);
router.delete('/event/:eventId/images/:imageId', deleteImage);
router.delete('/event/:eventId/videos/:videoId', deleteVideo);

export { router as galleryRouter }; 