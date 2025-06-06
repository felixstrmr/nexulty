import SettingsSidebar from '@/components/sidebars/settings-sidebar'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <SettingsSidebar />
      <div className='flex-1'>{children}</div>
    </div>
  )
}
