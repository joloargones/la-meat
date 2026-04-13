import AuthModal, { type AuthView } from '@/Components/Auth/AuthModal';
import type { ProductCardProduct } from '@/Components/Public/ProductCard';
import { loadCart, type CartLine, saveCart } from '@/lib/cart-storage';
import { usePage } from '@inertiajs/react';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import type { PageProps } from '@/types';

type ShopContextValue = {
    cart: CartLine[];
    cartLineCount: number;
    requestAddToCart: (product: ProductCardProduct) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    openAuthModal: (view?: AuthView) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function useShop(): ShopContextValue {
    const ctx = useContext(ShopContext);
    if (!ctx) {
        throw new Error('useShop must be used within ShopProvider');
    }
    return ctx;
}

export function ShopProvider({ children }: { children: ReactNode }) {
    const { auth } = usePage<PageProps>().props;
    const [cart, setCart] = useState<CartLine[]>([]);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalKey, setAuthModalKey] = useState(0);
    const [authView, setAuthView] = useState<AuthView>('login');

    useEffect(() => {
        if (!auth.user) {
            setCart([]);
            return;
        }
        setCart(loadCart(auth.user.id));
    }, [auth.user?.id]);

    useEffect(() => {
        if (!auth.user) {
            return;
        }
        saveCart(auth.user.id, cart);
    }, [cart, auth.user]);

    const openAuthModal = useCallback((view: AuthView = 'login') => {
        setAuthView(view);
        setAuthModalKey((k) => k + 1);
        setAuthModalOpen(true);
    }, []);

    const requestAddToCart = useCallback(
        (product: ProductCardProduct) => {
            if (!auth.user) {
                openAuthModal('login');
                return;
            }
            setCart((prev) => {
                const idx = prev.findIndex((l) => l.productId === product.id);
                if (idx >= 0) {
                    const next = [...prev];
                    next[idx] = {
                        ...next[idx],
                        quantity: next[idx].quantity + 1,
                    };
                    return next;
                }
                return [
                    ...prev,
                    { productId: product.id, quantity: 1, product },
                ];
            });
        },
        [auth.user, openAuthModal],
    );

    const removeFromCart = useCallback((productId: string) => {
        setCart((prev) => prev.filter((l) => l.productId !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity < 1) {
            setCart((prev) => prev.filter((l) => l.productId !== productId));
            return;
        }
        setCart((prev) =>
            prev.map((l) =>
                l.productId === productId ? { ...l, quantity } : l,
            ),
        );
    }, []);

    const cartLineCount = useMemo(
        () => cart.reduce((sum, line) => sum + line.quantity, 0),
        [cart],
    );

    const value = useMemo(
        () => ({
            cart,
            cartLineCount,
            requestAddToCart,
            removeFromCart,
            updateQuantity,
            openAuthModal,
        }),
        [
            cart,
            cartLineCount,
            requestAddToCart,
            removeFromCart,
            updateQuantity,
            openAuthModal,
        ],
    );

    return (
        <ShopContext.Provider value={value}>
            {children}
            <AuthModal
                key={authModalKey}
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                view={authView}
                onViewChange={setAuthView}
                onAuthSuccess={() => setAuthModalOpen(false)}
            />
        </ShopContext.Provider>
    );
}
