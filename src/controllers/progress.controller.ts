import { Request, Response } from 'express';
import * as progressService from '../services/progress.service';

export async function completeModule(req: Request, res: Response) {
  const result = await progressService.completeModule((req as any).user, req.body);
  res.json(result);
}

export async function submitQuizResult(req: Request, res: Response) {
  const result = await progressService.submitQuizResult((req as any).user, req.body);
  res.json(result);
}

export async function getUserProgress(req: Request, res: Response) {
  const progress = await progressService.getUserProgress((req as any).user);
  res.json(progress);
} 