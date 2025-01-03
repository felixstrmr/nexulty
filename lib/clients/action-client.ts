import { WHITELISTED_ERROR_MESSAGES } from '@/lib/constants'
import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (WHITELISTED_ERROR_MESSAGES.includes(e.message)) {
      return e.message
    }

    return 'Oh no, something went wrong!'
  },
})
