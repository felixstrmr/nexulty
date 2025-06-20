import CreateOrganizationForm from '@/components/forms/create-organization-form'

export default function Page() {
  return (
    <div className='flex size-full'>
      <div className='flex w-1/2 flex-col items-center justify-center'>
        <div>
          <div className='mb-8'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create your organization
            </h1>
          </div>
          <CreateOrganizationForm />
        </div>
      </div>
    </div>
  )
}
