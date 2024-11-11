import { cn } from '@/lib/utils'
import * as React from 'react'

interface InputProps extends React.ComponentProps<'input'> {
  startIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startIcon, ...props }, ref) => {
  return (
    <div className='relative w-full'>
      {startIcon && <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>{startIcon}</div>}
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-primary focus:border-primary focus:ring focus:ring-primary/25 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          startIcon && 'pl-9',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
