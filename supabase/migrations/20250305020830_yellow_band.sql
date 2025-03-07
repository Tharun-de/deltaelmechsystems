/*
  # Create job applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `job_id` (text)
      - `job_title` (text)
      - `full_name` (text)
      - `email` (text)
      - `experience` (text)
      - `linkedin` (text)
      - `resume_url` (text)
      - `status` (text)
      - `admin_notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `job_applications` table
    - Add policies for users to read their own applications
    - Add policies for admins to read and update all applications
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  job_id text NOT NULL,
  job_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  experience text NOT NULL,
  linkedin text,
  resume_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own applications
CREATE POLICY "Users can read own applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy for admins to read all applications
CREATE POLICY "Admins can read all applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Policy for admins to update applications
CREATE POLICY "Admins can update applications"
  ON job_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );