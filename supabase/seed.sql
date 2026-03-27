-- ============================================================================
-- Rent Central — Seed Data
-- Realistic Canadian mock data
-- ============================================================================

-- ============================================================================
-- Users: 3 landlords, 5 renters, 1 admin
-- ============================================================================
INSERT INTO users (id, first_name, last_name, email, role, postal_code, city, province, phone, bio, preferred_contact, email_verified, phone_verified, id_verified) VALUES

-- Landlords
('a0000001-0000-4000-8000-000000000001', 'Priya', 'Sharma', 'priya.sharma@email.com', 'landlord', 'M5V 2L4', 'Toronto', 'ON', '+1 416-555-0101',
 'Experienced landlord with 8+ years managing properties in downtown Toronto. Responsive and easy to work with.', 'email', true, true, true),

('a0000001-0000-4000-8000-000000000002', 'Marc', 'Tremblay', 'marc.tremblay@email.com', 'landlord', 'H2X 1A4', 'Montreal', 'QC', '+1 514-555-0102',
 'Montreal-based property investor. All units recently renovated. Pets considered case by case.', 'phone', true, true, true),

('a0000001-0000-4000-8000-000000000003', 'Sarah', 'Chen', 'sarah.chen@email.com', 'landlord', 'V6B 1A1', 'Vancouver', 'BC', '+1 604-555-0103',
 'Property manager in beautiful Vancouver. I pride myself on maintaining well-kept, comfortable spaces.', 'in_app', true, true, true),

-- Renters
('a0000001-0000-4000-8000-000000000010', 'James', 'O''Brien', 'james.obrien@email.com', 'renter', 'T2P 1J9', 'Calgary', 'AB', '+1 403-555-0110',
 'Software developer relocating from Halifax. Looking for a pet-friendly place near downtown.', 'email', true, true, false),

('a0000001-0000-4000-8000-000000000011', 'Aisha', 'Mohammed', 'aisha.mohammed@email.com', 'renter', 'M5V 3K2', 'Toronto', 'ON', '+1 416-555-0111',
 'Grad student at U of T. Need a quiet studio or 1-bed near campus. Non-smoker, no pets.', 'email', true, false, false),

('a0000001-0000-4000-8000-000000000012', 'Liam', 'Campbell', 'liam.campbell@email.com', 'renter', 'V6B 2M3', 'Vancouver', 'BC', '+1 604-555-0112',
 'Moving to Van for a new tech role. Looking for modern, furnished digs for a 6-month lease to start.', 'in_app', true, true, false),

('a0000001-0000-4000-8000-000000000013', 'Émilie', 'Bernard', 'emilie.bernard@email.com', 'renter', 'H2X 3Y5', 'Montreal', 'QC', '+1 514-555-0113',
 'Graphic designer, fluent in French and English. Seeking a creative, bright space with character.', 'phone', true, true, true),

('a0000001-0000-4000-8000-000000000014', 'Devon', 'Williams', 'devon.williams@email.com', 'renter', 'T2P 4K1', 'Calgary', 'AB', '+1 403-555-0114',
 'Oil & gas analyst. Need a 3-bedroom for my partner and our dog. Flexible on move-in date.', 'email', true, false, false),

-- Admin
('a0000001-0000-4000-8000-000000000020', 'Admin', 'User', 'admin@rentcentral.ca', 'admin', 'M5H 2N2', 'Toronto', 'ON', '+1 416-555-0120',
 'Rent Central platform administrator.', 'email', true, true, true);


-- ============================================================================
-- Properties: 10 across Toronto, Vancouver, Montreal, Calgary
-- ============================================================================
INSERT INTO properties (id, landlord_id, title, description, type, status, address, city, province, postal_code, lat, lng, bedrooms, bathrooms, square_footage, floor, price_3mo, price_6mo, price_12mo, deposit, utilities_included, parking_included, pet_friendly, furnished, amenities, available_from, minimum_lease_term) VALUES

