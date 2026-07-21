import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { connectDB } from "@/lib/mongodb"
import Member from "@/models/Member"

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        if (!email || !password) return null

        await connectDB()

        const cleanEmail = email.trim().toLowerCase()
        const member = await Member.findOne({
          email: { $regex: new RegExp(`^\\s*${cleanEmail.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*$`, 'i') }
        }).select("+password")
        console.log("member-->", member)
        if (!member) return null

        const isValid = await member.comparePassword(password)
        if (!isValid) return null

        return {
          id: member._id.toString(),
          email: member.email,
          name: member.name,
          role: member.role,
          image: member.image,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})
