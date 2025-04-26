'use client'

import { createContext, useContext, useState } from 'react'

interface SheetContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SheetContext = createContext<SheetContextType | undefined>(undefined)

export function SheetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export function useSheet() {
  const context = useContext(SheetContext)
  if (!context) throw new Error('useSheet must be used within SheetProvider')
  return context
}

