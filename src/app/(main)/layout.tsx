import React from 'react';

import { MainComponent } from '@/containers/main/MainContainer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <MainComponent>{children}</MainComponent>;
}
