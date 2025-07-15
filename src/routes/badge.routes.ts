import { Router } from 'express';
import * as badgeController from '../controllers/badge.controller';
import { authenticateJWT } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';
import { validateBody } from '../middleware/validate';
import { createBadgeSchema, updateBadgeSchema } from '../utils/validation';

/**
 * @swagger
 * tags:
 *   name: Badges
 *   description: Badge management and leaderboard
 */

/**
 * @swagger
 * /api/badges:
 *   get:
 *     summary: List all badges
 *     tags: [Badges]
 *     responses:
 *       200:
 *         description: List of badges
 *   post:
 *     summary: Create a new badge (admin only)
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBadgeRequest'
 *     responses:
 *       201:
 *         description: Created badge
 */

/**
 * @swagger
 * /api/badges/leaderboard:
 *   get:
 *     summary: Get leaderboard (top badge earners, fastest learners)
 *     tags: [Badges]
 *     responses:
 *       200:
 *         description: Leaderboard data
 */

/**
 * @swagger
 * /api/badges/{id}:
 *   get:
 *     summary: Get badge details
 *     tags: [Badges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Badge ID
 *     responses:
 *       200:
 *         description: Badge details
 *   patch:
 *     summary: Update a badge (admin only)
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Badge ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated badge
 *   delete:
 *     summary: Delete a badge (admin only)
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Badge ID
 *     responses:
 *       200:
 *         description: Deleted
 */

const router = Router();

router.get('/', badgeController.getAllBadges);
router.get('/leaderboard', badgeController.getLeaderboard);
router.get('/:id', badgeController.getBadgeById);

// Admin routes
router.post('/', authenticateJWT, requireAdmin, validateBody(createBadgeSchema), badgeController.createBadge);
router.patch('/:id', authenticateJWT, requireAdmin, validateBody(updateBadgeSchema), badgeController.updateBadge);
router.delete('/:id', authenticateJWT, requireAdmin, badgeController.deleteBadge);

export default router; 