-- Toronto (M5V) — Landlord Priya
('b0000001-0000-4000-8000-000000000001', 'a0000001-0000-4000-8000-000000000001',
 'Spacious 2-Bed Condo with Lake Views', 'Stunning condo in CityPlace with unobstructed lake views. Open-concept kitchen with quartz countertops, in-suite laundry, and floor-to-ceiling windows. Steps from the waterfront trail, King West restaurants, and transit.', 'condo', 'active',
 '33 Bay St, Unit 1205', 'Toronto', 'ON', 'M5V 2L4', 43.63820000, -79.38320000,
 2, 2, 850, 12, 2800.00, 2650.00, 2500.00, 2500.00, false, true, false, false,
 '["In-suite laundry", "Concierge", "Gym", "Pool", "Balcony"]', '2026-04-15', 12),

('b0000001-0000-4000-8000-000000000002', 'a0000001-0000-4000-8000-000000000001',
 'Modern Studio in the Heart of King West', 'Bright, updated studio with stainless steel appliances and hardwood floors. Perfect for a young professional. Walk to everything — restaurants, nightlife, and two subway lines.', 'studio', 'active',
 '580 King St W, Unit 401', 'Toronto', 'ON', 'M5V 1H3', 43.64540000, -79.39290000,
 0, 1, 450, 4, 1800.00, 1700.00, 1600.00, 1600.00, false, false, false, true,
 '["Hardwood floors", "AC", "Gym access"]', '2026-05-01', 6),

('b0000001-0000-4000-8000-000000000003', 'a0000001-0000-4000-8000-000000000001',
 'Charming Victorian Semi in Little Italy', 'Classic Toronto semi-detached with original woodwork, exposed brick, and a private backyard. Recently updated kitchen and bathroom. Quiet residential street but steps from College St boutiques.', 'house', 'active',
 '24 Grace St', 'Toronto', 'ON', 'M6J 1C6', 43.65400000, -79.41200000,
 3, 2, 1400, NULL, 3200.00, 3000.00, 2800.00, 2800.00, false, false, true, false,
 '["Backyard", "Patio", "Storage", "Laundry"]', '2026-06-01', 12),

-- Vancouver (V6B) — Landlord Sarah
('b0000001-0000-4000-8000-000000000004', 'a0000001-0000-4000-8000-000000000003',
 'Yaletown Luxury 1-Bed', 'Sleek one-bedroom in a premier Yaletown building. Floor-to-ceiling windows with mountain views, high-end finishes, spa-like bathroom. Two blocks to the seawall and David Lam Park.', 'condo', 'active',
 '1089 Seymour St, Unit 1808', 'Vancouver', 'BC', 'V6B 3M5', 49.27880000, -123.12420000,
 1, 1, 620, 18, 2400.00, 2300.00, 2200.00, 2200.00, true, true, false, false,
 '["Concierge", "Gym", "Hot tub", "Guest suite", "Bike storage"]', '2026-04-01', 12),

('b0000001-0000-4000-8000-000000000005', 'a0000001-0000-4000-8000-000000000003',
 'Gastown Character Loft', 'Industrial-chic loft in a converted heritage building. Exposed brick, soaring 14ft ceilings, and massive windows. Ideal for creative professionals. Top-floor unit with a private rooftop terrace.', 'apartment', 'active',
 '56 Water St, Unit 601', 'Vancouver', 'BC', 'V6B 1A1', 49.28430000, -123.10880000,
 1, 1, 780, 6, 2200.00, 2100.00, 1950.00, 1950.00, false, false, true, true,
 '["Exposed brick", "High ceilings", "Rooftop terrace", "In-suite laundry"]', '2026-05-15', 6),

