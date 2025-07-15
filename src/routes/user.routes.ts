import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { updateUserSchema } from '../utils/validation';
import { requireAdmin } from '../middleware/admin';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *   patch:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Updated user profile
 */

/**
 * @swagger
 * /api/users/me/progress:
 *   get:
 *     summary: Get all progress for current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User progress
 *   patch:
 *     summary: Update user progress
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated progress
 */

/**
 * @swagger
 * /api/users/me/badges:
 *   get:
 *     summary: Get earned badges for current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of badges
 */

/**
 * @swagger
 * /api/users/me/nfts:
 *   get:
 *     summary: Get NFTs for current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of NFTs
 */

/**
 * @swagger
 * /api/users/me/wallet-balance:
 *   get:
 *     summary: Get wallet balance for current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance
 */

/**
 * @swagger
 * /api/users/follow/{id}:
 *   post:
 *     summary: Follow another user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Target user ID
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/users/unfollow/{id}:
 *   post:
 *     summary: Unfollow another user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Target user ID
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/users/profile/{id}:
 *   get:
 *     summary: Get public profile of a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Public profile
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/users/me/clear-data:
 *   post:
 *     summary: Clear all progress and badges for the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/users/me/followers:
 *   get:
 *     summary: Get users who follow the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of followers
 * /api/users/me/following:
 *   get:
 *     summary: Get users the current user is following
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of following
 * /api/users/{id}/followers:
 *   get:
 *     summary: Get users who follow the specified user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of followers
 * /api/users/{id}/following:
 *   get:
 *     summary: Get users the specified user is following
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of following
 */

router.get('/me', authenticateJWT, userController.getMe);
router.patch('/me', authenticateJWT, validateBody(updateUserSchema), userController.updateMe);
router.get('/me/progress', authenticateJWT, userController.getMyProgress);
router.patch('/me/progress', authenticateJWT, userController.updateMyProgress);
router.get('/me/badges', authenticateJWT, userController.getMyBadges);
router.get('/me/nfts', authenticateJWT, userController.getMyNfts);
router.get('/me/wallet-balance', authenticateJWT, userController.getWalletBalance);
router.post('/follow/:id', authenticateJWT, userController.followUser);
router.post('/unfollow/:id', authenticateJWT, userController.unfollowUser);
router.post('/me/clear-data', authenticateJWT, userController.clearAllData);
router.get('/profile/:id', userController.getPublicProfile);
router.get('/', authenticateJWT, requireAdmin, userController.getAllUsers);
router.get('/me/followers', authenticateJWT, userController.getMyFollowers);
router.get('/me/following', authenticateJWT, userController.getMyFollowing);
router.get('/:id/followers', userController.getFollowers);
router.get('/:id/following', userController.getFollowing);

export default router; 