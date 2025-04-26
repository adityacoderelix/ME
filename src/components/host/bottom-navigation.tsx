'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, BookOpen, LayoutDashboard, Home, Menu, Receipt, User, MessageCircle, Star, FileText } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const navItems = [
  { name: 'Listings', icon: Home, href: '/host/dashboard/listings' },
  { name: 'Bookings', icon: BookOpen, href: '/host/dashboard/bookings' },
  { name: 'Home', icon: LayoutDashboard, href: '/host/dashboard' },

  { name: 'Calendar', icon: Calendar, href: '/host/dashboard/calendar' },
]

export default function HostBottomNavigation() {
  const [active, setActive] = useState('Dashboard')

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-0 md:hidden z-50">
      <ul className="flex justify-between items-center">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                active === item.name ? 'text-primary' : 'text-muted-foreground'
              } hover:text-primary hover:bg-accent`}
              onClick={() => setActive(item.name)}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200 text-muted-foreground hover:text-primary hover:bg-accent"
              >
                <Menu className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-lg font-semibold mb-4">Menu</SheetTitle>
              <nav className="flex flex-col space-y-4">
                <Link href="/host/dashboard/taxes" className="flex items-center space-x-2 text-sm">
                  <Receipt className="w-4 h-4" />
                  <span>Taxes</span>
                </Link>
               
                <Link href="/" className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>Switch to guest</span>
                </Link>
                <Link href="/host/dashboard/queries" className="flex items-center space-x-2 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>Queries</span>
                </Link>
                <Link href="/host/dashboard/complaints" className="flex items-center space-x-2 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>Complaints</span>
                </Link>
                <Link href="/host/dashboard/invoices" className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Invoices</span>
                </Link>
                <Link href="/host/dashboard/reviews" className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Reviews</span>
                </Link>
               
              </nav>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  )
}

