/**
 * Database types — hand-maintained mirror of supabase/migrations/0001_init.sql.
 *
 * Once you've linked a Supabase project, regenerate this file by running:
 *
 *   pnpm db:types
 *
 * which runs `supabase gen types typescript --linked > src/types/db.ts`.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [k: string]: Json | undefined }
  | Json[];

export type SizeCategory = "compact" | "midsize" | "large" | "xl" | "xxl";
export type VehicleKind =
  | "car"
  | "truck"
  | "suv"
  | "boat"
  | "rv"
  | "motorcycle";
export type ServiceCategory =
  | "auto"
  | "boat"
  | "rv"
  | "motorcycle"
  | "ceramic"
  | "correction"
  | "add_on";
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";
export type Role = "customer" | "admin" | "staff";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          sms_opt_in: boolean;
          marketing_opt_in: boolean;
          role: Role;
          stripe_customer_id: string | null;
          referral_code: string | null;
          referred_by: string | null;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [];
      };
      vehicles: {
        Row: {
          id: string;
          owner_id: string;
          kind: VehicleKind;
          year: number | null;
          make: string | null;
          model: string | null;
          color: string | null;
          vin_or_hin: string | null;
          size_category: SizeCategory | null;
          notes: string | null;
          primary_photo_url: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["vehicles"]["Row"]> & {
          owner_id: string;
          kind: VehicleKind;
        };
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Row"]>;
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          slug: string;
          name: string;
          category: ServiceCategory;
          short_description: string | null;
          long_description: string | null;
          base_duration_min: number;
          active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          slug: string;
          name: string;
          category: ServiceCategory;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Relationships: [];
      };
      service_prices: {
        Row: {
          id: string;
          service_id: string;
          size_category: SizeCategory;
          price_cents: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["service_prices"]["Row"],
          "id"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["service_prices"]["Row"]>;
        Relationships: [];
      };
      packages: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tier:
            | "express"
            | "full"
            | "premium"
            | "ceramic"
            | "membership"
            | null;
          category: ServiceCategory;
          description: string | null;
          base_price_cents: number;
          deposit_pct: number;
          stripe_price_id: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["packages"]["Row"]> & {
          slug: string;
          name: string;
          category: ServiceCategory;
          base_price_cents: number;
        };
        Update: Partial<Database["public"]["Tables"]["packages"]["Row"]>;
        Relationships: [];
      };
      package_services: {
        Row: { package_id: string; service_id: string };
        Insert: Database["public"]["Tables"]["package_services"]["Row"];
        Update: Partial<
          Database["public"]["Tables"]["package_services"]["Row"]
        >;
        Relationships: [];
      };
      service_zips: {
        Row: {
          zip: string;
          city: string | null;
          county: string | null;
          tier: number;
          travel_fee_cents: number;
        };
        Insert: Database["public"]["Tables"]["service_zips"]["Row"];
        Update: Partial<Database["public"]["Tables"]["service_zips"]["Row"]>;
        Relationships: [];
      };
      appointments: {
        Row: {
          id: string;
          customer_id: string;
          vehicle_id: string;
          package_id: string | null;
          status: AppointmentStatus;
          scheduled_start: string;
          scheduled_end: string;
          service_address: string;
          service_city: string | null;
          service_state: string;
          service_zip: string | null;
          service_notes: string | null;
          subtotal_cents: number;
          travel_fee_cents: number;
          discount_cents: number;
          total_cents: number;
          deposit_cents: number;
          deposit_paid: boolean;
          balance_paid: boolean;
          stripe_payment_intent_id: string | null;
          stripe_balance_intent_id: string | null;
          internal_notes: string | null;
          cancelled_at: string | null;
          cancellation_reason: string | null;
          refund_amount_cents: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["appointments"]["Row"]> & {
          customer_id: string;
          vehicle_id: string;
          scheduled_start: string;
          scheduled_end: string;
          service_address: string;
          subtotal_cents: number;
          total_cents: number;
          deposit_cents: number;
        };
        Update: Partial<Database["public"]["Tables"]["appointments"]["Row"]>;
        Relationships: [];
      };
      appointment_services: {
        Row: {
          appointment_id: string;
          service_id: string;
          price_cents: number;
        };
        Insert: Database["public"]["Tables"]["appointment_services"]["Row"];
        Update: Partial<
          Database["public"]["Tables"]["appointment_services"]["Row"]
        >;
        Relationships: [];
      };
      service_photos: {
        Row: {
          id: string;
          appointment_id: string;
          vehicle_id: string;
          storage_path: string;
          caption: string | null;
          is_before: boolean;
          is_after: boolean;
          display_on_public_gallery: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["service_photos"]["Row"],
          "id" | "created_at"
        > & { id?: string; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["service_photos"]["Row"]>;
        Relationships: [];
      };
      memberships: {
        Row: {
          id: string;
          customer_id: string;
          vehicle_id: string | null;
          package_id: string;
          stripe_subscription_id: string | null;
          status:
            | "active"
            | "past_due"
            | "paused"
            | "cancelled"
            | "incomplete";
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["memberships"]["Row"]> & {
          customer_id: string;
          package_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["memberships"]["Row"]>;
        Relationships: [];
      };
      gift_cards: {
        Row: {
          id: string;
          code: string;
          initial_amount_cents: number;
          remaining_amount_cents: number;
          purchaser_email: string | null;
          recipient_email: string | null;
          recipient_name: string | null;
          message: string | null;
          stripe_payment_intent_id: string | null;
          redeemed: boolean;
          created_at: string;
          expires_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["gift_cards"]["Row"]> & {
          code: string;
          initial_amount_cents: number;
          remaining_amount_cents: number;
        };
        Update: Partial<Database["public"]["Tables"]["gift_cards"]["Row"]>;
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          customer_id: string | null;
          appointment_id: string | null;
          display_name: string;
          rating: number;
          body: string;
          approved: boolean;
          featured: boolean;
          source: "site" | "google" | "facebook";
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["reviews"]["Row"]> & {
          display_name: string;
          rating: number;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
        Relationships: [];
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: "pct" | "fixed";
          discount_value: number;
          max_uses: number | null;
          uses: number;
          expires_at: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["coupons"]["Row"]> & {
          code: string;
          discount_type: "pct" | "fixed";
          discount_value: number;
        };
        Update: Partial<Database["public"]["Tables"]["coupons"]["Row"]>;
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          kind: "contact" | "quote";
          name: string;
          email: string;
          phone: string | null;
          vehicle_type: string | null;
          vehicle_size: string | null;
          zip: string | null;
          package_interest: string | null;
          message: string | null;
          estimated_price_cents: number | null;
          handled: boolean;
          created_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["contact_submissions"]["Row"]
        > & {
          kind: "contact" | "quote";
          name: string;
          email: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["contact_submissions"]["Row"]
        >;
        Relationships: [];
      };
      stripe_events: {
        Row: {
          id: string;
          type: string;
          payload: Json;
          processed_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["stripe_events"]["Row"],
          "processed_at"
        > & { processed_at?: string };
        Update: Partial<Database["public"]["Tables"]["stripe_events"]["Row"]>;
        Relationships: [];
      };
      audit_log: {
        Row: {
          id: number;
          actor_id: string | null;
          action: string;
          entity: string | null;
          entity_id: string | null;
          payload: Json | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["audit_log"]["Row"],
          "id" | "created_at"
        > & { id?: number; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["audit_log"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
