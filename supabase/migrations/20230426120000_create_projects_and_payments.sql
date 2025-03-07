/*
  # Create Projects and Payments Tables

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `client_id` (uuid, references users)
      - `developer_ids` (uuid array)
      - `status` (text)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `budget` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `payments`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects)
      - `amount` (numeric)
      - `status` (text)
      - `payment_method` (text)
      - `transaction_id` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  client_id uuid REFERENCES public.users(id),
  developer_ids uuid[] DEFAULT '{}',
  status text NOT NULL CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')),
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  budget numeric NOT NULL CHECK (budget >= 0),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create the payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount >= 0),
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text NOT NULL CHECK (payment_method IN ('stripe', 'razorpay')),
  transaction_id text UNIQUE,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row-Level Security on both tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the projects table

-- Policy: Admins can perform all actions on projects
CREATE POLICY "Admins can perform all actions on projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'admin'
    )
  );

-- Policy: Developers can view assigned projects
CREATE POLICY "Developers can view assigned projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'developer'
      AND auth.uid() = ANY(developer_ids)
    )
  );

-- Policy: Clients can view own projects
CREATE POLICY "Clients can view own projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'client'
      AND auth.uid() = client_id
    )
  );

-- Create RLS policies for the payments table

-- Policy: Admins can perform all actions on payments
CREATE POLICY "Admins can perform all actions on payments"
  ON public.payments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'admin'
    )
  );

-- Policy: Clients can view payments related to their projects
CREATE POLICY "Clients can view own project payments"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE public.projects.id = payments.project_id
      AND public.projects.client_id = auth.uid()
    )
  );

-- Create function to update the updated_at column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create triggers to automatically update the updated_at column on projects and payments
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
