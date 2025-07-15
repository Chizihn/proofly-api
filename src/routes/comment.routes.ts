import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';
import { authenticateJWT } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createCommentSchema } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Q&A and discussion endpoints
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created comment
 */
router.post('/', authenticateJWT, validateBody(createCommentSchema), commentController.createComment);

/**
 * @swagger
 * /api/comments/track/{trackId}:
 *   get:
 *     summary: Get all comments for a track
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         schema:
 *           type: string
 *         required: true
 *         description: Track ID
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/track/:trackId', commentController.getCommentsForTrack);

/**
 * @swagger
 * /api/comments/module/{moduleId}:
 *   get:
 *     summary: Get all comments for a module
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         schema:
 *           type: string
 *         required: true
 *         description: Module ID
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/module/:moduleId', commentController.getCommentsForModule);

/**
 * @swagger
 * /api/comments/replies/{parentId}:
 *   get:
 *     summary: Get all replies for a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Parent comment ID
 *     responses:
 *       200:
 *         description: List of replies
 */
router.get('/replies/:parentId', commentController.getReplies);

/**
 * @swagger
 * /api/comments/like/{id}:
 *   post:
 *     summary: Like a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/like/:id', authenticateJWT, commentController.likeComment);

/**
 * @swagger
 * /api/comments/unlike/{id}:
 *   post:
 *     summary: Unlike a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/unlike/:id', authenticateJWT, commentController.unlikeComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:id', authenticateJWT, commentController.deleteComment);

export default router; 