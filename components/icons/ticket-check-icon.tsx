import type { SVGProps } from 'react'

export default function TicketCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M4 4C2.355 4 1 5.355 1 7v2a1 1 0 0 0 1 1c.75 0 1.185.245 1.502.602.317.356.498.87.498 1.398s-.181 1.042-.498 1.398C3.185 13.755 2.75 14 2 14a1 1 0 0 0-1 1v2c0 1.645 1.355 3 3 3h16c1.645 0 3-1.355 3-3v-2a1 1 0 0 0-1-1c-.75 0-1.185-.245-1.502-.602-.317-.356-.498-.87-.498-1.398s.181-1.042.498-1.398C20.815 10.245 21.25 10 22 10a1 1 0 0 0 1-1V7c0-1.645-1.355-3-3-3zm11 5a1 1 0 0 1 .707.293 1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414 1 1 0 0 1 1.414 0L11 12.586l3.293-3.293A1 1 0 0 1 15 9z' />
    </svg>
  )
}
