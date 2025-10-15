"use client";

import { ReactLenis } from '@studio-freight/react-lenis'

type SmoothScrollProviderProps = {
    children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {

  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.5 }}>
      {children}
    </ReactLenis>
  )
}
