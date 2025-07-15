import User from '../models/User';
import Progress from '../models/Progress';
import Badge from '../models/Badge';
import Nft from '../models/Nft';
import { getWalletBalance as getWalletBalanceFromSolana } from '../utils/solana';

export async function getMe(user: any) {
  const found = await User.findById(user._id).lean();
  if (!found) throw new Error('User not found');
  return found;
}

export async function updateMe(user: any, data: any) {
  const updated = await User.findByIdAndUpdate(user._id, data, { new: true, lean: true });
  if (!updated) throw new Error('User not found');
  return updated;
}

export async function getMyProgress(user: any) {
  return await Progress.find({ userId: user._id }).lean();
}

export async function updateMyProgress(user: any, data: any) {
  // For PATCH, update completedModules or quizResults
  const progress = await Progress.findOneAndUpdate(
    { userId: user._id, trackId: data.trackId },
    { $set: data },
    { new: true, lean: true }
  );
  if (!progress) throw new Error('Progress not found');
  return progress;
}

export async function getMyBadges(user: any) {
  const found = await User.findById(user._id).populate('badges').lean();
  return found?.badges || [];
}

export async function getMyNfts(user: any) {
  return await Nft.find({ ownerWallet: user.wallet }).lean();
}

export async function getWalletBalance(user: any) {
  return await getWalletBalanceFromSolana(user.wallet);
}

export async function followUser(user: any, targetUserId: string) {
  if (user._id === targetUserId) throw new Error('Cannot follow yourself');
  await User.findByIdAndUpdate(user._id, { $addToSet: { following: targetUserId } });
  await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: user._id } });
  return { success: true };
}

export async function unfollowUser(user: any, targetUserId: string) {
  await User.findByIdAndUpdate(user._id, { $pull: { following: targetUserId } });
  await User.findByIdAndUpdate(targetUserId, { $pull: { followers: user._id } });
  return { success: true };
}

export async function getPublicProfile(userId: string) {
  const user = await User.findById(userId).lean();
  if (!user) throw new Error('User not found');
  // Only return public fields
  const { _id, name, badges, progress, followers, following } = user;
  return { _id, name, badges, progress, followers, following };
}

export async function getAllUsers() {
  return await User.find().lean();
}

export async function clearAllData(user: any) {
  await Progress.deleteMany({ userId: user._id });
  await User.findByIdAndUpdate(user._id, { $set: { badges: [] } });
}

export async function getFollowers(userId: string) {
  const user = await User.findById(userId).populate('followers').lean();
  return user?.followers || [];
}
export async function getFollowing(userId: string) {
  const user = await User.findById(userId).populate('following').lean();
  return user?.following || [];
} 