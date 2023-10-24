"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Contact,
    LayoutList,
    ListTodo,
    LogOut,
    PlusCircle,
    TableProperties,
    User,
} from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

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
                        </nav>
                        <nav className="flex flex-row gap-4 mx-5">
                            {session?.user && (
                                <>
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
                                                            className="flex flex-row items-center">
                                                            <PlusCircle className="mr-2 h-4 w-4" />
                                                            <span>Crear</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Link
                                                            href="/tasks/all"
                                                            className="flex flex-row items-center">
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
                                                            className="flex flex-row items-center">
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
                                                    className="flex flex-row items-center">
                                                    <Contact className="mr-2 h-4 w-4" />
                                                    <span>Perfil</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link
                                                    href="#"
                                                    onClick={() => signOut()}
                                                    className="flex flex-row items-center">
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
