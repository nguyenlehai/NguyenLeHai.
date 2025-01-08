import { z } from 'zod'

export const tokenFormSchema = z.object({
  quantity: z.string()
})

export type TokenFormData = {
  quantity: string;
} 