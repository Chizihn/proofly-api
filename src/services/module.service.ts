import Module from '../models/Module';

export async function getModuleById(id: string) {
  const module = await Module.findById(id).lean();
  if (!module) throw new Error('Module not found');
  return module;
}

export async function getModulesByTrack(trackId: string) {
  return await Module.find({ trackId }).lean();
}

export async function createModule(data: any) {
  const module = await Module.create(data);
  return module.toObject();
}

export async function updateModule(id: string, data: any) {
  const module = await Module.findByIdAndUpdate(id, data, { new: true, lean: true });
  if (!module) throw new Error('Module not found');
  return module;
}

export async function deleteModule(id: string) {
  await Module.findByIdAndDelete(id);
  return { success: true };
} 