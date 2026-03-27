// ── Types ──

export type UserRole = 'renter' | 'landlord' | 'admin';

export type PropertyType = 'house' | 'apartment' | 'condo' | 'basement' | 'townhouse' | 'studio';
export type ListingStatus = 'active' | 'paused' | 'rented' | 'draft';
export type RentalTerm = 3 | 6 | 12;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  bio?: string;
  preferredContact?: 'email' | 'phone' | 'in_app';
  emailVerified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
  createdAt: Date;
}

export interface Property {
  id: string;
  landlordId: string;
  title: string;
  description: string;
  type: PropertyType;
  status: ListingStatus;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage?: number;
  floor?: number;
  pricePerTerm: Record<RentalTerm, number>;
  deposit: number;
  utilitiesIncluded: boolean;
  parkingIncluded: boolean;
  petFriendly: boolean;
  furnished: boolean;
  amenities: string[];
  photos: string[];
  coverPhoto: string;
  availableFrom: Date;
  minimumLeaseTerm: RentalTerm;
  createdAt: Date;
  isNew: boolean;
}

export interface Application {
  id: string;
  renterId: string;
  propertyId: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'cancelled';
  message?: string;
  moveInDate?: Date;
  term: RentalTerm;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id: string;
  applicationId: string;
  content: string;
  renterSignature?: { name: string; timestamp: Date; ip: string };
  landlordSignature?: { name: string; timestamp: Date; ip: string };
  status: 'awaiting_renter' | 'awaiting_landlord' | 'executed' | 'expired';
  pdfUrl?: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  applicationId: string;
  amount: number;
  type: 'deposit' | 'rent';
  status: 'pending' | 'completed' | 'failed';
  receiptUrl?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  applicationId: string;
  body: string;
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type:
    | 'application_received'
    | 'status_change'
    | 'new_message'
    | 'contract_ready'
    | 'payment_success'
    | 'payment_failed'
    | 'contract_expiring'
    | 'payment_due';
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

export interface Flag {
  id: string;
  reporterId: string;
  targetType: 'user' | 'listing';
  targetId: string;
  reason: 'spam' | 'misleading' | 'inappropriate' | 'scam';
  status: 'open' | 'reviewed' | 'resolved';
  createdAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
}

export interface FilterState {
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType[];
  bedrooms?: number;
  bathrooms?: number;
  availableFrom?: string;
  rentalTerm?: RentalTerm;
  petFriendly?: boolean;
  furnished?: boolean;
  utilitiesIncluded?: boolean;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'relevant';
}

// ── Utilities ──

const POSTAL_CODE_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

export function validatePostalCode(code: string): boolean {
  return POSTAL_CODE_RE.test(code.trim());
}

export function formatPostalCode(code: string): string {
  const cleaned = code.replace(/\s|-/g, '').toUpperCase();
  return cleaned.length === 6 ? `${cleaned.slice(0, 3)} ${cleaned.slice(3)}` : code;
}

export function calculateMonthlyRate(
  prices: Record<RentalTerm, number>,
  term: RentalTerm
): number | null {
  return prices[term] ?? null;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function daysBetween(date1: Date, date2: Date): number {
  return Math.round(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}

export function applicationStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'under_review':
      return 'bg-blue-100 text-blue-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
