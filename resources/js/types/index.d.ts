export type AdminRole = 'super_admin' | 'admin' | 'staff';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin?: boolean;
    username?: string | null;
    admin_role?: AdminRole | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
        admin: User | null;
    };
    canResetPassword?: boolean;
    flash?: {
        status?: string | null;
    };
    errors?: Record<string, string>;
};
