# Rent Central Mobile App

A React Native (Expo) mobile app for the Canadian rental marketplace, featuring an Apple-inspired dainty design.

## Tech Stack

- **Framework**: React Native via Expo Router
- **Language**: TypeScript
- **Styling**: Custom design system with Apple HIG tokens
- **State Management**: React Hooks
- **Database**: Supabase (PostgreSQL with RLS)
- **Icons**: Ionicons (@expo/vector-icons)

## Features

### Tab Screens

1. **Home** (`app/(tabs)/index.tsx`)
   - Featured listings carousel
   - Nearby properties
   - Quick city navigation
   - Search bar integration

2. **Search** (`app/(tabs)/search.tsx`)
   - Full-text search
   - Filters: property type, bedrooms, pet-friendly
   - Sort: newest, price ascending/descending
   - Real-time filtering

3. **Saved** (`app/(tabs)/bookmarks.tsx`)
   - Saved property listings
   - Remove bookmarks
   - Empty state

4. **Messages** (`app/(tabs)/messages.tsx`)
   - Conversation list
   - Online status indicators
   - Unread message badges
   - Last message preview

5. **Profile** (`app/(tabs)/profile.tsx`)
   - User avatar and info
   - Verification badges (email, phone, ID)
   - Quick stats
   - Menu sections: rentals, account, support

### Detail Screens

6. **Listing Detail** (`app/listing/[id].tsx`)
   - Property photos (emoji placeholders)
   - Pricing by lease term (3/6/12 months)
   - Quick stats (beds, baths, sqft, type)
   - Full description
   - Features & amenities
   - Available date
   - Landlord card
   - Apply and chat CTAs

7. **Chat** (`app/chat/[id].tsx`)
   - Message thread
   - Sender/receiver bubbles
   - Timestamps
   - Real-time messaging UI
   - Input with character limit

8. **Notifications** (`app/notifications.tsx`)
   - Notification list
   - Unread indicators
   - Icon-based categories
   - Time stamps

9. **Apply** (`app/listing/apply.tsx`)
   - 4-step wizard: Personal, Employment, References, Review
   - Progress indicator
   - Lease term selection
   - Income details
   - References
   - Summary review

### Landlord Screens

10. **Landlord Dashboard** (`app/landlord/dashboard.tsx`)
    - Stats grid: active listings, applications, occupied, revenue
    - Quick actions: create listing, view listings, view applications

11. **Landlord Listings** (`app/landlord/listings.tsx`)
    - Property list with status badges
    - Application counts
    - Price display
    - Floating add button

12. **Create Listing** (`app/landlord/create-listing.tsx`)
    - 4-step wizard: Details, Location, Pricing, Features
    - Property type selection
    - Address, city, postal code
    - Pricing for 3/6/12 month terms
    - Feature toggles

### Auth Screens

13. **Sign In** (`app/auth/sign-in.tsx`)
    - Email/password form
    - Link to sign up

14. **Sign Up** (`app/auth/sign-up.tsx`)
    - First name, last name, email, password
    - Link to sign in

## Design System

### Theme (`lib/theme.ts`)

- **Colors**: Apple HIG compliant palette with brand primary (#007AFF)
- **Typography**: SF Pro-style scale (largeTitle through caption2)
- **Spacing**: Consistent scale from xs (4px) to xxxl (64px)
- **Radius**: xs (6px) through full (9999px)
- **Shadows**: sm, md, lg, xl with appropriate elevation
- **Animations**: Spring and timing presets

### Components

- `ListingCard`: Property card with image, price, details, badges
- `SearchBar`: Search input with icon
- `StatusBadge`: Status indicator (active, paused, rented, draft)
- `TabIcon`: Tab bar icons with filled/outline states

## Canadian Data

### `lib/canadian-data.ts`

- **Provinces**: All 13 provinces/territories with major cities
- **Cities**: Major Canadian cities with emoji icons
- **Property Types**: House, apartment, condo, townhouse, studio, basement
- **Price Ranges**: CAD-denominated ranges from <$1,000 to $4,000+
- **Bedroom/Bathroom Options**: Studio to 4+ bedrooms, 1-2.5+ bathrooms
- **Rental Terms**: 3, 6, 12 months
- **Amenities**: 15 common amenities with emoji icons
- **Application Statuses**: Pending, under review, approved, rejected, cancelled

## Data Layer

### Supabase Integration

- **Client**: `lib/supabase.ts`
- **Types**: `lib/database.types.ts` (generated from schema)
- **Hooks**: `hooks/useData.ts`
  - `useProperties()`: Fetch all active properties
  - `useProperty(id)`: Fetch single property
  - `useBookmarks(userId)`: Fetch user's bookmarks
  - `useToggleBookmark()`: Toggle bookmark state

### Database Schema (9 tables)

1. **users**: User profiles with verification status
2. **properties**: Listings with full details
3. **bookmarks**: User-saved properties
4. **applications**: Rental applications
5. **messages**: In-app messaging
6. **notifications**: User notifications
7. **contracts**: Lease agreements
8. **payments**: Payment history
9. **flags**: Content moderation

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run typecheck

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Key Features Implemented

✅ All 14 screens fully functional
✅ Apple-like dainty design
✅ Clean, minimal UI with whitespace
✅ Subtle gradients and rounded corners
✅ Frosted glass effects (blur on iOS)
✅ Smooth transitions and animations
✅ Supabase integration with RLS
✅ Canadian provinces and cities
✅ CAD pricing and postal codes
✅ TypeScript type safety
✅ Mock data for development

## Future Enhancements

- [ ] Real image upload
- [ ] Map view integration
- [ ] Push notifications
- [ ] Biometric auth
- [ ] Dark mode
- [ ] Multi-language support (English/French)
- [ ] Real-time messaging
- [ ] Payment processing (Stripe)
- [ ] Digital signature capture
