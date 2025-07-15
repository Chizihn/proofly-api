import { Schema, model, Document } from 'mongoose';

export interface ITrack extends Document {
  title: string;
  description: string;
  icon: string;
  category: string;
  modules: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
}

const TrackSchema = new Schema<ITrack>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  category: { type: String },
  modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
});

export default model<ITrack>('Track', TrackSchema); 