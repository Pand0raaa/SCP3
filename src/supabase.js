import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtnjipplvbtodgvbuzvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bmppcHBsdmJ0b2RndmJ1enZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDMzMDY4NywiZXhwIjoyMDQ1OTA2Njg3fQ.fBBIjXNVFWLwciC7pRcZn8eYRODi741xPZm3wnH-0AE';
export const supabase = createClient(supabaseUrl, supabaseKey);
