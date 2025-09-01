import { Loader2 } from 'lucide-react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import ThemeProvider from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster
        icons={{
          loading: <Loader2 className="size-4 animate-spin" />,
        }}
      />
    </ThemeProvider>
  );
}
