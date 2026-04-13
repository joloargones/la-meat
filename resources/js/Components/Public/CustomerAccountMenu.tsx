import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import {
    ChevronDownIcon,
    LogOutIcon,
    PackageIcon,
    SettingsIcon,
} from 'lucide-react';

import type { PageProps } from '@/types';

const itemClass =
    'flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-foreground outline-none data-focus:bg-muted';

export default function CustomerAccountMenu() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    if (!user) {
        return null;
    }

    const logout = () => {
        router.post(route('logout'));
    };

    return (
        <Menu as="div" className="relative hidden sm:block">
            <MenuButton
                className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'inline-flex max-w-[14rem] items-center gap-1 font-medium',
                )}
                aria-label="Account menu"
            >
                <span className="truncate">{user.name}</span>
                <ChevronDownIcon className="size-4 shrink-0 opacity-60" />
            </MenuButton>
            <MenuItems
                transition
                className={cn(
                    'absolute right-0 z-50 mt-1 w-52 origin-top-right rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none',
                    'transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 data-open:opacity-100',
                )}
            >
                <MenuItem>
                    <Link href={route('orders')} className={itemClass}>
                        <PackageIcon className="size-4 opacity-70" />
                        My orders
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href={route('profile.edit')} className={itemClass}>
                        <SettingsIcon className="size-4 opacity-70" />
                        Settings
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button type="button" className={itemClass} onClick={logout}>
                        <LogOutIcon className="size-4 opacity-70" />
                        Log out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
