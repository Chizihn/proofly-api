import { Router } from 'express';
import * as progressController from '../controllers/progress.controller';
import { authenticateJWT } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { completeModuleSchema, submitQuizResultSchema } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: User progress and quiz endpoints
 */

/**
 * @swagger
 * /api/progress/complete-module:
 *   post:
 *     summary: Mark a module as complete for a user (mints NFT if track completed)
 *     tags: [Progress]
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
 *         description: Progress and NFT info
 */
router.post('/complete-module', authenticateJWT, validateBody(completeModuleSchema), progressController.completeModule);

/**
 * @swagger
 * /api/progress/quiz-result:
 *   post:
 *     summary: Submit quiz result for a module
 *     tags: [Progress]
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
router.post('/quiz-result', authenticateJWT, validateBody(submitQuizResultSchema), progressController.submitQuizResult);

/**
 * @swagger
 * /api/progress/me:
 *   get:
 *     summary: Get all progress for current user
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of progress
 */
router.get('/me', authenticateJWT, progressController.getUserProgress);

export default router; 