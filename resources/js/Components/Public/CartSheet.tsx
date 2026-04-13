import { Button } from '@/Components/ui/button';
import { useShop } from '@/contexts/ShopContext';
import { formatProductUnitPrice } from '@/lib/format-currency';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet';
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

export default function CartSheet() {
    const { cart, cartLineCount, removeFromCart, updateQuantity } = useShop();
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="relative shrink-0"
                    aria-label={`Shopping cart, ${cartLineCount} items`}
                >
                    <ShoppingBagIcon className="size-4" />
                    {cartLineCount > 0 ? (
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground ring-2 ring-background">
                            {cartLineCount > 99 ? '99+' : cartLineCount}
                        </span>
                    ) : null}
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="flex w-[min(100%,22rem)] flex-col gap-0 p-0"
            >
                <SheetHeader className="border-b border-border px-6 py-4 text-left">
                    <SheetTitle className="font-heading text-lg">
                        Your cart
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
                    {cart.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Your cart is empty. Browse featured cuts and add
                            what you need.
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-4">
                            {cart.map((line) => (
                                <li
                                    key={line.productId}
                                    className="flex gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                                        <img
                                            src={line.product.imageUrl}
                                            alt={line.product.imageAlt}
                                            className="size-full object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-medium leading-snug">
                                            {line.product.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                                            {formatProductUnitPrice(line.product)}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex items-center rounded-md border border-border">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon-xs"
                                                    className="size-7 rounded-none rounded-l-md"
                                                    aria-label="Decrease quantity"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            line.productId,
                                                            line.quantity - 1,
                                                        )
                                                    }
                                                >
                                                    <MinusIcon className="size-3.5" />
                                                </Button>
                                                <span className="min-w-8 text-center text-xs font-medium tabular-nums">
                                                    {line.quantity}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon-xs"
                                                    className="size-7 rounded-none rounded-r-md"
                                                    aria-label="Increase quantity"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            line.productId,
                                                            line.quantity + 1,
                                                        )
                                                    }
                                                >
                                                    <PlusIcon className="size-3.5" />
                                                </Button>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-xs"
                                                className="text-muted-foreground hover:text-destructive"
                                                aria-label={`Remove ${line.product.name}`}
                                                onClick={() =>
                                                    removeFromCart(
                                                        line.productId,
                                                    )
                                                }
                                            >
                                                <Trash2Icon className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cart.length > 0 ? (
                    <div className="border-t border-border bg-muted/30 px-6 py-4">
                        <Button className="w-full" type="button" disabled>
                            Checkout (coming soon)
                        </Button>
                    </div>
                ) : null}
            </SheetContent>
        </Sheet>
    );
}
