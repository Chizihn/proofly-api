import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export async function getMe(req: Request, res: Response) {
  const user = await userService.getMe((req as any).user);
  res.json(user);
}

export async function updateMe(req: Request, res: Response) {
  const updated = await userService.updateMe((req as any).user, req.body);
  res.json(updated);
}

export async function getMyProgress(req: Request, res: Response) {
  const progress = await userService.getMyProgress((req as any).user);
  res.json(progress);
}

export async function updateMyProgress(req: Request, res: Response) {
  const updated = await userService.updateMyProgress((req as any).user, req.body);
  res.json(updated);
}

export async function getMyBadges(req: Request, res: Response) {
  const badges = await userService.getMyBadges((req as any).user);
  res.json(badges);
}

export async function getMyNfts(req: Request, res: Response) {
  const nfts = await userService.getMyNfts((req as any).user);
  res.json(nfts);
}

export async function getWalletBalance(req: Request, res: Response) {
  const balance = await userService.getWalletBalance((req as any).user);
  res.json({ balance });
}

export async function followUser(req: Request, res: Response) {
  const result = await userService.followUser((req as any).user, req.params.id);
  res.json(result);
}

export async function unfollowUser(req: Request, res: Response) {
  const result = await userService.unfollowUser((req as any).user, req.params.id);
  res.json(result);
}

export async function getPublicProfile(req: Request, res: Response) {
  const profile = await userService.getPublicProfile(req.params.id);
  res.json(profile);
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json(users);
}

export async function clearAllData(req: Request, res: Response) {
  await userService.clearAllData((req as any).user);
  res.json({ success: true });
}

export async function getMyFollowers(req: Request, res: Response) {
  const users = await userService.getFollowers((req as any).user._id);
  res.json(users);
}
export async function getMyFollowing(req: Request, res: Response) {
  const users = await userService.getFollowing((req as any).user._id);
  res.json(users);
}
export async function getFollowers(req: Request, res: Response) {
  const users = await userService.getFollowers(req.params.id);
  res.json(users);
}
export async function getFollowing(req: Request, res: Response) {
  const users = await userService.getFollowing(req.params.id);
  res.json(users);
} 