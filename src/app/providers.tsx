'use client';

import { ReactQueryProvider } from '@/providers/query-client';
import { FirebaseClientProvider, FirebaseErrorListener } from '@/firebase';
import { ThemeProvider } from '@/providers/theme-provider';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <FirebaseClientProvider>
        <FirebaseErrorListener />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </FirebaseClientProvider>
    </ThemeProvider>
  );
}
