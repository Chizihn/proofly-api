import { Router } from 'express';
import * as trackController from '../controllers/track.controller';
import { authenticateJWT } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';
import { validateBody } from '../middleware/validate';
import { createTrackSchema, updateTrackSchema } from '../utils/validation';

/**
 * @swagger
 * tags:
 *   name: Tracks
 *   description: Learning tracks management
 */

/**
 * @swagger
 * /api/tracks:
 *   get:
 *     summary: List all tracks (with modules populated)
 *     tags: [Tracks]
 *     responses:
 *       200:
 *         description: List of tracks
 *   post:
 *     summary: Create a new track (admin only)
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTrackRequest'
 *     responses:
 *       201:
 *         description: Created track
 */

/**
 * @swagger
 * /api/tracks/featured:
 *   get:
 *     summary: Get featured track(s)
 *     tags: [Tracks]
 *     responses:
 *       200:
 *         description: List of featured tracks
 */

/**
 * @swagger
 * /api/tracks/categories:
 *   get:
 *     summary: Get all unique track categories
 *     tags: [Tracks]
 *     responses:
 *       200:
 *         description: List of categories
 */

/**
 * @swagger
 * /api/tracks/{id}:
 *   get:
 *     summary: Get a single track (with modules)
 *     tags: [Tracks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Track ID
 *     responses:
 *       200:
 *         description: Track details
 *   patch:
 *     summary: Update a track (admin only)
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Track ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated track
 *   delete:
 *     summary: Delete a track (admin only)
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Track ID
 *     responses:
 *       200:
 *         description: Deleted
 */

const router = Router();

router.get('/', trackController.getAllTracks);
router.get('/featured', trackController.getFeaturedTracks);
router.get('/categories', require('./../controllers/track.controller').getCategories);
router.get('/:id', trackController.getTrackById);

// Admin routes
router.post('/', authenticateJWT, requireAdmin, validateBody(createTrackSchema), trackController.createTrack);
router.patch('/:id', authenticateJWT, requireAdmin, validateBody(updateTrackSchema), trackController.updateTrack);
router.delete('/:id', authenticateJWT, requireAdmin, trackController.deleteTrack);

export default router; 