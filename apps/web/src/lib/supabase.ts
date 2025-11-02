import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cgojadkcijfvmmxmstyq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2phZGtjaWpmdm1teG1zdHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNzY1NjEsImV4cCI6MjA3Mjk1MjU2MX0.A8oe-xek9kTKcM5vx6H3-8mhffQNfIQU_LGh2Xq6KXc";

export const supabase = createClient(
  supabaseUrl ?? "https://cgojadkcijfvmmxmstyq.supabase.co",
  supabaseAnonKey ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2phZGtjaWpmdm1teG1zdHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNzY1NjEsImV4cCI6MjA3Mjk1MjU2MX0.A8oe-xek9kTKcM5vx6H3-8mhffQNfIQU_LGh2Xq6KXc"
);
