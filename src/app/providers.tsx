
'use client';

import { ReactQueryProvider } from '@/providers/query-client';
import { FirebaseClientProvider, FirebaseErrorListener } from '@/firebase';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <FirebaseErrorListener />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </FirebaseClientProvider>
  );
}
