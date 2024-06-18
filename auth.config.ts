import type { NextAuthConfig } from 'next-auth';
import github from 'next-auth/providers/github';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [github], // Add providers with an empty array for now
} satisfies NextAuthConfig;