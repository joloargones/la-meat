import ApplicationLogo from '@/Components/ApplicationLogo';
import AuthModal, { type AuthView } from '@/Components/Auth/AuthModal';
import { Button } from '@/Components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

import type { PageProps } from '@/types';

const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
] as const;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalKey, setAuthModalKey] = useState(0);
    const [authView, setAuthView] = useState<AuthView>('login');
    const { auth } = usePage<PageProps>().props;

    const openAuth = (view: AuthView) => {
        setAuthView(view);
        setAuthModalKey((k) => k + 1);
        setAuthModalOpen(true);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/#home"
                    className="flex shrink-0 items-center gap-2 text-foreground transition-opacity hover:opacity-90"
                >
                    <ApplicationLogo className="size-8 text-primary" />
                    <span className="font-heading text-lg font-semibold tracking-tight">
                        LA Meat
                    </span>
                </Link>

                <nav
                    className="hidden items-center gap-1 md:flex"
                    aria-label="Main"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <div className="hidden items-center gap-2 sm:flex">
                        {auth.user ? (
                            <Button size="sm" asChild>
                                <Link href={route('dashboard')}>
                                    Dashboard
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    type="button"
                                    onClick={() => openAuth('login')}
                                >
                                    Login
                                </Button>
                                <Button
                                    size="sm"
                                    type="button"
                                    onClick={() => openAuth('register')}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </div>

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden"
                                aria-label="Open menu"
                            >
                                <MenuIcon className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[min(100%,20rem)]">
                            <SheetHeader>
                                <SheetTitle className="text-left">Menu</SheetTitle>
                            </SheetHeader>
                            <nav
                                className="mt-6 flex flex-col gap-1"
                                aria-label="Mobile"
                            >
                                {navItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                            <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
                                {auth.user ? (
                                    <Button className="w-full" asChild>
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            type="button"
                                            onClick={() => {
                                                openAuth('login');
                                                setOpen(false);
                                            }}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            className="w-full"
                                            type="button"
                                            onClick={() => {
                                                openAuth('register');
                                                setOpen(false);
                                            }}
                                        >
                                            Register
                                        </Button>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <AuthModal
                key={authModalKey}
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                view={authView}
                onViewChange={setAuthView}
            />
        </header>
    );
}