('b0000001-0000-4000-8000-000000000006', 'a0000001-0000-4000-8000-000000000003',
 'Kitsilano Bright Basement Suite', 'Self-contained garden-level suite with separate entrance in a character home. One block to Kits Beach. In-suite kitchenette, shared laundry. Beautiful natural light.', 'basement', 'active',
 '1872 W 3rd Ave', 'Vancouver', 'BC', 'V6K 1L2', 49.26900000, -123.15500000,
 1, 1, 520, NULL, 1500.00, 1400.00, 1300.00, 1300.00, false, false, true, false,
 '["Separate entrance", "Shared laundry", "Close to beach", "Garden access"]', '2026-04-15', 12),

-- Montreal (H2X) — Landlord Marc
('b0000001-0000-4000-8000-000000000007', 'a0000001-0000-4000-8000-000000000002',
 'Plateau Mont-Royal 4½ on Tree-Lined Street', 'Classic Montreal "4½" in a walk-up on a gorgeous tree-lined street. Renovated kitchen, working wood-burning fireplace, and generous storage (pronos). Close to Mont-Royal Ave shops.', 'apartment', 'active',
 '4121 Rue Saint-Denis, Apt 3', 'Montreal', 'QC', 'H2X 1A4', 45.52000000, -73.58000000,
 2, 1, 900, 3, 1700.00, 1600.00, 1500.00, 1500.00, false, false, false, false,
 '["Fireplace", "Stove/fridge", "Hardwood floors", "Pronos storage"]', '2026-07-01', 12),

('b0000001-0000-4000-8000-000000000008', 'a0000001-0000-4000-8000-000000000002',
 'Griffintown Modern Townhouse', 'Brand-new construction townhouse with rooftop terrace and integrated garage. Open-concept main floor, two bedrooms up, finished basement. Walking distance to the Canal Lachine and Atwater Market.', 'townhouse', 'active',
 '1425 Rue des Bassins', 'Montreal', 'QC', 'H3C 0J1', 45.48500000, -73.55500000,
 2, 2, 1500, NULL, 2500.00, 2350.00, 2200.00, 2200.00, false, true, true, true,
 '["Rooftop terrace", "Garage", "AC", "In-suite laundry", "Smart home"]', '2026-05-01', 12),

-- Calgary (T2P) — mix of landlords
('b0000001-0000-4000-8000-000000000009', 'a0000001-0000-4000-8000-000000000001',
 'Downtown Calgary Executive 2-Bed', 'Premium unit in a newly built tower in the East Village. Panoramic views of the Rockies and Bow River. Chef''s kitchen, spa bathroom, heated underground parking.', 'apartment', 'active',
 '58 Riverfront Ave SE, Unit 2201', 'Calgary', 'AB', 'T2P 1J9', 51.04470000, -114.06200000,
 2, 2, 950, 22, 2000.00, 1900.00, 1800.00, 1800.00, true, true, false, true,
 '["Heated parking", "Gym", "Party room", "Concierge", "Heated towel rack"]', '2026-04-01', 6),

('b0000001-0000-4000-8000-000000000010', 'a0000001-0000-4000-8000-000000000002',
 'Inglewood Family Home with Big Backyard', 'Three-bedroom bungalow on a quiet street in Calgary''s trendiest neighbourhood. Fully fenced backyard, updated kitchen, finished basement with rec room. Great for families.', 'house', 'active',
 '1021 14 St SE', 'Calgary', 'AB', 'T2G 3M3', 51.04200000, -114.03500000,
 3, 1, 1300, NULL, 2100.00, 1950.00, 1800.00, 1800.00, false, true, true, false,
 '["Backyard", "Front porch", "Storage shed", "AC", "Near river pathways"]', '2026-06-15', 12);


