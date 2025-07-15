import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import trackRoutes from './routes/track.routes';
import moduleRoutes from './routes/module.routes';
import progressRoutes from './routes/progress.routes';
import badgeRoutes from './routes/badge.routes';
import nftRoutes from './routes/nft.routes';
import commentRoutes from './routes/comment.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { errorHandler } from './middleware/errorHandler';
import { connectDB } from './config/db';
import { PORT } from './config/appConfig';

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/users', userRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/nfts', nftRoutes);
app.use('/api/comments', commentRoutes);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proofly API',
      version: '1.0.0',
      description: 'REST API documentation for Proofly learning app (Node.js, Express, MongoDB, TypeScript, Solana, Civic Auth)'
    },
    servers: [
      { url: 'http://localhost:' + PORT }
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Proofly API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
