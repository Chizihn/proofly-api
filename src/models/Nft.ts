import { Schema, model, Document } from 'mongoose';

export interface INft extends Document {
  mintAddress: string;
  ownerWallet: string;
  trackId: Schema.Types.ObjectId;
  txHash: string;
  metadataUri: string;
  createdAt: Date;
}

const NftSchema = new Schema<INft>({
  mintAddress: { type: String, required: true, unique: true },
  ownerWallet: { type: String, required: true },
  trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: true },
  txHash: { type: String, required: true },
  metadataUri: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<INft>('Nft', NftSchema); 