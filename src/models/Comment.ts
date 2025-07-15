import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  userId: Schema.Types.ObjectId;
  trackId?: Schema.Types.ObjectId;
  moduleId?: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  parentId?: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
}

const CommentSchema = new Schema<IComment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  trackId: { type: Schema.Types.ObjectId, ref: 'Track' },
  moduleId: { type: Schema.Types.ObjectId, ref: 'Module' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model<IComment>('Comment', CommentSchema); 