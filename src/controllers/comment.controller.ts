import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

export async function createComment(req: Request, res: Response) {
  const comment = await commentService.createComment((req as any).user, req.body);
  res.status(201).json(comment);
}

export async function getCommentsForTrack(req: Request, res: Response) {
  const comments = await commentService.getCommentsForTrack(req.params.trackId);
  res.json(comments);
}

export async function getCommentsForModule(req: Request, res: Response) {
  const comments = await commentService.getCommentsForModule(req.params.moduleId);
  res.json(comments);
}

export async function getReplies(req: Request, res: Response) {
  const replies = await commentService.getReplies(req.params.parentId);
  res.json(replies);
}

export async function likeComment(req: Request, res: Response) {
  const result = await commentService.likeComment((req as any).user, req.params.id);
  res.json(result);
}

export async function unlikeComment(req: Request, res: Response) {
  const result = await commentService.unlikeComment((req as any).user, req.params.id);
  res.json(result);
}

export async function deleteComment(req: Request, res: Response) {
  const result = await commentService.deleteComment((req as any).user, req.params.id);
  res.json(result);
} 