import mongoose from 'mongoose';
import Progress from '../models/Progress';
import Module from '../models/Module';
import Track from '../models/Track';
import Nft from '../models/Nft';
import { mintNftToWallet } from '../utils/solana';

export async function completeModule(user: any, data: { trackId: string; moduleId: string }) {
  // Find or create progress
  let progress = await Progress.findOne({ userId: user._id, trackId: data.trackId });
  if (!progress) {
    progress = await Progress.create({
      userId: user._id,
      trackId: data.trackId,
      completedModules: [new mongoose.Schema.Types.ObjectId(data.moduleId)],
      lastAccessed: new Date(),
      quizResults: {},
    });
  } else {
    if (!progress.completedModules.map((id: any) => id.toString()).includes(data.moduleId)) {
      progress.completedModules.push(new mongoose.Schema.Types.ObjectId(data.moduleId));
    }
    progress.lastAccessed = new Date();
    await progress.save();
  }

  // Check if all modules in track are completed
  const track = await Track.findById(data.trackId).populate('modules');
  if (!track) throw new Error('Track not found');
  const allModuleIds = track.modules.map((m: any) => m._id.toString());
  const completedSet = new Set(progress.completedModules.map((id: any) => id.toString()));
  const allCompleted = allModuleIds.every((id: string) => completedSet.has(id));

  let nft = null;
  if (allCompleted) {
    // Mint NFT (mocked)
    const nftData = await mintNftToWallet(user.wallet, track);
    nft = await Nft.create({
      mintAddress: nftData.mintAddress,
      ownerWallet: user.wallet,
      trackId: track._id,
      txHash: nftData.txHash,
      metadataUri: nftData.metadataUri,
    });
  }

  return {
    trackId: data.trackId,
    completedModules: progress.completedModules,
    nft,
  };
}

export async function submitQuizResult(user: any, data: { moduleId: string; result: any }) {
  // Find the module to get its trackId
  const module = await Module.findById(data.moduleId);
  if (!module) throw new Error('Module not found');
  let progress = await Progress.findOne({ userId: user._id, trackId: module.trackId });
  if (!progress) {
    progress = await Progress.create({
      userId: user._id,
      trackId: module.trackId,
      completedModules: [],
      lastAccessed: new Date(),
      quizResults: { [data.moduleId]: data.result },
    });
  } else {
    progress.quizResults = progress.quizResults || {};
    progress.quizResults[data.moduleId] = data.result;
    progress.lastAccessed = new Date();
    await progress.save();
  }
  return progress;
}

export async function getUserProgress(user: any) {
  return await Progress.find({ userId: user._id }).lean();
} 