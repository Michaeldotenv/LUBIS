import type { Product } from "../app/data";
import type { CartItem } from "./cart-store";

export const primaryWhatsappNumber = "2348060137978";
export const secondaryWhatsappNumber = "2347073123596";

export function whatsappHref(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? primaryWhatsappNumber;
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappMessage(product: Product, size?: string, color?: string) {
  const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
  return [
    "Hello Lubis Clothing, I want to buy this item:",
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Collection: ${product.collection}`,
    `Price: ${money.format(product.price)}`,
    `Size: ${size ?? product.sizes.join(", ")}`,
    `Colour: ${color ?? product.colors.join(", ")}`,
    `Material: ${product.material}`,
    `Fit: ${product.fit}`,
    `Stock note: ${product.stock} pieces currently listed`
  ].join("\n");
}

export function cartWhatsappMessage(items: CartItem[], total: number) {
  const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
  const lines = items.flatMap((item, index) => [
    `${index + 1}. ${item.name}`,
    `   Size: ${item.size}`,
    `   Colour: ${item.color}`,
    `   Quantity: ${item.quantity}`,
    `   Category: ${item.category}`,
    `   Fit: ${item.fit}`,
    `   Line total: ${money.format(item.price * item.quantity)}`
  ]);

  return [
    "Hello Lubis Clothing, I want to order these items:",
    ...lines,
    `Cart total: ${money.format(total)}`,
    "Please confirm availability and delivery."
  ].join("\n");
}

export const customRequestMessage = "Hello Lubis Clothing, I would like assistance finding a specific clothing item, size, colour, or style.";
