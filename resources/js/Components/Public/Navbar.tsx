import ApplicationLogo from '@/Components/ApplicationLogo';
import type { AuthView } from '@/Components/Auth/AuthModal';
import CartSheet from '@/Components/Public/CartSheet';
import CustomerAccountMenu from '@/Components/Public/CustomerAccountMenu';
import { Button } from '@/Components/ui/button';
import { useShop } from '@/contexts/ShopContext';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet';
import { MenuIcon, PackageIcon, SettingsIcon, ShoppingBagIcon } from 'lucide-react';
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
    const { auth } = usePage<PageProps>().props;
    const { openAuthModal } = useShop();

    const openAuth = (view: AuthView) => {
        openAuthModal(view);
    };

    const logout = () => {
        router.post(route('logout'));
        setOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/#home"
                    className="flex shrink-0 items-center gap-2 text-foreground transition-opacity hover:opacity-90"
                >
                    <ApplicationLogo className="size-16 text-primary" />
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
                    {auth.user ? (
                        <div className="hidden sm:block">
                            <CartSheet />
                        </div>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="hidden shrink-0 sm:inline-flex"
                            aria-label="Sign in to use your cart"
                            onClick={() => openAuth('login')}
                        >
                            <ShoppingBagIcon className="size-4" />
                        </Button>
                    )}
                    <div className="hidden items-center gap-2 sm:flex">
                        {auth.user ? (
                            <CustomerAccountMenu />
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
                        <SheetContent
                            side="right"
                            className="w-[min(100%,20rem)]"
                        >
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    Menu
                                </SheetTitle>
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
                                    <>
                                        <div className="flex justify-center pb-2">
                                            <CartSheet />
                                        </div>
                                        <p className="truncate px-1 text-sm font-medium text-foreground">
                                            {auth.user.name}
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start gap-2"
                                            asChild
                                        >
                                            <Link
                                                href={route('orders')}
                                                onClick={() => setOpen(false)}
                                            >
                                                <PackageIcon className="size-4" />
                                                My orders
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start gap-2"
                                            asChild
                                        >
                                            <Link
                                                href={route('profile.edit')}
                                                onClick={() => setOpen(false)}
                                            >
                                                <SettingsIcon className="size-4" />
                                                Settings
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            type="button"
                                            onClick={logout}
                                        >
                                            Log out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="w-full gap-2"
                                            type="button"
                                            onClick={() => {
                                                openAuth('login');
                                                setOpen(false);
                                            }}
                                        >
                                            <ShoppingBagIcon className="size-4" />
                                            Sign in for cart
                                        </Button>
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
        </header>
    );
}
