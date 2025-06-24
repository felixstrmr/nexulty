export default function Page() {
  return (
    <div className='flex size-full bg-zinc-50 p-1 dark:bg-zinc-900'>
      <div className='bg-background flex flex-1 items-center justify-center rounded-sm border shadow-xs'>
        <div className='space-y-6'>
          <h1 className='max-w-2xl text-7xl leading-16 font-semibold tracking-tight'>
            <span className='text-primary'>Open Source ITSM</span> <br />
            for small businesses <br />— built for scale.
          </h1>
          <p className='text-muted-foreground max-w-lg text-2xl leading-7'>
            Streamline your IT operations with our modern, intuitive platform.
            Get notified when we launch and be among the first to experience the
            future of IT service management.
          </p>
        </div>
      </div>
    </div>
  )
}
