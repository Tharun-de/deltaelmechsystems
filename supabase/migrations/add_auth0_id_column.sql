-- Add auth0_id column to business_profiles table
ALTER TABLE business_profiles 
ADD COLUMN auth0_id VARCHAR(255) UNIQUE;

-- Update existing records if needed (optional)
UPDATE business_profiles 
SET auth0_id = auth_id 
WHERE auth0_id IS NULL AND auth_id IS NOT NULL;

-- Add an index for faster lookups
CREATE INDEX idx_business_profiles_auth0_id ON business_profiles(auth0_id);