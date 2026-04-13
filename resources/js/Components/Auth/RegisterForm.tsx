import { Button } from '@/Components/ui/button';
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '@/Components/ui/field';
import { Input } from '@/Components/ui/input';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useId } from 'react';

type RegisterFormProps = {
    onSwitchToLogin: () => void;
    onAuthSuccess?: () => void;
};

export default function RegisterForm({
    onSwitchToLogin,
    onAuthSuccess,
}: RegisterFormProps) {
    const id = useId();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            preserveScroll: false,
            onSuccess: () => {
                onAuthSuccess?.();
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4">
            <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
                <FieldContent>
                    <Input
                        id={`${id}-name`}
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        required
                        aria-invalid={!!errors.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <FieldError>{errors.name}</FieldError>
                </FieldContent>
            </Field>

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
                        autoComplete="new-password"
                        required
                        aria-invalid={!!errors.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <FieldError>{errors.password}</FieldError>
                </FieldContent>
            </Field>

            <Field data-invalid={!!errors.password_confirmation}>
                <FieldLabel htmlFor={`${id}-password_confirmation`}>
                    Confirm password
                </FieldLabel>
                <FieldContent>
                    <Input
                        id={`${id}-password_confirmation`}
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        required
                        aria-invalid={!!errors.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <FieldError>{errors.password_confirmation}</FieldError>
                </FieldContent>
            </Field>

            <Button
                type="submit"
                variant="default"
                className="mt-1 h-11 w-full text-base font-semibold shadow-sm"
                size="lg"
                disabled={processing}
            >
                {processing ? 'Creating account…' : 'Create account'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                    type="button"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                    onClick={onSwitchToLogin}
                >
                    Sign in
                </button>
            </p>
        </form>
    );
}
