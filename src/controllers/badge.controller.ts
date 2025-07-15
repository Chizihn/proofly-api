import { Request, Response } from 'express';
import * as badgeService from '../services/badge.service';

export async function getAllBadges(req: Request, res: Response) {
  const badges = await badgeService.getAllBadges();
  res.json(badges);
}

export async function getBadgeById(req: Request, res: Response) {
  const badge = await badgeService.getBadgeById(req.params.id);
  res.json(badge);
}

export async function createBadge(req: Request, res: Response) {
  const badge = await badgeService.createBadge(req.body);
  res.status(201).json(badge);
}

export async function updateBadge(req: Request, res: Response) {
  const badge = await badgeService.updateBadge(req.params.id, req.body);
  res.json(badge);
}

export async function deleteBadge(req: Request, res: Response) {
  const result = await badgeService.deleteBadge(req.params.id);
  res.json(result);
}

export async function getLeaderboard(req: Request, res: Response) {
  const leaderboard = await badgeService.getLeaderboard();
  res.json(leaderboard);
} 