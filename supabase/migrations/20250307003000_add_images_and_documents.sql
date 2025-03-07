/*
  # Create Project Images and Documents Tables
  
  1. Project Images: For construction site photos
  2. Project Documents: For contracts, blueprints, permits etc.
  3. Add security policies
  4. Add storage handling
*/

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Image details
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  thumbnail_url text,
  storage_path text NOT NULL,
  
  -- Image metadata
  image_type text NOT NULL,
  taken_date timestamptz NOT NULL,
  location text,
  tags text[],
  
  -- Progress tracking
  construction_phase text,
  work_area text,
  
  -- Upload details
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Add constraint for image types
  CONSTRAINT valid_image_type CHECK (
    image_type IN (
      'site_progress',
      'foundation',
      'structure',
      'electrical',
      'plumbing',
      'finishing',
      'issue',
      'material',
      'other'
    )
  )
);

-- Create project_documents table
CREATE TABLE IF NOT EXISTS project_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Document details
  title text NOT NULL,
  description text,
  document_url text NOT NULL,
  storage_path text NOT NULL,
  file_type text,
  file_size integer,
  
  -- Document metadata
  document_type text NOT NULL,
  version integer DEFAULT 1,
  valid_until timestamptz,
  tags text[],
  
  -- Upload and approval
  uploaded_by uuid REFERENCES users(id),
  approved_by uuid REFERENCES users(id),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Add constraint for document types
  CONSTRAINT valid_document_type CHECK (
    document_type IN (
      'contract',
      'blueprint',
      'permit',
      'quotation',
      'invoice',
      'site_plan',
      'structural_design',
      'electrical_plan',
      'plumbing_plan',
      'other'
    )
  )
);

-- Enable Row Level Security
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for project_images
CREATE POLICY "Users can view project images they have access to"
  ON project_images FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND (
        projects.client_id = auth.uid()
        OR projects.project_manager_id = auth.uid()
        OR projects.site_supervisor_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND users.role = 'admin'
        )
      )
    )
  );

-- Create policies for project_documents
CREATE POLICY "Users can view project documents they have access to"
  ON project_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_documents.project_id
      AND (
        projects.client_id = auth.uid()
        OR projects.project_manager_id = auth.uid()
        OR projects.site_supervisor_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND users.role = 'admin'
        )
      )
    )
  );

-- Add indexes for better performance
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_images_image_type ON project_images(image_type);
CREATE INDEX idx_project_documents_project_id ON project_documents(project_id);
CREATE INDEX idx_project_documents_document_type ON project_documents(document_type);

-- Create trigger for updated_at
CREATE TRIGGER update_project_images_updated_at
  BEFORE UPDATE ON project_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_documents_updated_at
  BEFORE UPDATE ON project_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();