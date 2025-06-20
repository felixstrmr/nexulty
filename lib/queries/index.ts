import { Supabase } from '@/lib/types'

export async function getUserQuery(supabase: Supabase, userId: string) {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
    .throwOnError()

  return data
}