-- ============================================================================
-- Bookmarks
-- ============================================================================
INSERT INTO bookmarks (user_id, property_id) VALUES
('a0000001-0000-4000-8000-000000000010', 'b0000001-0000-4000-8000-000000000009'),  -- Devon bookmarked Calgary apt
('a0000001-0000-4000-8000-000000000010', 'b0000001-0000-4000-8000-000000000010'),  -- Devon bookmarked Inglewood house
('a0000001-0000-4000-8000-000000000011', 'b0000001-0000-4000-8000-000000000001'),  -- Aisha bookmarked lake-view condo
('a0000001-0000-4000-8000-000000000012', 'b0000001-0000-4000-8000-000000000004'),  -- Liam bookmarked Yaletown
('a0000001-0000-4000-8000-000000000012', 'b0000001-0000-4000-8000-000000000005'),  -- Liam bookmarked Gastown loft
('a0000001-0000-4000-8000-000000000013', 'b0000001-0000-4000-8000-000000000007');  -- Émilie bookmarked Plateau


-- ============================================================================
-- Applications
-- ============================================================================
INSERT INTO applications (id, renter_id, property_id, status, message, move_in_date, term) VALUES

-- 1: Approved — Liam → Yaletown condo (12mo)
('c0000001-0000-4000-8000-000000000001',
 'a0000001-0000-4000-8000-000000000012', 'b0000001-0000-4000-8000-000000000004',
 'approved',
 'Hi! I''m relocating to Vancouver for a software engineering role at a downtown startup. Stable income, no pets, clean and quiet. Would love to make this my new home.', '2026-05-01', 12),

-- 2: Under review — Devon → Inglewood house (12mo)
('c0000001-0000-4000-8000-000000000002',
 'a0000001-0000-4000-8000-000000000010', 'b0000001-0000-4000-8000-000000000010',
 'under_review',
 'My partner and I are looking for a family-friendly home with a yard for our golden retriever. I work in the energy sector with a stable salary. Flexible on move-in.', '2026-07-01', 12),

-- 3: Pending — Aisha → King West studio (6mo)
('c0000001-0000-4000-8000-000000000003',
 'a0000001-0000-4000-8000-000000000011', 'b0000001-0000-4000-8000-000000000002',
 'pending',
 'Hello! I''m a graduate student at the University of Toronto starting in September  Looking for a short-term furnished place while I search for something longer-term. Responsible, tidy, and respectful of shared spaces.', '2026-05-01', 6),

-- 4: Rejected — James → Downtown Calgary apt (reason: pets not allowed)
('c0000001-0000-4000-8000-000000000004',
 'a0000001-0000-4000-8000-000000000010', 'b0000001-0000-4000-8000-000000000009',
 'rejected',
 'Moving from Halifax for a new role. Have a well-trained cat named Beans who is fully vaccinated and quiet. Happy to pay a pet deposit.', '2026-04-15', 12),
-- rejection_reason set below

-- 5: Cancelled — Émilie → Plateau apartment
('c0000001-0000-4000-8000-000000000005',
 'a0000001-0000-4000-8000-000000000013', 'b0000001-0000-4000-8000-000000000007',
 'cancelled',
 'Bonjour ! J''adore cet appartement mais j''ai trouvé un autre logement plus proche de mon nouveau bureau. Merci !', '2026-07-01', 12);

UPDATE applications SET rejection_reason = 'Unfortunately, this building does not allow pets. We wish you the best in your search.' WHERE id = 'c0000001-0000-4000-8000-000000000004';


-- ============================================================================
-- Contracts: 1 executed, 1 pending
-- ============================================================================
INSERT INTO contracts (id, application_id, content, renter_signature_name, renter_signature_at, renter_signature_ip, landlord_signature_name, landlord_signature_at, landlord_signature_ip, status, pdf_url) VALUES

-- Executed contract for Liam's approved Yaletown application
('d0000001-0000-4000-8000-000000000001',
 'c0000001-0000-4000-8000-000000000001',
 'RESIDENTIAL TENANCY AGREEMENT

Landlord: Sarah Chen
Renter: Liam Campbell
Property: 1089 Seymour St, Unit 1808, Vancouver BC V6B 3M5

Term: 12 months, commencing May 1, 2026
Monthly Rent: $2,200.00 CAD
Security Deposit: $2,200.00 CAD
Utilities: Included

Both parties agree to the terms outlined in this Residential Tenancy Agreement in accordance with the British Columbia Residential Tenancy Act.',
 'Liam Campbell', '2026-03-25 14:30:00-07', '192.168.1.42',
 'Sarah Chen', '2026-03-25 16:45:00-07', '192.168.1.10',
 'executed', '/contracts/yaletown-1808-2026.pdf'),

