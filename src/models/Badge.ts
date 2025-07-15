import { Schema, model, Document } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string;
  criteria: Record<string, any>;
  createdAt: Date;
}

const BadgeSchema = new Schema<IBadge>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  criteria: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IBadge>('Badge', BadgeSchema); 