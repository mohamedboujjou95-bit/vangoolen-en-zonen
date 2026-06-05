import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SERVICE_AREA_PREFIXES } from "@/lib/data";
import type { PostalCodeResult } from "@/types";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format Euro — Dutch locale */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Validate Dutch postal code (1234 AB or 1234AB) */
export function isValidPostalCode(value: string): boolean {
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  return /^[1-9][0-9]{3}[A-Z]{2}$/.test(cleaned);
}

/** Normalise to "1234 AB" format */
export function normalisePostalCode(value: string): string {
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  if (cleaned.length >= 6) return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)}`;
  return value.toUpperCase();
}

/** Simulate postal code area check */
export async function checkPostalCode(raw: string): Promise<PostalCodeResult> {
  await simulateDelay(900);
  if (!isValidPostalCode(raw)) {
    return { valid: false, inServiceArea: false };
  }

  const code = raw.replace(/\s/g, "");
  const prefix2 = code.slice(0, 2);

  const inArea = SERVICE_AREA_PREFIXES.includes(prefix2);

  // Mock city lookup
  const cityMap: Record<string, string> = {
    "10": "Amsterdam", "11": "Amsterdam", "12": "Amsterdam",
    "13": "Amsterdam", "14": "Amsterdam", "15": "Amsterdam",
    "16": "Amsterdam", "17": "Amsterdam", "18": "Amsterdam",
    "20": "Haarlem",   "21": "Haarlem",
    "23": "Leiden",
    "24": "Alphen aan den Rijn",
    "25": "Den Haag",  "26": "Den Haag / Delft",
    "27": "Den Haag",
    "28": "Gouda",     "29": "Gouda",
    "30": "Rotterdam", "31": "Rotterdam", "32": "Rotterdam",
    "34": "Utrecht",   "35": "Utrecht",   "36": "Utrecht", "37": "Utrecht",
    "19": "Amstelveen",
  };

  const city = cityMap[prefix2] ?? "uw regio";
  const minutes = Math.floor(Math.random() * 30) + 45; // 45–75 min

  return {
    valid: true,
    city,
    inServiceArea: inArea,
    nearestTechnician: inArea ? "Gilde-vakman in uw buurt" : undefined,
    estimatedArrival: inArea ? `~${minutes} minuten` : undefined,
  };
}

/** Simulate async API delay */
export function simulateDelay(ms = 1200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Get star array for rating */
export function getStarArray(rating: number): Array<"full" | "half" | "empty"> {
  const stars: Array<"full" | "half" | "empty"> = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push("full");
    else if (rating >= i - 0.5) stars.push("half");
    else stars.push("empty");
  }
  return stars;
}
