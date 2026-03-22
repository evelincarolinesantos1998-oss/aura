import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://brdxiakrjriqljxivsyi.supabase.co'
const supabaseAnonKey = 'sb_publishable_5Do2c9RtxKSpZmyOD0aLKQ_C_lHgyZD'

window.supabase = createClient(supabaseUrl, supabaseAnonKey)
