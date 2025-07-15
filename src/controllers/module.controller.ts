import { Request, Response } from 'express';
import * as moduleService from '../services/module.service';

export async function getModuleById(req: Request, res: Response) {
  const module = await moduleService.getModuleById(req.params.id);
  res.json(module);
}

export async function getModulesByTrack(req: Request, res: Response) {
  const modules = await moduleService.getModulesByTrack(req.params.trackId);
  res.json(modules);
}

export async function createModule(req: Request, res: Response) {
  const module = await moduleService.createModule(req.body);
  res.status(201).json(module);
}

export async function updateModule(req: Request, res: Response) {
  const module = await moduleService.updateModule(req.params.id, req.body);
  res.json(module);
}

export async function deleteModule(req: Request, res: Response) {
  const result = await moduleService.deleteModule(req.params.id);
  res.json(result);
} 