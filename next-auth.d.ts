import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            email: string;
            token: string;
            roles: string[];
        } & DefaultSession;
    }

    interface User extends DefaultUser {
        email: string;
        token: string;
        roles: string[];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        email: string;
        token: string;
        roles: string[];
    }
}
