import { getUser } from '@/lib/queries/cached'
import { getDomainFromOrganization } from '@/lib/utils'
import { createSafeActionClient } from 'next-safe-action'
import { headers } from 'next/headers'
import { z } from 'zod'

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    })
  },
  handleServerError(error, { metadata }) {
    console.error(metadata.name, error.message)

    return error.message
  },
})

export const authActionClient = actionClient.use(async ({ next }) => {
  const headersList = await headers()
  const host = headersList.get('host')!
  const domain = getDomainFromOrganization(host)

  const user = await getUser()

  if (!user) throw new Error('Unauthorized')

  return next({ ctx: { user, domain } })
})
