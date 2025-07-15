import Badge from '../models/Badge';
import User from '../models/User';
import Progress from '../models/Progress';

export async function getAllBadges() {
  return await Badge.find().lean();
}

export async function getBadgeById(id: string) {
  const badge = await Badge.findById(id).lean();
  if (!badge) throw new Error('Badge not found');
  return badge;
}

export async function createBadge(data: any) {
  const badge = await Badge.create(data);
  return badge.toObject();
}

export async function updateBadge(id: string, data: any) {
  const badge = await Badge.findByIdAndUpdate(id, data, { new: true, lean: true });
  if (!badge) throw new Error('Badge not found');
  return badge;
}

export async function deleteBadge(id: string) {
  await Badge.findByIdAndDelete(id);
  return { success: true };
}

export async function getLeaderboard() {
  // Top badge earners
  const topBadgeEarners = await User.aggregate([
    { $project: { name: 1, badgeCount: { $size: { $ifNull: ['$badges', []] } } } },
    { $sort: { badgeCount: -1 } },
    { $limit: 10 }
  ]);

  // Fastest learners (mocked: users with most completed modules)
  const fastestLearners = await Progress.aggregate([
    { $project: { userId: 1, completedCount: { $size: { $ifNull: ['$completedModules', []] } } } },
    { $sort: { completedCount: -1 } },
    { $limit: 10 }
  ]);

  return { topBadgeEarners, fastestLearners };
} 