export const primaryWhatsappNumber = "2348060137978";
export const secondaryWhatsappNumber = "2347073123596";

export function whatsappHref(message: string) {
  return `https://wa.me/${primaryWhatsappNumber}?text=${encodeURIComponent(message)}`;
}
