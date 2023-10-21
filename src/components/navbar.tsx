"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    console.log({ session });
    console.log(session ? "deberia aparecer" : "no deberia aparecer");

    return (
        <header className="sm:flex sm:justify-between py-3 px-4 border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w--full">
                    <div className="flex items-center">
                        <Link href="/" className="ml-4 lg:ml-0">
                            <h1 className="text-xl font-bold">
                                Aplicación Web
                            </h1>
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
                            {!session && (
                                <>
                                    <Button asChild variant="ghost">
                                        <Link
                                            href="/login"
                                            className="text-sm font-medium transition-colors">
                                            Iniciar sesión
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link
                                            href="/about"
                                            className="text-sm font-medium transition-colors">
                                            Información
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link
                                            href="/contacts"
                                            className="text-sm font-medium transition-colors">
                                            Contactos
                                        </Link>
                                    </Button>
                                </>
                            )}
                            {session?.user && (
                                <>
                                    <Button asChild variant="ghost">
                                        <Link
                                            href="/tasks"
                                            className="text-sm font-medium transition-colors">
                                            Tareas
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link
                                            href="/profile"
                                            className="text-sm font-medium transition-colors">
                                            Perfil
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        onClick={() => signOut()}>
                                        Cerrar sesión
                                    </Button>
                                </>
                            )}
                        </nav>
                        <div className="flex items-center">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
