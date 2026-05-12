import type { Database, SizeCategory, ServiceCategory } from "@/types/db";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type ServicePrice =
  Database["public"]["Tables"]["service_prices"]["Row"];
export type Package = Database["public"]["Tables"]["packages"]["Row"];
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
export type AppointmentService =
  Database["public"]["Tables"]["appointment_services"]["Row"];
export type ServicePhoto =
  Database["public"]["Tables"]["service_photos"]["Row"];
export type Membership = Database["public"]["Tables"]["memberships"]["Row"];
export type GiftCard = Database["public"]["Tables"]["gift_cards"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Coupon = Database["public"]["Tables"]["coupons"]["Row"];
export type ServiceZip = Database["public"]["Tables"]["service_zips"]["Row"];
export type ContactSubmission =
  Database["public"]["Tables"]["contact_submissions"]["Row"];

export type ServiceWithPrices = Service & { prices: ServicePrice[] };
export type AppointmentWithDetails = Appointment & {
  vehicle: Vehicle;
  customer: Profile;
  services: (AppointmentService & { service: Service })[];
};

export type { SizeCategory, ServiceCategory };

/** Human-readable size labels used in the UI */
export const SIZE_LABELS: Record<SizeCategory, string> = {
  compact: "Compact (small sedan, coupe)",
  midsize: "Midsize (sedan, small SUV, motorcycle)",
  large: "Large (full SUV, midsize truck, ATV)",
  xl: "XL (full-size pickup, large SUV)",
  xxl: "XXL (3-row SUV, Class C RV, 20'+ boat)",
};

export const VEHICLE_KIND_LABELS = {
  car: "Car / sedan / coupe",
  truck: "Truck",
  suv: "SUV",
  boat: "Boat",
  rv: "RV / motorhome",
  motorcycle: "Motorcycle",
} as const;
