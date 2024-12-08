import { z } from 'zod'

export const tenantLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const joinWaitlistSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' }),
})

export const createTicketCommentSchema = z.object({
  comment: z.string().min(1, { message: 'Comment is required' }),
  tenantId: z.string().uuid().min(1),
  ticketId: z.string().uuid().min(1),
})
