-- ============================================================================
-- Rent Central — Canadian Rental Marketplace
-- Supabase PostgreSQL Schema
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- Helper Functions
-- ============================================================================

/**
 * Automatically sets updated_at to now() on every row update.
 */
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. users
-- ============================================================================
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  email           TEXT NOT NULL UNIQUE,
  role            TEXT NOT NULL DEFAULT 'renter'
                  CHECK (role IN ('renter', 'landlord', 'admin')),
  avatar          TEXT,
  postal_code     TEXT
                  CHECK (postal_code IS NULL
                         OR postal_code ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
  city            TEXT,
  province        TEXT,
  phone           TEXT,
  bio             TEXT,
  preferred_contact TEXT
                  CHECK (preferred_contact IS NULL
                         OR preferred_contact IN ('email', 'phone', 'in_app')),
  email_verified  BOOLEAN NOT NULL DEFAULT false,
  phone_verified  BOOLEAN NOT NULL DEFAULT false,
  id_verified     BOOLEAN NOT NULL DEFAULT false,
  notifications_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ
);

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_users_email        ON users (email);
CREATE INDEX idx_users_role         ON users (role);
CREATE INDEX idx_users_postal_code  ON users (postal_code);
CREATE INDEX idx_users_city         ON users (city);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (needed for public listing views, messaging, etc.)
CREATE POLICY "Users: public read" ON users
  FOR SELECT USING (true);

-- Users can update only their own profile
CREATE POLICY "Users: update own" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Users: admin update" ON users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- 2. properties
-- ============================================================================
CREATE TABLE properties (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title              TEXT NOT NULL,
  description        TEXT,
  type               TEXT NOT NULL
                     CHECK (type IN ('house', 'apartment', 'condo', 'basement', 'townhouse', 'studio')),
  status             TEXT NOT NULL DEFAULT 'draft'
                     CHECK (status IN ('active', 'paused', 'rented', 'draft')),
  address            TEXT NOT NULL,
  city               TEXT NOT NULL,
  province           TEXT NOT NULL,
  postal_code        TEXT NOT NULL
                     CHECK (postal_code ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
  lat                NUMERIC(10, 8),
  lng                NUMERIC(11, 8),
  bedrooms           INTEGER NOT NULL,
  bathrooms          INTEGER NOT NULL,
  square_footage     INTEGER,
  floor              INTEGER,
  price_3mo          NUMERIC(10, 2),
  price_6mo          NUMERIC(10, 2),
  price_12mo         NUMERIC(10, 2),
  deposit            NUMERIC(10, 2),
  utilities_included BOOLEAN NOT NULL DEFAULT false,
  parking_included   BOOLEAN NOT NULL DEFAULT false,
  pet_friendly       BOOLEAN NOT NULL DEFAULT false,
  furnished          BOOLEAN NOT NULL DEFAULT false,
  amenities          JSONB NOT NULL DEFAULT '[]',
  photos             JSONB NOT NULL DEFAULT '[]',
  cover_photo        TEXT,
  available_from     DATE,
  minimum_lease_term INTEGER NOT NULL DEFAULT 12,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ
);

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_properties_landlord_id  ON properties (landlord_id);
CREATE INDEX idx_properties_status       ON properties (status);
CREATE INDEX idx_properties_city         ON properties (city);
CREATE INDEX idx_properties_postal_code  ON properties (postal_code);
CREATE INDEX idx_properties_lat_lng      ON properties (lat, lng);
CREATE INDEX idx_properties_created_at   ON properties (created_at);
CREATE INDEX idx_properties_type         ON properties (type);
CREATE INDEX idx_properties_price_12mo   ON properties (price_12mo);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Anyone can view active properties
CREATE POLICY "Properties: public read active" ON properties
  FOR SELECT USING (status = 'active');

-- Landlords can view their own properties (all statuses)
CREATE POLICY "Properties: landlord read own" ON properties
  FOR SELECT USING (auth.uid() = landlord_id);

-- Admins can view all properties
CREATE POLICY "Properties: admin read all" ON properties
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Landlords can insert their own properties
CREATE POLICY "Properties: landlord insert" ON properties
  FOR INSERT WITH CHECK (auth.uid() = landlord_id);

-- Landlords can update their own properties
CREATE POLICY "Properties: landlord update" ON properties
  FOR UPDATE USING (auth.uid() = landlord_id);

-- Admins can update any property
CREATE POLICY "Properties: admin update" ON properties
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Landlords can delete their own properties
CREATE POLICY "Properties: landlord delete" ON properties
  FOR DELETE USING (auth.uid() = landlord_id);

-- ============================================================================
-- 3. bookmarks
-- ============================================================================
CREATE TABLE bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, property_id)
);

