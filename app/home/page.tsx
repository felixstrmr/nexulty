export default function Page() {
  return (
    <div className='flex size-full bg-zinc-50 p-1 dark:bg-zinc-900'>
      <div className='bg-background relative flex flex-1 items-center justify-center rounded-sm border shadow-xs'>
        <div className='space-y-6 text-center'>
          <h1 className='max-w-2xl text-7xl leading-16 font-semibold tracking-tight'>
            <span className='text-primary'>Open Source ITSM</span>
            <br />— built for scale.
          </h1>
          <p className='text-muted-foreground max-w-lg text-2xl leading-6'>
            Streamline your IT operations with our modern, intuitive platform.
            Get notified when we launch and be among the first to experience the
            future of IT service management.
          </p>
        </div>
        <p className='text-muted-foreground absolute right-auto bottom-4 left-auto mx-auto text-sm'>
          <span className='text-foreground'>
            © {new Date().getFullYear()} Nexulty
          </span>{' '}
          • Built for the future of ITSM.
        </p>
      </div>
    </div>
  )
}
