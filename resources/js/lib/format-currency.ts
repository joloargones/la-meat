const phpFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

/**
 * Philippine Peso (ISO: PHP), e.g. ₱1,000.00
 */
export function formatPhp(amount: number): string {
    return phpFormatter.format(amount);
}

export type PricedProduct = {
    pricePhp: number;
    /** Display unit after price, e.g. "lb" → "₱… / lb" */
    priceUnit?: string;
};

export function formatProductUnitPrice(product: PricedProduct): string {
    const unit = product.priceUnit ?? 'lb';
    return `${formatPhp(product.pricePhp)} / ${unit}`;
}
