import type { SVGProps } from 'react'

const Nexulty = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='36'
    height='36'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_8_2)'>
      <rect width='36' height='36' rx='10' fill='#2563EB' />
      <g clipPath='url(#clip1_8_2)'>
        <path
          d='M19.0948 13.7337V17.604L15.5446 15.4545V24.0586L12.3573 22.1234C12.1361 21.9864 12 21.7423 12 21.4744V9L18.7432 13.0847C18.9587 13.2216 19.0948 13.4658 19.0948 13.7337Z'
          fill='white'
        />
        <path
          d='M24.2727 14.5256V27L17.5295 22.9153C17.3084 22.7843 17.1722 22.5342 17.1722 22.2722V18.4019L20.7225 20.5514V11.9474L23.9154 13.8826C24.1366 14.0136 24.2727 14.2636 24.2727 14.5256Z'
          fill='white'
        />
      </g>
    </g>
    <defs>
      <clipPath id='clip0_8_2'>
        <rect width='36' height='36' fill='white' />
      </clipPath>
      <clipPath id='clip1_8_2'>
        <rect width='12.2727' height='18' fill='white' transform='translate(12 9)' />
      </clipPath>
    </defs>
  </svg>
)
export default Nexulty
