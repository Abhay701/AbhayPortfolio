'use client';

import { ReactQueryProvider } from '@/providers/query-client';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
