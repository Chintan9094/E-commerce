import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { addToCart, getMyCart, removeFromCart } from "../services/cart";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const redirectingRef = useRef(false);

  const fetchCart = useCallback(async () => {
    try {
      const res = await getMyCart();
      setCart(res.data.cart?.items || []);
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("Unauthorized: User not logged in");
        setCart([]);
        return;
      }
      console.log("Cart error:", err.response?.data || err.message);
      setCart([]);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        fetchCart();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCart([]);
    }
  }, [user, fetchCart]);

  const addItem = async (productId) => {
    try {
      await addToCart(productId);
      await fetchCart();
    } catch (err) {
      if (err.response?.status === 401) {
        if (!redirectingRef.current && window.location.pathname !== "/login") {
          redirectingRef.current = true;
          window.location.href = "/login";
        }
        throw new Error("UNAUTHORIZED");
      }
      throw err;
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeFromCart(productId);
      await fetchCart();
    } catch (err) {
      if (err.response?.status === 401) {
        if (!redirectingRef.current && window.location.pathname !== "/login") {
          redirectingRef.current = true;
          window.location.href = "/login";
        }
        return;
      }
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