-- Pending contract awaiting landlord signature for Devon's under-review application
('d0000001-0000-4000-8000-000000000002',
 'c0000001-0000-4000-8000-000000000002',
 'RESIDENTIAL TENANCY AGREEMENT

Landlord: Marc Tremblay
Renter: Devon Williams
Property: 1021 14 St SE, Calgary AB T2G 3M3

Term: 12 months, commencing July 1, 2026
Monthly Rent: $1,800.00 CAD
Security Deposit: $1,800.00 CAD
Utilities: Not included

Both parties agree to the terms outlined in this Residential Tenancy Agreement in accordance with the Alberta Residential Tenancies Act.',
 'Devon Williams', '2026-03-26 10:15:00-06', '10.0.0.55',
 NULL, NULL, NULL,
 'awaiting_landlord', NULL);


-- ============================================================================
-- Payments
-- ============================================================================
INSERT INTO payments (id, application_id, amount, type, status, stripe_payment_intent_id, receipt_url) VALUES

-- Deposit payment for Liam's executed contract
('e0000001-0000-4000-8000-000000000001',
 'c0000001-0000-4000-8000-000000000001',
 2200.00, 'deposit', 'completed',
 'pi_3abc123def456', '/receipts/deposit-campbell-2026.pdf'),

-- First month rent for Liam
('e0000001-0000-4000-8000-000000000002',
 'c0000001-0000-4000-8000-000000000001',
 2200.00, 'rent', 'pending',
 'pi_3ghi789jkl012', NULL);


-- ============================================================================
-- Messages
-- ============================================================================
INSERT INTO messages (id, sender_id, receiver_id, application_id, body, read, created_at) VALUES

-- Conversation between Liam and Sarah (Yaletown)
('f0000001-0000-4000-8000-000000000001',
 'a0000001-0000-4000-8000-000000000012', 'a0000001-0000-4000-8000-000000000003',
 'c0000001-0000-4000-8000-000000000001',
 'Hi Sarah! I just submitted my application for the Yaletown unit. Very excited about it — the mountain views sold me. Let me know if you need any additional info!', true,
 '2026-03-20 09:00:00-07'),

('f0000001-0000-4000-8000-000000000002',
 'a0000001-0000-4000-8000-000000000003', 'a0000001-0000-4000-8000-000000000012',
 'c0000001-0000-4000-8000-000000000001',
 'Hi Liam! Thanks for applying. Your profile looks great. I just approved your application — you should see the contract in your dashboard. Feel free to sign when ready!', true,
 '2026-03-24 11:30:00-07'),

('f0000001-0000-4000-8000-000000000003',
 'a0000001-0000-4000-8000-000000000012', 'a0000001-0000-4000-8000-000000000003',
 'c0000001-0000-4000-8000-000000000001',
 'Amazing, thanks Sarah! Just signed the contract. Quick question — is there a move-in checklist or anything I should know before May 1st?', false,
 '2026-03-25 15:00:00-07'),

-- Conversation between Devon and Marc (Inglewood)
('f0000001-0000-4000-8000-000000000004',
 'a0000001-0000-4000-8000-000000000010', 'a0000001-0000-4000-8000-000000000002',
 'c0000001-0000-4000-8000-000000000002',
 'Hi Marc, thanks for reviewing my application! Is the backyard fully fenced? My dog is very well-behaved but I want to make sure.', true,
 '2026-03-25 14:00:00-06'),

('f0000001-0000-4000-8000-000000000005',
 'a0000001-0000-4000-8000-000000000002', 'a0000001-0000-4000-8000-000000000010',
 'c0000001-0000-4000-8000-000000000002',
 'Hi Devon! Yes, the backyard is fully fenced — 6ft cedar. I''ve sent over the draft contract for your review. Let me know if you have questions.', false,
 '2026-03-26 08:30:00-06'),

