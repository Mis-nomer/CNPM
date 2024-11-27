// src/contexts/CartContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getCartService } from '@/api/carts';

interface CartItem {
    quantity: number;
    // Thêm các field khác nếu cần
}

interface CartContextType {
    cartCount: number;
    setCartCount: (count: number) => void;
    updateCartCount: () => Promise<void>;
}

const defaultContextValue: CartContextType = {
    cartCount: 0,
    setCartCount: () => { },
    updateCartCount: async () => { },
};

const CartContext = createContext<CartContextType>(defaultContextValue);

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartCount, setCartCount] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        setUserId(userInfo?.id || null);
    }, []);

    const updateCartCount = async () => {
        if (!userId) {
            setCartCount(0);
            return;
        }

        try {
            const response = await getCartService(userId);
            const items: CartItem[] = response.data.data;
            const count = items.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
            setCartCount(0);
        }
    };

    useEffect(() => {
        updateCartCount();
    }, [userId]);

    const contextValue = {
        cartCount,
        setCartCount,
        updateCartCount,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
