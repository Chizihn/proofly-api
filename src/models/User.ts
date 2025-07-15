import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  civicId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  settings: {
    notifications: boolean;
    darkMode: boolean;
    [key: string]: any;
  };
  badges: Schema.Types.ObjectId[];
  progress: Schema.Types.ObjectId[];
  isAdmin: boolean;
  wallet: string;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  civicId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  settings: {
    notifications: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false },
  },
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
  progress: [{ type: Schema.Types.ObjectId, ref: 'Progress' }],
  isAdmin: { type: Boolean, default: false },
  wallet: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model<IUser>('User', UserSchema); 