-- Conversation between James and Priya (rejected Calgary apt)
('f0000001-0000-4000-8000-000000000006',
 'a0000001-0000-4000-8000-000000000010', 'a0000001-0000-4000-8000-000000000001',
 'c0000001-0000-4000-8000-000000000004',
 'Hi Priya, I noticed my application was rejected due to the no-pet policy. Is there any flexibility with a pet deposit or additional references? Beans is very quiet.', false,
 '2026-03-26 16:00:00-06');


-- ============================================================================
-- Notifications
-- ============================================================================
INSERT INTO notifications (id, user_id, type, message, read, link) VALUES

-- Liam's notifications
('g0000001-0000-4000-8000-000000000001',
 'a0000001-0000-4000-8000-000000000012', 'application_approved',
 'Your application for "Yaletown Luxury 1-Bed" has been approved!', true,
 '/applications/c0000001-0000-4000-8000-000000000001'),

('g0000001-0000-4000-8000-000000000002',
 'a0000001-0000-4000-8000-000000000012', 'contract_ready',
 'A contract has been prepared for your Yaletown rental. Please review and sign.', true,
 '/contracts/d0000001-0000-4000-8000-000000000001'),

('g0000001-0000-4000-8000-000000000003',
 'a0000001-0000-4000-8000-000000000012', 'new_message',
 'Sarah Chen sent you a message about "Yaletown Luxury 1-Bed".', false,
 '/messages?application=c0000001-0000-4000-8000-000000000001'),

-- Devon's notifications
('g0000001-0000-4000-8000-000000000004',
 'a0000001-0000-4000-8000-000000000010', 'application_rejected',
 'Your application for "Downtown Calgary Executive 2-Bed" was not approved. Reason: pet policy.', true,
 '/applications/c0000001-0000-4000-8000-000000000004'),

('g0000001-0000-4000-8000-000000000005',
 'a0000001-0000-4000-8000-000000000010', 'contract_ready',
 'A contract has been prepared for "Inglewood Family Home". The landlord still needs to sign.', false,
 '/contracts/d0000001-0000-4000-8000-000000000002'),

-- Sarah's notifications (landlord)
('g0000001-0000-4000-8000-000000000006',
 'a0000001-0000-4000-8000-000000000003', 'new_application',
 'Liam Campbell applied for "Yaletown Luxury 1-Bed".', true,
 '/applications/c0000001-0000-4000-8000-000000000001'),

('g0000001-0000-4000-8000-000000000007',
 'a0000001-0000-4000-8000-000000000003', 'contract_signed',
 'Liam Campbell signed the contract for "Yaletown Luxury 1-Bed". Your signature is requested.', true,
 '/contracts/d0000001-0000-4000-8000-000000000001'),

-- Marc's notifications (landlord)
('g0000001-0000-4000-8000-000000000008',
 'a0000001-0000-4000-8000-000000000002', 'new_application',
 'Devon Williams applied for "Inglewood Family Home with Big Backyard".', true,
 '/applications/c0000001-0000-4000-8000-000000000002'),

-- Priya's notifications (landlord)
('g0000001-0000-4000-8000-000000000009',
 'a0000001-0000-4000-8000-000000000001', 'new_application',
 'James O''Brien applied for "Downtown Calgary Executive 2-Bed".', true,
 '/applications/c0000001-0000-4000-8000-000000000004');

-- ============================================================================
-- Flags (optional — one sample)
-- ============================================================================
INSERT INTO flags (reporter_id, target_type, target_id, reason, status, admin_note) VALUES
('a0000001-0000-4000-8000-000000000013', 'listing', 'b0000001-0000-4000-8000-000000000006',
 'misleading', 'reviewed', 'Photos checked — listing is accurate. Kits basement is exactly as described.');
