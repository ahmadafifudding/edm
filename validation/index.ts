import { z } from 'zod'

const name = z
  .string({
    required_error: 'Please enter your name.',
  })
  .min(2)
  .max(255)
const email = z
  .string({
    required_error: 'Please enter your email address.',
  })
  .email({
    message: 'Please enter a valid email address.',
  })
const password = z
  .string({
    required_error: 'Please enter your password.',
  })
  .min(8, {
    message: 'Your password must be at least 8 characters long.',
  })

const passwordConfirmation = z.string({
  required_error: 'Please confirm your password.',
})

export const signInSchema = z.object({
  email,
  password,
})
export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z
  .object({
    name,
    email,
    password,
    passwordConfirmation,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Your passwords do not match.',
    path: ['passwordConfirmation'],
  })
export type SignUpSchema = z.infer<typeof signUpSchema>

export const createDefectMonitoringSchema = z.object({
  block: z.string({
    required_error: 'Please select a block.',
  }),
  level: z.string({
    required_error: 'Please select a level.',
  }),
  zone: z.string({
    required_error: 'Please select a zone.',
  }),
  trade: z.string({
    required_error: 'Please select a trade.',
  }),
  image_url: z.string({
    required_error: 'Please select an image.',
  }),
  description: z.string({
    required_error: 'Please enter a description.',
  }),
})
export type CreateDefectMonitoringSchema = z.infer<
  typeof createDefectMonitoringSchema
>
