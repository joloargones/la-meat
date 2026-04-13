import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { usePage } from '@inertiajs/react';
import { CheckCircle2Icon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { PageProps } from '@/types';

export default function FlashBanner() {
    const { flash } = usePage<PageProps>().props;
    const message = flash?.status ?? null;
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (!message) {
            return;
        }
        setDismissed(false);
        const t = window.setTimeout(() => setDismissed(true), 6000);
        return () => window.clearTimeout(t);
    }, [message]);

    if (!message || dismissed) {
        return null;
    }

    return (
        <div
            className="sticky top-16 z-40 border-b border-primary/20 bg-primary/5 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8"
            role="status"
        >
            <div className="mx-auto flex max-w-7xl items-start gap-3">
                <Alert className="flex-1 border-primary/25 bg-background/95 shadow-sm">
                    <CheckCircle2Icon className="text-primary" />
                    <AlertTitle className="text-foreground">Success</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="shrink-0 text-muted-foreground"
                    aria-label="Dismiss"
                    onClick={() => setDismissed(true)}
                >
                    <XIcon className="size-4" />
                </Button>
            </div>
        </div>
    );
}
