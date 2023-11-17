"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ContactIcon,
    LayoutDashboardIcon,
    LayoutListIcon,
    ListTodoIcon,
    LogOutIcon,
    PlusCircleIcon,
    TablePropertiesIcon,
    UserIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const unauthenticatedRoutes = ["/login", "/about", "/contacts"];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w--full">
                    <div className="flex items-center">
                        <Link href="/" className="ml-4 lg:ml-0">
                            <h1 className="text-xl font-bold">Aplicación Web</h1>
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <nav className="flex flex-row gap-4 mx-5">
                            {status === "loading" && unauthenticatedRoutes.includes(pathname) && (
                                <>
                                    <Button asChild variant="ghost">
                                        <Skeleton className="h-[40px] w-[110px]" />
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Skeleton className="h-[40px] w-[110px]" />
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Skeleton className="h-[40px] w-[110px]" />
                                    </Button>
                                </>
                            )}
                            {!session && status !== "loading" && (
                                <>
                                    <Button asChild variant="ghost">
                                        <Link href="/login" className="text-sm font-medium transition-colors">
                                            Iniciar sesión
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link href="/about" className="text-sm font-medium transition-colors">
                                            Información
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Link href="/contacts" className="text-sm font-medium transition-colors">
                                            Contactos
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                        <nav className="flex flex-row gap-4 mx-5">
                            {status === "loading" && !unauthenticatedRoutes.includes(pathname) && (
                                <>
                                    <Button asChild variant="ghost">
                                        <Skeleton className="h-[40px] w-[131px]" />
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Skeleton className="h-[40px] w-[117px]" />
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Skeleton className="h-[40px] w-[103px]" />
                                    </Button>
                                    <Button asChild variant="ghost">
                                        <Skeleton className="h-[40px] w-[106px]" />
                                    </Button>
                                </>
                            )}
                            {session?.user && (
                                <>
                                    {session.user.roles.includes("administrador") && (
                                        <DropdownMenu>
                                            <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
                                                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                            <DropdownMenuTrigger>
                                                <Button variant="outline">
                                                    <LayoutListIcon className="mr-2 h-4 w-4" />
                                                    <span>Usuarios</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/users/create" className="flex flex-row items-center">
                                                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                                                        <span>Crear</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/users/all" className="flex flex-row items-center">
                                                        <TablePropertiesIcon className="mr-2 h-4 w-4" />
                                                        <span>Ver todos</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="outline">
                                                <LayoutListIcon className="mr-2 h-4 w-4" />
                                                <span>Tareas</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {session.user.roles.includes("administrador") && (
                                                <>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href="/tasks/create"
                                                            className="flex flex-row items-center"
                                                        >
                                                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                                                            <span>Crear</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href="/tasks/all" className="flex flex-row items-center">
                                                            <TablePropertiesIcon className="mr-2 h-4 w-4" />
                                                            <span>Ver todas</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {session.user.roles.includes("empleado") && (
                                                <>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href="/tasks/assigned"
                                                            className="flex flex-row items-center"
                                                        >
                                                            <ListTodoIcon className="mr-2 h-4 w-4" />
                                                            <span>Asignadas</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="outline">
                                                <UserIcon className="mr-2 h-4 w-4" />
                                                <span>Cuenta</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link href="/profile" className="flex flex-row items-center">
                                                    <ContactIcon className="mr-2 h-4 w-4" />
                                                    <span>Perfil</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="#"
                                                    onClick={() => signOut()}
                                                    className="flex flex-row items-center"
                                                >
                                                    <LogOutIcon className="mr-2 h-4 w-4" />
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
