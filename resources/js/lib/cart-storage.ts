import type { ProductCardProduct } from '@/Components/Public/ProductCard';

export type CartLine = {
    productId: string;
    quantity: number;
    product: ProductCardProduct;
};

const keyForUser = (userId: number) => `la-meat-cart:${userId}`;

export function loadCart(userId: number): CartLine[] {
    try {
        const raw = sessionStorage.getItem(keyForUser(userId));
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter(
            (row): row is CartLine =>
                row &&
                typeof row === 'object' &&
                typeof (row as CartLine).productId === 'string' &&
                typeof (row as CartLine).quantity === 'number' &&
                (row as CartLine).product &&
                typeof (row as CartLine).product.id === 'string' &&
                typeof (row as CartLine).product.pricePhp === 'number',
        );
    } catch {
        return [];
    }
}

export function saveCart(userId: number, lines: CartLine[]): void {
    try {
        sessionStorage.setItem(keyForUser(userId), JSON.stringify(lines));
    } catch {
        //
    }
}
