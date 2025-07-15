import { Schema, model, Document } from 'mongoose';

export interface IQuizResult {
  moduleId: Schema.Types.ObjectId;
  result: any;
}

export interface IProgress extends Document {
  userId: Schema.Types.ObjectId;
  trackId: Schema.Types.ObjectId;
  completedModules: Schema.Types.ObjectId[];
  lastAccessed: Date;
  quizResults: Record<string, any>;
}

const ProgressSchema = new Schema<IProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: true },
  completedModules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  lastAccessed: { type: Date, default: Date.now },
  quizResults: { type: Schema.Types.Mixed, default: {} },
});

export default model<IProgress>('Progress', ProgressSchema); 