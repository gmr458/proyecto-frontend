import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!NEXT_PUBLIC_API_URL) {
                    return null;
                }

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/usuarios/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials.email,
                        contrasena: credentials.password,
                    }),
                    headers: { "Content-Type": "application/json" },
                });

                const user = await response.json();

                if (!response.ok) {
                    return null;
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60, // 3 days
    },
    jwt: {
        maxAge: 3 * 24 * 60 * 60, // 3 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.token = user.token;
                token.roles = user.roles;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.token = token.token;
                session.user.roles = token.roles;
            }

            return session;
        },
    },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
