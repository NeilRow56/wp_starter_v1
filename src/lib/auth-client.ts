import {
  inferAdditionalFields,
  customSessionClient
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { auth } from '@/lib/auth'

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),

    customSessionClient<typeof auth>()
  ]
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  updateUser
} = authClient
