import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const API_URL = process.env.API_URL;
                if (!API_URL) {
                    return null;
                }

                const resLogin = await fetch(`${API_URL}/api/usuarios/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials.email,
                        contrasena: credentials.password,
                    }),
                    headers: { "Content-Type": "application/json" },
                });

                const token = await resLogin.json();

                if (!resLogin.ok) {
                    return null;
                }

                const headers: Record<string, string> = {
                    "Content-Type": "application/json",
                };

                if (token) {
                    headers["Authorization"] = `Bearer ${token.access_token}`;
                }

                const resProfile = await fetch(
                    `${API_URL}/api/usuarios/perfil`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers,
                    },
                );

                const user = await resProfile.json();

                if (!resProfile.ok) {
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
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
