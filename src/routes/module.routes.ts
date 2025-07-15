import { Router } from 'express';
import * as moduleController from '../controllers/module.controller';
import { authenticateJWT } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';
import { validateBody } from '../middleware/validate';
import { createModuleSchema, updateModuleSchema } from '../utils/validation';

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Learning modules management
 */

/**
 * @swagger
 * /api/modules/{id}:
 *   get:
 *     summary: Get a single module (with quiz)
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module details
 *   patch:
 *     summary: Update a module (admin only)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Module ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated module
 *   delete:
 *     summary: Delete a module (admin only)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Deleted
 */

/**
 * @swagger
 * /api/modules/track/{trackId}:
 *   get:
 *     summary: List all modules for a track
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         schema:
 *           type: string
 *         required: true
 *         description: Track ID
 *     responses:
 *       200:
 *         description: List of modules
 *   post:
 *     summary: Create a new module (admin only)
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModuleRequest'
 *     responses:
 *       201:
 *         description: Created module
 */

const router = Router();

router.get('/:id', moduleController.getModuleById);
router.get('/track/:trackId', moduleController.getModulesByTrack);

// Admin routes
router.post('/', authenticateJWT, requireAdmin, validateBody(createModuleSchema), moduleController.createModule);
router.patch('/:id', authenticateJWT, requireAdmin, validateBody(updateModuleSchema), moduleController.updateModule);
router.delete('/:id', authenticateJWT, requireAdmin, moduleController.deleteModule);

export default router; 