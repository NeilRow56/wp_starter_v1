'use server'

import { db } from '@/db'
import { user } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/auth/sign-in')
  }

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id)
  })

  if (!currentUser) {
    redirect('/auth/sign-in')
  }

  return {
    ...session,
    currentUser
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    })

    return {
      success: true,
      message: 'Signed in successfully.'
    }
  } catch (error) {
    const e = error as Error

    return {
      success: false,
      message: e.message || 'An unknown error occurred.'
    }
  }
}

export const signUp = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      }
    })

    return {
      success: true,
      message: 'Signed up successfully.'
    }
  } catch (error) {
    const e = error as Error

    return {
      success: false,
      message: e.message || 'An unknown error occurred.'
    }
  }
}

/* ADMIN QUERIES - THESE QUERIES REQUIRE ADMIN ACCESS */

// export async function getUsers() {
//   const session = await auth.api.getSession({
//     headers: await headers()
//   })

//   if (!session) redirect('/auth/sign-in')

//   try {
//     const allUsers = await db.select().from(user).orderBy(asc(user.name))
//     return allUsers
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }
