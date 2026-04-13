import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { useShop } from '@/contexts/ShopContext';
import { formatProductUnitPrice } from '@/lib/format-currency';
import { usePage } from '@inertiajs/react';
import { CheckIcon, ShoppingCartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { PageProps } from '@/types';

export type ProductCardProduct = {
    id: string;
    name: string;
    /** Price per unit in Philippine pesos */
    pricePhp: number;
    /** Unit label after price, e.g. "lb" */
    priceUnit?: string;
    imageUrl: string;
    imageAlt: string;
};

type ProductCardProps = {
    product: ProductCardProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
    const { requestAddToCart } = useShop();
    const { auth } = usePage<PageProps>().props;
    const [justAdded, setJustAdded] = useState(false);

    useEffect(() => {
        if (!justAdded) {
            return;
        }
        const t = window.setTimeout(() => setJustAdded(false), 1600);
        return () => window.clearTimeout(t);
    }, [justAdded]);

    const handleAdd = () => {
        const authed = !!auth.user;
        requestAddToCart(product);
        if (authed) {
            setJustAdded(true);
        }
    };

    return (
        <Card className="group h-full overflow-hidden pt-0 transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 text-base leading-snug">
                    {product.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="text-lg font-semibold tracking-tight text-foreground tabular-nums">
                    {formatProductUnitPrice(product)}
                </p>
            </CardContent>
            <CardFooter className="mt-auto border-t-0 pt-0">
                <Button
                    type="button"
                    className="w-full gap-2 transition-colors"
                    size="default"
                    variant={justAdded ? 'secondary' : 'default'}
                    onClick={handleAdd}
                >
                    {justAdded ? (
                        <>
                            <CheckIcon className="size-4" />
                            Added
                        </>
                    ) : (
                        <>
                            <ShoppingCartIcon className="size-4" />
                            Add to cart
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
