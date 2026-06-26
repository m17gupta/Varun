import NextAuth from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).role = token.role
      }
      return session
    },
  },
})
