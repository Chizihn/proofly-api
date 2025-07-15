import { Request, Response } from 'express';
import * as nftService from '../services/nft.service';

export async function getAllNftsForUser(req: Request, res: Response) {
  const nfts = await nftService.getAllNftsForUser((req as any).user);
  res.json(nfts);
}

export async function getNftById(req: Request, res: Response) {
  const nft = await nftService.getNftById(req.params.id);
  res.json(nft);
} 