CREATE INDEX idx_bookmarks_user_id     ON bookmarks (user_id);
CREATE INDEX idx_bookmarks_property_id ON bookmarks (property_id);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can read their own bookmarks
CREATE POLICY "Bookmarks: read own" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own bookmarks
CREATE POLICY "Bookmarks: insert own" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own bookmarks
CREATE POLICY "Bookmarks: delete own" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 4. applications
-- ============================================================================
CREATE TABLE applications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  renter_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id      UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  status           TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'cancelled')),
  message          TEXT,
  move_in_date     DATE,
  term             INTEGER NOT NULL CHECK (term IN (3, 6, 12)),
  rejection_reason TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ
);

CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_applications_renter_id    ON applications (renter_id);
CREATE INDEX idx_applications_property_id  ON applications (property_id);
CREATE INDEX idx_applications_status       ON applications (status);
CREATE INDEX idx_applications_created_at   ON applications (created_at);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Renters can read their own applications
CREATE POLICY "Applications: renter read own" ON applications
  FOR SELECT USING (auth.uid() = renter_id);

-- Landlords can read applications for their properties
CREATE POLICY "Applications: landlord read own" ON applications
  FOR SELECT USING (
    landlord_id IN (SELECT id FROM properties WHERE landlord_id = auth.uid())
  );

-- Admins can read all
CREATE POLICY "Applications: admin read all" ON applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Renters can create applications
CREATE POLICY "Applications: renter insert" ON applications
  FOR INSERT WITH CHECK (auth.uid() = renter_id);

-- Landlords can update applications on their properties (approve/reject)
CREATE POLICY "Applications: landlord update" ON applications
  FOR UPDATE USING (
    property_id IN (SELECT id FROM properties WHERE landlord_id = auth.uid())
  );

-- Renters can update/cancel their own applications
CREATE POLICY "Applications: renter update own" ON applications
  FOR UPDATE USING (auth.uid() = renter_id);

-- Admins can update any
CREATE POLICY "Applications: admin update" ON applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- 5. contracts
-- ============================================================================
CREATE TABLE contracts (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id         UUID NOT NULL UNIQUE REFERENCES applications(id) ON DELETE CASCADE,
  content                TEXT,
  renter_signature_name  TEXT,
  renter_signature_at    TIMESTAMPTZ,
  renter_signature_ip    TEXT,
  landlord_signature_name TEXT,
  landlord_signature_at  TIMESTAMPTZ,
  landlord_signature_ip  TEXT,
  status                 TEXT DEFAULT 'awaiting_renter'
                         CHECK (status IN ('awaiting_renter', 'awaiting_landlord', 'executed', 'expired')),
  pdf_url                TEXT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at             TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '7 days')
);

CREATE INDEX idx_contracts_application_id ON contracts (application_id);
CREATE INDEX idx_contracts_status         ON contracts (status);

ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- Participants can view contracts for their applications
CREATE POLICY "Contracts: participant read" ON contracts
  FOR SELECT USING (
    application_id IN (
      SELECT id FROM applications
      WHERE renter_id = auth.uid()
         OR property_id IN (SELECT id FROM properties WHERE landlord_id = auth.uid())
    )
  );

