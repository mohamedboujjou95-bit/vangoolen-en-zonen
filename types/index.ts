// ─── Navigation ────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

// ─── Services (from bedrijfsplan: 3 core acute services) ───────
export type ServiceId = "lekkage" | "verstopping" | "cv-storing";

export interface GildeService {
  id: ServiceId;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  /** Fixed base price incl. first 30 min, from bedrijfsplan */
  basePrice: number;
  /** Per 15 min continuation rate */
  continuationRate: number;
  responseTime: string;
  features: string[];
  slug: string;
}

// ─── Gildetarieven (exact from bedrijfsplan p.2) ────────────────
export interface GildeTarief {
  service: string;
  serviceId: ServiceId;
  vastTarief: number;      // incl. first 30 min
  vervolgtarief: number;   // per 15 min
  unit: string;
}

// ─── Reviews ───────────────────────────────────────────────────
export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

// ─── FAQ ───────────────────────────────────────────────────────
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// ─── Multi-step Booking ────────────────────────────────────────
export type BookingStep = 1 | 2 | 3 | 4;

export type UrgencyLevel = "nu-spoed" | "vandaag" | "deze-week";

export interface BookingFormData {
  // Step 1 — kies probleem
  serviceId: ServiceId | "";
  serviceLabel: string;
  urgency: UrgencyLevel | "";
  // Step 2 — postcode check
  postalCode: string;
  city: string;
  address: string;
  houseNumber: string;
  // Step 3 — contactgegevens
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
}

// ─── API / Utility ─────────────────────────────────────────────
export interface PostalCodeResult {
  valid: boolean;
  city?: string;
  inServiceArea: boolean;
  nearestTechnician?: string;   // e.g. "Jan de Vries (2.4 km)"
  estimatedArrival?: string;    // e.g. "~35 minuten"
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── Stat ──────────────────────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
  icon?: string;
}

// ─── Gilde Belofte (3 promises from bedrijfsplan) ──────────────
export interface GildeBelofte {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

// ─── Contact ───────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
  isToday?: boolean;
}
