import Comment from '../models/Comment';
import mongoose from 'mongoose';

export async function createComment(user: any, data: any) {
  const comment = await Comment.create({ ...data, userId: user._id });
  return comment.toObject();
}

export async function getCommentsForTrack(trackId: string) {
  return await Comment.find({ trackId, parentId: { $exists: false } }).lean();
}

export async function getCommentsForModule(moduleId: string) {
  return await Comment.find({ moduleId, parentId: { $exists: false } }).lean();
}

export async function getReplies(parentId: string) {
  return await Comment.find({ parentId: new mongoose.Types.ObjectId(parentId) }).lean();
}

export async function likeComment(user: any, commentId: string) {
  await Comment.findByIdAndUpdate(commentId, { $addToSet: { likes: user._id } });
  return { success: true };
}

export async function unlikeComment(user: any, commentId: string) {
  await Comment.findByIdAndUpdate(commentId, { $pull: { likes: user._id } });
  return { success: true };
}

export async function deleteComment(user: any, commentId: string) {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error('Comment not found');
  if (comment.userId.toString() !== user._id.toString()) throw new Error('Unauthorized');
  await Comment.findByIdAndDelete(commentId);
  return { success: true };
} 