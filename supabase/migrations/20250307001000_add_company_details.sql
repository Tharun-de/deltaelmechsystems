/*
  # Add Company Details to Users Table
  
  1. Add new columns for company information
  2. Add address details
  3. Add contact details
  4. Add validations
  5. Add helpful indexes
*/

-- Add new columns to users table
ALTER TABLE users
  -- Company details
  ADD COLUMN IF NOT EXISTS company_name text,
  ADD COLUMN IF NOT EXISTS company_registration_number text,
  ADD COLUMN IF NOT EXISTS gst_number text,
  
  -- Contact details
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS alternate_phone text,
  ADD COLUMN IF NOT EXISTS contact_person text,
  
  -- Address details
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS postal_code text,
  ADD COLUMN IF NOT EXISTS country text DEFAULT 'India',
  
  -- Auth0 integration
  ADD COLUMN IF NOT EXISTS auth0_id text UNIQUE;

-- Add validations
ALTER TABLE users
  -- Phone number format validation
  ADD CONSTRAINT valid_phone 
    CHECK (phone IS NULL OR phone ~* '^\+?[0-9\s-\(\)]{8,}$'),
  
  -- Alternate phone format validation
  ADD CONSTRAINT valid_alternate_phone 
    CHECK (alternate_phone IS NULL OR alternate_phone ~* '^\+?[0-9\s-\(\)]{8,}$'),
  
  -- Postal code format validation (Indian PIN code)
  ADD CONSTRAINT valid_postal_code 
    CHECK (postal_code IS NULL OR postal_code ~* '^[1-9][0-9]{5}$'),
  
  -- GST number format validation (Indian GST)
  ADD CONSTRAINT valid_gst_number 
    CHECK (gst_number IS NULL OR gst_number ~* '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_company_name 
  ON users(company_name);
CREATE INDEX IF NOT EXISTS idx_users_city 
  ON users(city);
CREATE INDEX IF NOT EXISTS idx_users_auth0_id 
  ON users(auth0_id);