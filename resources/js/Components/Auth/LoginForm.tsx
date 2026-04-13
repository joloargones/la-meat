import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/Components/ui/field';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useId } from 'react';

import type { PageProps } from '@/types';

type LoginFormProps = {
    onSwitchToRegister: () => void;
    onAuthSuccess?: () => void;
};

export default function LoginForm({
    onSwitchToRegister,
    onAuthSuccess,
}: LoginFormProps) {
    const id = useId();
    const { canResetPassword } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            preserveScroll: false,
            onSuccess: () => {
                onAuthSuccess?.();
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4">
            <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor={`${id}-email`}>Email</FieldLabel>
                <FieldContent>
                    <Input
                        id={`${id}-email`}
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        required
                        aria-invalid={!!errors.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <FieldError>{errors.email}</FieldError>
                </FieldContent>
            </Field>

            <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor={`${id}-password`}>Password</FieldLabel>
                <FieldContent>
                    <Input
                        id={`${id}-password`}
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        required
                        aria-invalid={!!errors.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <FieldError>{errors.password}</FieldError>
                </FieldContent>
            </Field>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center gap-2.5">
                    <Checkbox
                        id={`${id}-remember`}
                        checked={data.remember}
                        onCheckedChange={(checked) =>
                            setData('remember', checked === true)
                        }
                    />
                    <Label
                        htmlFor={`${id}-remember`}
                        className="cursor-pointer text-sm font-normal text-muted-foreground"
                    >
                        Remember me
                    </Label>
                </div>
                {canResetPassword ? (
                    <Link
                        href={route('password.request')}
                        className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                        Forgot password?
                    </Link>
                ) : (
                    <span
                        className="text-sm text-muted-foreground"
                        title="Password reset is not configured"
                    >
                        Forgot password?
                    </span>
                )}
            </div>

            <Button
                type="submit"
                variant="default"
                className="mt-1 h-11 w-full text-base font-semibold shadow-sm"
                size="lg"
                disabled={processing}
            >
                {processing ? 'Signing in…' : 'Sign in'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                No account?{' '}
                <button
                    type="button"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                    onClick={onSwitchToRegister}
                >
                    Create one
                </button>
            </p>
        </form>
    );
}
