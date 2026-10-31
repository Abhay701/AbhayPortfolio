
'use client';

import { ReactQueryProvider } from '@/providers/query-client';
import { FirebaseClientProvider } from '@/firebase';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </FirebaseClientProvider>
  );
}
