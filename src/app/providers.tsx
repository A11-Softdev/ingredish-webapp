// app/providers.tsx
//add cmd tp use NextUI: npm install @nextui-org/react framer-motion 
import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}