-- Admins can read all
CREATE POLICY "Contracts: admin read" ON contracts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Landlords can create contracts for their property applications
CREATE POLICY "Contracts: landlord insert" ON contracts
  FOR INSERT WITH CHECK (
    application_id IN (
      SELECT id FROM applications
      WHERE property_id IN (SELECT id FROM properties WHERE landlord_id = auth.uid())
    )
  );

-- Participants can update contracts
CREATE POLICY "Contracts: participant update" ON contracts
  FOR UPDATE USING (
    application_id IN (
      SELECT id FROM applications
      WHERE renter_id = auth.uid()
         OR property_id IN (SELECT id FROM properties WHERE landlord_id = auth.uid())
    )
  );

-- ============================================================================
-- 6. payments
-- ============================================================================
CREATE TABLE payments (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id           UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  amount                   NUMERIC(10, 2) NOT NULL,
  type                     TEXT NOT NULL CHECK (type IN ('deposit', 'rent')),
  status                   TEXT NOT NULL DEFAULT 'pending'
                           CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_payment_intent_id TEXT,
  receipt_url              TEXT,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_application_id ON payments (application_id);
CREATE INDEX idx_payments_status         ON payments (status);
CREATE INDEX idx_payments_created_at     ON payments (created_at);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Participants can read payments for their applications
CREATE POLICY "Payments: participant read" ON payments
  FOR SELECT USING (
    application_id IN (
      SELECT id FROM applications
      WHERE renter_id = auth.uid()
         OR property_id IN (SELECT id FROM properties WHERE landlord_id = auth.uid())
    )
  );

-- Admins can read all
CREATE POLICY "Payments: admin read" ON payments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- 7. messages
-- ============================================================================
CREATE TABLE messages (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  body           TEXT NOT NULL,
  read           BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_sender_id      ON messages (sender_id);
CREATE INDEX idx_messages_receiver_id    ON messages (receiver_id);
CREATE INDEX idx_messages_application_id ON messages (application_id);
CREATE INDEX idx_messages_created_at     ON messages (created_at);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Senders and receivers can read their messages
CREATE POLICY "Messages: participant read" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

-- Users can send messages (sender must be auth'd user)
CREATE POLICY "Messages: send" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Receivers can mark messages as read
CREATE POLICY "Messages: receiver update" ON messages
  FOR UPDATE USING (receiver_id = auth.uid());

-- ============================================================================
-- 8. notifications
-- ============================================================================
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  message    TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT false,
  link       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_id    ON notifications (user_id);
CREATE INDEX idx_notifications_read       ON notifications (user_id, read);
CREATE INDEX idx_notifications_created_at ON notifications (created_at);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own notifications
CREATE POLICY "Notifications: read own" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Notifications: update own" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- 9. flags
-- ============================================================================
CREATE TABLE flags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('user', 'listing')),
  target_id   UUID NOT NULL,
  reason      TEXT NOT NULL CHECK (reason IN ('spam', 'misleading', 'inappropriate', 'scam')),
  status      TEXT NOT NULL DEFAULT 'open'
              CHECK (status IN ('open', 'reviewed', 'resolved')),
  admin_note  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ
);

CREATE TRIGGER flags_updated_at
  BEFORE UPDATE ON flags
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_flags_reporter_id  ON flags (reporter_id);
CREATE INDEX idx_flags_target       ON flags (target_type, target_id);
CREATE INDEX idx_flags_status       ON flags (status);
CREATE INDEX idx_flags_created_at   ON flags (created_at);

ALTER TABLE flags ENABLE ROW LEVEL SECURITY;

-- Users can insert flags
CREATE POLICY "Flags: insert" ON flags
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Admins can read all flags
CREATE POLICY "Flags: admin read" ON flags
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update flags (review, resolve)
CREATE POLICY "Flags: admin update" ON flags
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
