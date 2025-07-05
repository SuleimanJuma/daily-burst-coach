import { supabase } from './supabaseClient';

// Returns a Promise for the current authenticated user's ID from Supabase Auth, or null if not logged in
export async function getCurrentUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data || !data.user) return null;
  return data.user.id;
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
