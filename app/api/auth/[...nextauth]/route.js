import { connectDB } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Correct import
import bcrypt from 'bcryptjs';
import User from "@/models/user";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
       const { email, password } = credentials;
       try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if(!passwordsMatch) {
          throw new Error("Incorrect password");
        }
        return user;
       } catch (error) {
        throw new Error(error);
       }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Redirect to this page on sign-in
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
