import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { ShoppingCartIcon } from 'lucide-react';

export type ProductCardProduct = {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    imageAlt: string;
};

type ProductCardProps = {
    product: ProductCardProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
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
                <p className="text-lg font-semibold tracking-tight text-foreground">
                    {product.price}
                </p>
            </CardContent>
            <CardFooter className="mt-auto border-t-0 pt-0">
                <Button className="w-full gap-2" size="default">
                    <ShoppingCartIcon className="size-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
