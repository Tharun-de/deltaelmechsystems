/*
  # Enhance Projects Table for Construction Business
  
  1. Add construction-specific fields
  2. Add project management fields
  3. Add timeline and progress tracking
  4. Add budget and cost fields
  5. Add validations and constraints
*/

-- Enhance projects table with construction-specific fields
ALTER TABLE projects
  -- Site and Project Type Details
  ADD COLUMN IF NOT EXISTS site_address text,
  ADD COLUMN IF NOT EXISTS site_city text,
  ADD COLUMN IF NOT EXISTS site_state text,
  ADD COLUMN IF NOT EXISTS site_postal_code text,
  ADD COLUMN IF NOT EXISTS project_type text,
  ADD COLUMN IF NOT EXISTS plot_area numeric,
  ADD COLUMN IF NOT EXISTS built_up_area numeric,
  ADD COLUMN IF NOT EXISTS number_of_floors integer,
  
  -- Project Management
  ADD COLUMN IF NOT EXISTS project_manager_id uuid REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS site_supervisor_id uuid REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS estimated_duration integer, -- in days
  ADD COLUMN IF NOT EXISTS actual_duration integer,
  
  -- Progress Tracking
  ADD COLUMN IF NOT EXISTS completion_percentage integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS current_phase text,
  ADD COLUMN IF NOT EXISTS delay_reason text,
  ADD COLUMN IF NOT EXISTS last_updated_by uuid REFERENCES users(id),
  
  -- Cost and Budget
  ADD COLUMN IF NOT EXISTS estimated_cost numeric,
  ADD COLUMN IF NOT EXISTS actual_cost numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS material_cost numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS labor_cost numeric DEFAULT 0,
  
  -- Additional Details
  ADD COLUMN IF NOT EXISTS permit_details jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS additional_notes text;

-- Add constraints for data validation
ALTER TABLE projects
  -- Validate project type
  ADD CONSTRAINT valid_project_type 
    CHECK (project_type IN ('it_building', 'house', 'school', 'commercial', 'other')),
  
  -- Validate completion percentage
  ADD CONSTRAINT valid_completion_percentage 
    CHECK (completion_percentage BETWEEN 0 AND 100),
  
  -- Validate current phase
  ADD CONSTRAINT valid_current_phase 
    CHECK (current_phase IN (
      'planning',
      'foundation',
      'structure',
      'walls',
      'plumbing',
      'electrical',
      'finishing',
      'completed'
    )),
  
  -- Validate status
  ADD CONSTRAINT valid_status 
    CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold', 'cancelled')),
  
  -- Validate postal code (Indian PIN code)
  ADD CONSTRAINT valid_site_postal_code 
    CHECK (site_postal_code IS NULL OR site_postal_code ~* '^[1-9][0-9]{5}$'),
  
  -- Validate numeric fields
  ADD CONSTRAINT valid_areas 
    CHECK (plot_area >= 0 AND built_up_area >= 0),
  ADD CONSTRAINT valid_costs 
    CHECK (estimated_cost >= 0 AND actual_cost >= 0 AND material_cost >= 0 AND labor_cost >= 0);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_project_type 
  ON projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_project_manager 
  ON projects(project_manager_id);
CREATE INDEX IF NOT EXISTS idx_projects_site_supervisor 
  ON projects(site_supervisor_id);
CREATE INDEX IF NOT EXISTS idx_projects_site_city 
  ON projects(site_city);
CREATE INDEX IF NOT EXISTS idx_projects_current_phase 
  ON projects(current_phase);
CREATE INDEX IF NOT EXISTS idx_projects_completion_percentage 
  ON projects(completion_percentage);

-- Create a function to update completion_percentage
CREATE OR REPLACE FUNCTION update_project_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Update updated_at and last_updated_by
  NEW.updated_at = now();
  NEW.last_updated_by = auth.uid();
  
  -- Calculate actual duration if project is completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.actual_duration = EXTRACT(DAY FROM (now() - NEW.start_date))::integer;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for the above function
CREATE TRIGGER trigger_update_project_completion
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_project_completion();