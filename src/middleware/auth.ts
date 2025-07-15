import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';

const client = jwksClient({
  jwksUri: process.env.CIVIC_JWKS_URI || 'https://auth.civic.com/.well-known/jwks.json',
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err || !key) return callback(err || new Error('No signing key found'));
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    (req as any).user = decoded;
    next();
  });
} 