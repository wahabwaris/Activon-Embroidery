import { activeProducts, backings, shapes } from "./catalog";

export const MAX_FILE_MB = 15;
export const ALLOWED_EXT = ["jpg", "jpeg", "png", "pdf", "ai", "eps", "svg"];

export const productOptions = activeProducts.map((p) => ({ value: p.key, label: p.name }));
export const backingOptions = [
  ...backings.map((b) => ({ value: b.key, label: b.name.replace(" Backing", "") })),
  { value: "not-sure", label: "Not Sure – Need Advice" },
];
export const shapeOptions = shapes.map((s) => ({ value: s.key, label: s.name }));

export type QuoteInput = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  width: string;
  height: string;
  unit: string;
  shape: string;
  backing: string;
  border: string;
  colours: string;
  message: string;
};

export function validateQuote(d: Partial<QuoteInput>) {
  const errors: Partial<Record<keyof QuoteInput, string>> = {};
  const req = (k: keyof QuoteInput, msg: string) => {
    if (!d[k] || !String(d[k]).trim()) errors[k] = msg;
  };
  req("fullName", "Please enter your full name.");
  req("email", "Please enter your email address.");
  req("phone", "Please enter a WhatsApp or phone number.");
  req("country", "Please enter your country.");
  req("product", "Please choose a patch type.");
  req("quantity", "Please enter the quantity.");
  req("width", "Please enter the width.");
  req("height", "Please enter the height.");
  req("shape", "Please choose a shape.");
  req("backing", "Please choose a backing option.");
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = "Please enter a valid email address.";
  if (d.phone && !/^[+\d][\d\s().-]{5,}$/.test(d.phone)) errors.phone = "Please enter a valid phone number.";
  if (d.quantity && !(Number(d.quantity) > 0)) errors.quantity = "Quantity must be a positive number.";
  if (d.width && !(Number(d.width) > 0)) errors.width = "Enter a valid width.";
  if (d.height && !(Number(d.height) > 0)) errors.height = "Enter a valid height.";
  if (d.product && !productOptions.some((p) => p.value === d.product)) errors.product = "Please choose a patch type.";
  if (d.backing && !backingOptions.some((b) => b.value === d.backing)) errors.backing = "Please choose a backing option.";
  return errors;
}
