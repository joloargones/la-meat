import FlashBanner from '@/Components/Public/FlashBanner';
import { ShopProvider } from '@/contexts/ShopContext';
import { PropsWithChildren } from 'react';

export default function MarketingLayout({ children }: PropsWithChildren) {
    return (
        <div className="theme flex min-h-screen flex-col bg-background">
            <ShopProvider>
                <FlashBanner />
                {children}
            </ShopProvider>
        </div>
    );
}
