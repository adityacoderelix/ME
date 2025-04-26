'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/ui/footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  const showFooter = pathname !== '/inbox'

  if (!showFooter) return null

  return <Footer />
}