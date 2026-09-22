export const primaryWhatsappNumber = "2348060137978";
export const secondaryWhatsappNumber = "2347073123596";

export function whatsappHref(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? primaryWhatsappNumber;
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
