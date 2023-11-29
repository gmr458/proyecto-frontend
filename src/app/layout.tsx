import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Inicio",
    description: "Aplicación web para la gestión de tareas de ingenieros ambientales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Providers>
                        <Navbar />
                        {children}
                        <Toaster />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
