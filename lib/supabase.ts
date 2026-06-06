import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Partner = {
  id: string;
  created_at: string;
  naam: string;
  email: string;
  telefoon: string;
  stad: string;
  diploma: string;
  beschikbaar: boolean;
  actief: boolean;
  beoordelingen_gemiddeld: number;
  klussen_voltooid: number;
};

export type Boeking = {
  id: string;
  created_at: string;
  service: string;
  urgentie: string;
  klant_naam: string;
  klant_telefoon: string;
  klant_email: string;
  adres: string;
  stad: string;
  opmerkingen?: string;
  status: string;
  partner_id?: string;
  partner?: Partner;
};
