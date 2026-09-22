"use client";

import { CartProvider } from "../components/cart-store";
import { AuthProvider } from "../components/auth-store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
