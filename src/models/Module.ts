import { Schema, model, Document } from 'mongoose';

export interface IQuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface IModule extends Document {
  trackId: Schema.Types.ObjectId;
  title: string;
  content: string;
  order: number;
  quiz: IQuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const QuizQuestionSchema = new Schema<IQuizQuestion>({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const ModuleSchema = new Schema<IModule>({
  trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
  quiz: [QuizQuestionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IModule>('Module', ModuleSchema); 