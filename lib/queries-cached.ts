import { getUser, getWorkspace } from '@/lib/queries'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

// User

export async function getUserWithCache(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userId = user?.id

  if (!userId) return null

  return await unstable_cache(
    async () => getUser(supabase, userId),
    ['user', userId],
    {
      revalidate: 180,
      tags: [`user-${userId}`],
    },
  )()
}

// Workspace

export async function getWorkspaceWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  return await unstable_cache(
    async () => getWorkspace(supabase, domain),
    [`workspace-${domain}`],
    {
      revalidate: 3600,
      tags: [`workspace-${domain}`],
    },
  )()
}
