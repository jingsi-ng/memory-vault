// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eyckvpmlfvgvlsnzrekg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Y2t2cG1sZnZndmxzbnpyZWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMjQ4OTEsImV4cCI6MjA4MTgwMDg5MX0.htPogDpA-wTHcLrg8s2b-vVoT9YsFG4ysikCqgokLck';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);