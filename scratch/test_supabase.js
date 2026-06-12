import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Simple env file parser
const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf8");
const env = {};
envContent.split("\n").forEach(line => {
  const cleanLine = line.trim();
  if (cleanLine && !cleanLine.startsWith("#")) {
    const parts = cleanLine.split("=");
    const key = parts[0].trim();
    const val = parts.slice(1).join("=").trim();
    env[key] = val;
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  try {
    // Let's try to query some common tables to see if anything exists
    const tables = ["posts", "comments", "users", "profiles", "likes", "reviews", "discussions"];
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select("*").limit(1);
      if (error) {
        console.log(`Table ${table} error:`, error.message);
      } else {
        console.log(`Table ${table} exists! Row count test:`, data.length);
      }
    }
  } catch (e) {
    console.error("Exceptions:", e);
  }
}

run();
