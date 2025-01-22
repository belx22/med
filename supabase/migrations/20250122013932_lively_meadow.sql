/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text)
      - `hospital` (text)
      - `created_at` (timestamp)
    
    - `patients`
      - `id` (uuid, primary key)
      - `name` (text)
      - `age` (integer)
      - `gender` (text)
      - `region` (text)
      - `address` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `diseases`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key)
      - `name` (text)
      - `symptoms` (text)
      - `notes` (text)
      - `region` (text)
      - `cases` (integer)
      - `deaths` (integer)
      - `recoveries` (integer)
      - `reported_by` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'health_worker')),
  hospital text,
  created_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  region text NOT NULL,
  address text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diseases table
CREATE TABLE IF NOT EXISTS diseases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id),
  name text NOT NULL,
  symptoms text,
  notes text,
  region text NOT NULL,
  cases integer DEFAULT 1,
  deaths integer DEFAULT 0,
  recoveries integer DEFAULT 0,
  reported_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for patients table
CREATE POLICY "Health workers can read all patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Health workers can insert patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Health workers can update patients"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for diseases table
CREATE POLICY "Health workers can read all diseases"
  ON diseases
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Health workers can insert diseases"
  ON diseases
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Health workers can update own disease reports"
  ON diseases
  FOR UPDATE
  TO authenticated
  USING (reported_by = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_patients_region ON patients(region);
CREATE INDEX IF NOT EXISTS idx_diseases_region ON diseases(region);
CREATE INDEX IF NOT EXISTS idx_diseases_patient_id ON diseases(patient_id);
CREATE INDEX IF NOT EXISTS idx_diseases_reported_by ON diseases(reported_by);