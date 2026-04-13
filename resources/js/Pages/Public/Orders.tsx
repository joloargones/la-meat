import Navbar from '@/Components/Public/Navbar';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Head } from '@inertiajs/react';

export default function Orders() {
    return (
        <MarketingLayout>
            <Head title="My orders — LA Meat" />
            <div className="scroll-mt-16">
                <Navbar />
                <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        My orders
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Order history will show here once checkout is connected to
                        your store backend.
                    </p>
                </main>
            </div>
        </MarketingLayout>
    );
}
