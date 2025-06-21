"use client";
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { ReactNode, Suspense } from 'react';

export function ClerkProvider({ children }: { children: ReactNode }) {
    const isDarkMode = useIsDarkMode() ?? false;
  return (
    <Suspense>
    <OriginalClerkProvider appearance={isDarkMode ? { baseTheme: [dark] } : undefined}>
      {children}
    </OriginalClerkProvider>
    </Suspense>
  );
}