import { Router } from 'express';
import * as nftController from '../controllers/nft.controller';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: NFTs
 *   description: NFT endpoints
 */

/**
 * @swagger
 * /api/nfts/me:
 *   get:
 *     summary: Get all NFTs for the current user
 *     tags: [NFTs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of NFTs
 */

/**
 * @swagger
 * /api/nfts/{id}:
 *   get:
 *     summary: Get NFT details by ID
 *     tags: [NFTs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: NFT ID
 *     responses:
 *       200:
 *         description: NFT details
 */

router.get('/me', authenticateJWT, nftController.getAllNftsForUser);
router.get('/:id', authenticateJWT, nftController.getNftById);

export default router; 