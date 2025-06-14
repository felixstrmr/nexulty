import React from 'react'

export default function BoxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M12 1.002a3 3 0 0 0-1.496.4l-7 4-.004.002A3 3 0 0 0 2 7.998v8.004a3 3 0 0 0 1.5 2.594l.004.002 7 4c.444.255.939.384 1.435.394L12 23l.057-.008c.499-.01.997-.138 1.443-.396l6.996-3.998.004-.002a3 3 0 0 0 1.5-2.594V7.998a3 3 0 0 0-1.5-2.594l-.004-.002L13.5 1.404a3 3 0 0 0-1.5-.402Zm0 2c.172 0 .345.045.5.135l.004.002 6.473 3.699L12 10.846 5.023 6.838l6.473-3.7.004-.001a1 1 0 0 1 .5-.135zm8 5.555v7.441c0 .359-.19.686-.5.865L13 20.578v-8z' />
    </svg>
  )
}
