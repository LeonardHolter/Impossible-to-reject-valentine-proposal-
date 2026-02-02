-- Valentine Proposals Table
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS proposals (
  id TEXT PRIMARY KEY,
  sender_name TEXT NOT NULL,
  crush_name TEXT NOT NULL,
  response TEXT NOT NULL DEFAULT 'pending' CHECK (response IN ('pending', 'yes', 'no')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_proposals_id ON proposals(id);

-- Enable Row Level Security (RLS)
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read and write (for simplicity)
-- In production, you might want more restrictive policies
CREATE POLICY "Allow all operations" ON proposals
  FOR ALL
  USING (true)
  WITH CHECK (true);
