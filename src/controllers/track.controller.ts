import { Request, Response } from 'express';
import * as trackService from '../services/track.service';

export async function getAllTracks(req: Request, res: Response) {
  const { search, category, page = 1, limit = 10 } = req.query;
  const result = await trackService.getAllTracks({
    search: search as string,
    category: category as string,
    page: Number(page),
    limit: Number(limit),
  });
  res.json(result);
}

export async function getTrackById(req: Request, res: Response) {
  const track = await trackService.getTrackById(req.params.id);
  res.json(track);
}

export async function getFeaturedTracks(req: Request, res: Response) {
  const tracks = await trackService.getFeaturedTracks();
  res.json(tracks);
}

export async function createTrack(req: Request, res: Response) {
  const track = await trackService.createTrack(req.body);
  res.status(201).json(track);
}

export async function updateTrack(req: Request, res: Response) {
  const track = await trackService.updateTrack(req.params.id, req.body);
  res.json(track);
}

export async function deleteTrack(req: Request, res: Response) {
  const result = await trackService.deleteTrack(req.params.id);
  res.json(result);
}

export async function getCategories(req: Request, res: Response) {
  const categories = await trackService.getCategories();
  res.json(categories);
} 