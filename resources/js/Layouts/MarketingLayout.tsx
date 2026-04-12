import { PropsWithChildren } from 'react';

export default function MarketingLayout({ children }: PropsWithChildren) {
    return (
        <div className="theme flex min-h-screen flex-col bg-background">
            {children}
        </div>
    );
}
