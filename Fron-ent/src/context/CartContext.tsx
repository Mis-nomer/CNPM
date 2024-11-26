import { createContext, useContext, useState, useEffect } from 'react';
import { getCartService } from '@/api/carts';

interface CartContextType {
    cartCount: number;
    setCartCount: (count: number) => void;
    updateCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
    cartCount: 0,
    setCartCount: () => { },
    updateCartCount: async () => { }
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const updateCartCount = async () => {
        if (userInfo?.id) {
            try {
                const response = await getCartService(userInfo.id);
                const count = response.data.data.reduce((total: number, item: any) => total + item.quantity, 0);
                setCartCount(count);
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        } else {
            setCartCount(0);
        }
    };

    useEffect(() => {
        updateCartCount();
    }, [userInfo?.id]);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
