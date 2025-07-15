import { z } from 'zod';

// User
export const updateUserSchema = z.object({
  name: z.string().optional(),
  settings: z.object({
    notifications: z.boolean().optional(),
    darkMode: z.boolean().optional(),
  }).partial().optional(),
});

// Track
export const createTrackSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  category: z.string().optional(),
  modules: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

export const updateTrackSchema = createTrackSchema.partial();

// Module
export const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  answer: z.string(),
});

export const createModuleSchema = z.object({
  trackId: z.string(),
  title: z.string(),
  content: z.string(),
  order: z.number(),
  quiz: z.array(quizQuestionSchema).optional(),
});

export const updateModuleSchema = createModuleSchema.partial();

// Progress
export const completeModuleSchema = z.object({
  trackId: z.string(),
  moduleId: z.string(),
});

export const submitQuizResultSchema = z.object({
  moduleId: z.string(),
  result: z.any(),
});

// Badge
export const createBadgeSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  criteria: z.record(z.string(), z.any()),
});

export const updateBadgeSchema = createBadgeSchema.partial();

// NFT (no direct creation by user, so no schema)

// Comment
export const createCommentSchema = z.object({
  trackId: z.string().optional(),
  moduleId: z.string().optional(),
  content: z.string().min(1),
  parentId: z.string().optional(),
}); 