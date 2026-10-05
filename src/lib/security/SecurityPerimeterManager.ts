import { z } from 'zod';

export const securityConfigSchema = z.object({
  version: z.number().int().positive(),
  providerId: z.string().uuid(),
  sourceOrigin: z.string().url(),
  maxLimit: z.object({
    proportion: z.number().min(0).max(1).optional(),
    mode: z.string().optional(),
  }),
  savedAt: z.string().datetime(),
});

export type SecurityConfig = z.infer<typeof securityConfigSchema>;

export function validateSecurityConfig(data: unknown): SecurityConfig {
  // Throws a descriptive validation error if the object fails validation
  return securityConfigSchema.parse(data);
}
