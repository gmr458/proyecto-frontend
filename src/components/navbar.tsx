"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Contact,
    LayoutList,
    ListTodo,
    LogOut,
    PlusCircle,
    TableProperties,
    User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="sm:flex sm:justify-between py-1 px-4 border-b">
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
                                            className="text-sm font-medium transition-colors"
                                        >
                                            Iniciar sesión
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link
                                            href="/about"
                                            className="text-sm font-medium transition-colors"
                                        >
                                            Información
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link
                                            href="/contacts"
                                            className="text-sm font-medium transition-colors"
                                        >
                                            Contactos
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                        <nav className="flex flex-row gap-4 mx-5">
                            {session?.user && (
                                <>
                                    {session.user.roles.includes(
                                        "administrador",
                                    ) && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button variant="outline">
                                                    <LayoutList className="mr-2 h-4 w-4" />
                                                    <span>Usuarios</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>
                                                    <Link
                                                        href="/users/create"
                                                        className="flex flex-row items-center"
                                                    >
                                                        <PlusCircle className="mr-2 h-4 w-4" />
                                                        <span>Crear</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link
                                                        href="/users/all"
                                                        className="flex flex-row items-center"
                                                    >
                                                        <TableProperties className="mr-2 h-4 w-4" />
                                                        <span>Ver todos</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="outline">
                                                <LayoutList className="mr-2 h-4 w-4" />
                                                <span>Tareas</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {session.user.roles.includes(
                                                "administrador",
                                            ) && (
                                                <>
                                                    <DropdownMenuItem>
                                                        <Link
                                                            href="/tasks/create"
                                                            className="flex flex-row items-center"
                                                        >
                                                            <PlusCircle className="mr-2 h-4 w-4" />
                                                            <span>Crear</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Link
                                                            href="/tasks/all"
                                                            className="flex flex-row items-center"
                                                        >
                                                            <TableProperties className="mr-2 h-4 w-4" />
                                                            <span>
                                                                Ver todas
                                                            </span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {session.user.roles.includes(
                                                "empleado",
                                            ) && (
                                                <>
                                                    <DropdownMenuItem>
                                                        <Link
                                                            href="/tasks/create"
                                                            className="flex flex-row items-center"
                                                        >
                                                            <ListTodo className="mr-2 h-4 w-4" />
                                                            <span>
                                                                Asignadas
                                                            </span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="outline">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Cuenta</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Link
                                                    href="/profile"
                                                    className="flex flex-row items-center"
                                                >
                                                    <Contact className="mr-2 h-4 w-4" />
                                                    <span>Perfil</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link
                                                    href="#"
                                                    onClick={() => signOut()}
                                                    className="flex flex-row items-center"
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    <span>Cerrar sesión</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
