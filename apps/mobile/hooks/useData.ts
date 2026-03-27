// ── React Hooks for Rent Central ──

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Property } from '@rent-central/core';

// Convert Supabase row to Property type
function supabasePropertyToProperty(row: any): Property {
  return {
    id: row.id,
    landlordId: row.landlord_id,
    title: row.title,
    description: row.description || '',
    type: row.type,
    status: row.status,
    address: row.address,
    city: row.city,
    province: row.province,
    postalCode: row.postal_code,
    lat: row.lat || 0,
    lng: row.lng || 0,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    squareFootage: row.square_footage || undefined,
    pricePerTerm: {
      3: row.price_3mo || 0,
      6: row.price_6mo || 0,
      12: row.price_12mo || 0,
    },
    deposit: row.deposit || 0,
    utilitiesIncluded: row.utilities_included,
    parkingIncluded: row.parking_included,
    petFriendly: row.pet_friendly,
    furnished: row.furnished,
    amenities: (row.amenities as string[]) || [],
    photos: (row.photos as string[]) || [],
    coverPhoto: row.cover_photo || '',
    availableFrom: new Date(row.available_from || Date.now()),
    minimumLeaseTerm: row.minimum_lease_term as any,
    createdAt: new Date(row.created_at),
    isNew: true, // Calculate based on created_at
  };
}

// Hook to fetch all active properties
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);

        // Check if Supabase is configured
        if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
          // Use mock data if Supabase not configured
          console.log('Supabase not configured, using mock data');
          return;
        }

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setProperties(data.map(supabasePropertyToProperty));
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return { properties, loading, error };
}

// Hook to fetch a single property by ID
export function useProperty(id: string | null) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProperty() {
      try {
        setLoading(true);
        setError(null);

        // Check if Supabase is configured
        if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
          console.log('Supabase not configured, using mock data');
          return;
        }

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id as any)
          .single();

        if (error) throw error;

        if (data) {
          setProperty(supabasePropertyToProperty(data));
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id]);

  return { property, loading, error };
}

// Hook to fetch user's bookmarks
export function useBookmarks(userId: string | null) {
  const [bookmarks, setBookmarks] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchBookmarks() {
      try {
        setLoading(true);

        // Check if Supabase is configured
        if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
          return;
        }

        const { data, error } = await supabase
          .from('bookmarks')
          .select('properties(*)')
          .eq('user_id', userId as any);

        if (error) throw error;

        if (data) {
          const properties = data
            .map((b: any) => b.properties)
            .filter((p: any): p is NonNullable<typeof p> => p !== null)
            .map(supabasePropertyToProperty);
          setBookmarks(properties);
        }
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarks();
  }, [userId]);

  return { bookmarks, loading };
}

// Hook to toggle bookmark
export function useToggleBookmark() {
  const [loading, setLoading] = useState(false);

  const toggleBookmark = async (userId: string, propertyId: string, isBookmarked: boolean) => {
    try {
      setLoading(true);

      if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
        // Mock action
        console.log('Toggle bookmark (mock):', { userId, propertyId, isBookmarked });
        return;
      }

      if (isBookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', userId)
          .eq('property_id', propertyId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({ user_id: userId, property_id: propertyId } as any);

        if (error) throw error;
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { toggleBookmark, loading };
}
