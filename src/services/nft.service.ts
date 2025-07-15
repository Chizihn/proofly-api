import Nft from '../models/Nft';

export async function getAllNftsForUser(user: any) {
  return await Nft.find({ ownerWallet: user.wallet }).lean();
}

export async function getNftById(id: string) {
  const nft = await Nft.findById(id).lean();
  if (!nft) throw new Error('NFT not found');
  return nft;
} 