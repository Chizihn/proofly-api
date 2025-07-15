import Track from '../models/Track';

export async function getAllTracks({ search, category, page = 1, limit = 10 }: { search?: string; category?: string; page?: number; limit?: number }) {
  const query: any = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (category) {
    query.category = category;
  }
  const skip = (page - 1) * limit;
  const [tracks, total] = await Promise.all([
    Track.find(query).populate('modules').skip(skip).limit(limit).lean(),
    Track.countDocuments(query),
  ]);
  return { tracks, total, page, limit };
}

export async function getTrackById(id: string) {
  const track = await Track.findById(id).populate('modules').lean();
  if (!track) throw new Error('Track not found');
  return track;
}

export async function getFeaturedTracks() {
  return await Track.find({ isFeatured: true }).populate('modules').lean();
}

export async function createTrack(data: any) {
  const track = await Track.create(data);
  return track.toObject();
}

export async function updateTrack(id: string, data: any) {
  const track = await Track.findByIdAndUpdate(id, data, { new: true, lean: true });
  if (!track) throw new Error('Track not found');
  return track;
}

export async function deleteTrack(id: string) {
  await Track.findByIdAndDelete(id);
  return { success: true };
}

export async function getCategories() {
  return await Track.distinct('category');
} 