import LoginForm from '@/Components/Auth/LoginForm';
import RegisterForm from '@/Components/Auth/RegisterForm';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';

import type { PageProps } from '@/types';

export type AuthView = 'login' | 'register';

type AuthModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    view: AuthView;
    onViewChange: (view: AuthView) => void;
    /** Called after successful login/register before Inertia navigates */
    onAuthSuccess?: () => void;
};

export default function AuthModal({
    open,
    onOpenChange,
    view,
    onViewChange,
    onAuthSuccess,
}: AuthModalProps) {
    const { flash } = usePage<PageProps>().props;
    const status = flash?.status;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex max-h-[min(90dvh,calc(100%-2rem))] w-full max-w-md flex-col gap-0 overflow-x-hidden overflow-y-auto rounded-xl border border-border/60 bg-white p-0 text-foreground shadow-lg sm:max-w-md dark:border-border dark:bg-zinc-950 dark:text-zinc-50"
                showCloseButton
            >
                <div className="relative shrink-0 border-b border-border/60 px-6 pb-4 pt-6 pr-14 dark:border-border/60">
                    <DialogHeader className="gap-1.5 text-left sm:text-left">
                        <DialogTitle className="font-heading text-xl font-semibold tracking-tight">
                            {view === 'login'
                                ? 'Welcome back'
                                : 'Join LA Meat'}
                        </DialogTitle>
                        <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                            {view === 'login'
                                ? 'Sign in to continue shopping premium cuts.'
                                : 'Create an account to save your preferences.'}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="flex flex-col gap-4 bg-white px-6 pb-6 pt-5 dark:bg-zinc-950">
                    {status && (
                        <Alert className="border-primary/30 bg-primary/5 text-foreground dark:bg-primary/10">
                            <CheckCircle2Icon className="text-primary" />
                            <AlertTitle className="text-foreground">
                                Success
                            </AlertTitle>
                            <AlertDescription>{status}</AlertDescription>
                        </Alert>
                    )}

                    {view === 'login' ? (
                        <LoginForm
                            onAuthSuccess={onAuthSuccess}
                            onSwitchToRegister={() =>
                                onViewChange('register')
                            }
                        />
                    ) : (
                        <RegisterForm
                            onAuthSuccess={onAuthSuccess}
                            onSwitchToLogin={() => onViewChange('login')}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
