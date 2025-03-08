/*
  Initial Business Schema Setup
  1. Create business_profiles for company information
  2. Create projects table
  3. Set up basic relationships
*/

-- Create enum types for static values
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'client', 'site_supervisor');
CREATE TYPE project_type AS ENUM ('it_building', 'house', 'school', 'commercial', 'other');
CREATE TYPE project_status AS ENUM ('planning', 'in-progress', 'completed', 'on-hold', 'cancelled');
CREATE TYPE construction_phase AS ENUM (
  'planning',
  'foundation',
  'structure',
  'walls',
  'plumbing',
  'electrical',
  'finishing',
  'completed'
);

-- Create business_profiles table
CREATE TABLE IF NOT EXISTS business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id),
  role user_role NOT NULL DEFAULT 'client',
  
  -- Business Details
  company_name text NOT NULL,
  company_registration_number text,
  gst_number text,
  
  -- Contact Details
  contact_person_name text NOT NULL,
  email text NOT NULL,
  phone text,
  alternate_phone text,
  
  -- Address
  address text,
  city text,
  state text,
  postal_code text,
  country text DEFAULT 'India',
  
  -- Metadata
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (phone IS NULL OR length(phone) >= 10),
  CONSTRAINT valid_postal_code CHECK (postal_code IS NULL OR length(postal_code) = 6)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Details
  title text NOT NULL,
  description text,
  project_type project_type NOT NULL,
  status project_status NOT NULL DEFAULT 'planning',
  current_phase construction_phase NOT NULL DEFAULT 'planning',
  
  -- Relationships
  client_id uuid REFERENCES business_profiles(id),
  project_manager_id uuid REFERENCES business_profiles(id),
  site_supervisor_id uuid REFERENCES business_profiles(id),
  
  -- Location
  site_address text NOT NULL,
  site_city text NOT NULL,
  site_state text NOT NULL,
  site_postal_code text,
  
  -- Metrics
  plot_area numeric,
  built_up_area numeric,
  number_of_floors integer,
  completion_percentage integer DEFAULT 0,
  
  -- Timeline
  start_date timestamptz NOT NULL,
  estimated_end_date timestamptz,
  actual_end_date timestamptz,
  
  -- Financial
  estimated_budget numeric NOT NULL,
  actual_cost numeric DEFAULT 0,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_completion_percentage CHECK (completion_percentage BETWEEN 0 AND 100),
  CONSTRAINT valid_budget CHECK (estimated_budget > 0),
  CONSTRAINT valid_site_postal CHECK (site_postal_code IS NULL OR length(site_postal_code) = 6)
);

-- Enable RLS (Row Level Security)
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX idx_business_profiles_auth_user_id ON business_profiles(auth_user_id);
CREATE INDEX idx_business_profiles_role ON business_profiles(role);
CREATE INDEX idx_business_profiles_company_name ON business_profiles(company_name);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_current_phase ON projects(current_phase);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_business_profiles_updated_at
  BEFORE UPDATE ON business_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies

-- Business Profiles policies
CREATE POLICY "Users can view their own business profile"
  ON business_profiles
  FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

CREATE POLICY "Admins can view all business profiles"
  ON business_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE auth_user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Projects policies
CREATE POLICY "Users can view their associated projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (
    client_id IN (
      SELECT id FROM business_profiles
      WHERE auth_user_id = auth.uid()
    )
    OR project_manager_id IN (
      SELECT id FROM business_profiles
      WHERE auth_user_id = auth.uid()
    )
    OR site_supervisor_id IN (
      SELECT id FROM business_profiles
      WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE auth_user_id = auth.uid()
      AND role = 'admin'
    )
  );