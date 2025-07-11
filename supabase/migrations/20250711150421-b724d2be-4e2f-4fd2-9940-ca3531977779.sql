-- Enable real-time updates for rental agreements table
ALTER TABLE rental_agreements REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE rental_agreements;