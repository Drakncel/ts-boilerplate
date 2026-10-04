import * as z from 'zod'


export type Link = {
    id?: number;
    key: string;
    value: string;
  };

export const linkSchema = z.object({
    id: z.int().optional(),
    key: z.string(),
    value: z.string()
})