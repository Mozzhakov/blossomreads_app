import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailLink } from "firebase/auth";
// import { auth } from "@/firebase/Firebase";

export const authOptions = {
  // pages: {
  //   signIn: "/",
  // },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        // email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        const { auth, email, emailLInk } = credentials;
        try {
          const response = await signInWithEmailLink(auth, email, emailLInk);
          return response.user;
        } catch (error) {
          console.log(error);
        }
        // return response.json();
        return true;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
