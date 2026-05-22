"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
} from "react";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE_CART"; payload: CartState };

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.product.id === product.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity: Math.min(product.stock, quantity) }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload.productId),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: Math.min(item.product.stock, Math.max(1, action.payload.quantity)) }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "HYDRATE_CART":
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem("product-dashboard-cart");
      if (raw) {
        const storedState = JSON.parse(raw) as CartState;
        dispatch({ type: "HYDRATE_CART", payload: storedState });
      }
    } catch {
      // If localStorage is unavailable, we silently fallback.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("product-dashboard-cart", JSON.stringify(state));
    } catch {
      // If localStorage is unavailable, we silently fallback.
    }
  }, [state]);

  const value = useMemo(() => state, [state]);

  return (
    <CartStateContext.Provider value={value}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartStateContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}
