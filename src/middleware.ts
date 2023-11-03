import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const routes = {
    empleado: ["/tasks/assigned"],
    administrador: ["/tasks/all", "/tasks/all", "/tasks/create"],
};

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    const token = await getToken({ req });

    if (token !== null) {
        if (req.nextUrl.pathname.startsWith("/login")) {
            return NextResponse.redirect(new URL("/profile", req.url));
        }

        if (!token.roles.includes("administrador")) {
            for (const route of routes.administrador) {
                if (req.nextUrl.pathname.startsWith(route)) {
                    return NextResponse.redirect(new URL("/profile", req.url));
                }
            }
        }

        if (!token.roles.includes("empleado")) {
            for (const route of routes.empleado) {
                if (req.nextUrl.pathname.startsWith(route)) {
                    return NextResponse.redirect(new URL("/profile", req.url));
                }
            }
        }
    }

    const authMiddleware = withAuth({
        pages: {
            signIn: `/login`,
        },
    });

    // @ts-expect-error
    return authMiddleware(req, event);
}

export const config = {
    matcher: ["/", "/login", "/profile", "/users/:path*", "/tasks/:path*"],
};
