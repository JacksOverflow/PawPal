import NextAuth from "next-auth"
import Providers from "next-auth/providers"

connectDB()

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    // OAuth authentication providers
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
 
  database: process.env.DATABASE_URL,
  callbacks: {
    session: async (session, user) => {
      session.userId = user.sub
      return Promise.resolve(session)
    }
  }
})

