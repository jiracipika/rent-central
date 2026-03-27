// ── Database Types (generated from Supabase schema) ──

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          role: 'renter' | 'landlord' | 'admin';
          avatar: string | null;
          postal_code: string | null;
          city: string | null;
          province: string | null;
          phone: string | null;
          bio: string | null;
          preferred_contact: 'email' | 'phone' | 'in_app' | null;
          email_verified: boolean;
          phone_verified: boolean;
          id_verified: boolean;
          notifications_enabled: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>>;
      };
      properties: {
        Row: {
          id: string;
          landlord_id: string;
          title: string;
          description: string | null;
          type: 'house' | 'apartment' | 'condo' | 'basement' | 'townhouse' | 'studio';
          status: 'active' | 'paused' | 'rented' | 'draft';
          address: string;
          city: string;
          province: string;
          postal_code: string;
          lat: number | null;
          lng: number | null;
          bedrooms: number;
          bathrooms: number;
          square_footage: number | null;
          floor: number | null;
          price_3mo: number | null;
          price_6mo: number | null;
          price_12mo: number | null;
          deposit: number | null;
          utilities_included: boolean;
          parking_included: boolean;
          pet_friendly: boolean;
          furnished: boolean;
          amenities: Json;
          photos: Json;
          cover_photo: string | null;
          available_from: string | null;
          minimum_lease_term: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at'>>;
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookmarks']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['bookmarks']['Row'], 'id' | 'created_at'>>;
      };
      applications: {
        Row: {
          id: string;
          renter_id: string;
          property_id: string;
          status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'cancelled';
          message: string | null;
          move_in_date: string | null;
          term: 3 | 6 | 12;
          rejection_reason: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at'>>;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          application_id: string;
          body: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          message: string;
          read: boolean;
          link: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>>;
      };
    };
  };
}
