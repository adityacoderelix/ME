"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { name: "Stays", href: "/stays" },
  { name: "Experiences", href: "/experiences" },
  { name: "Services", href: "/services" },
]

export default function NavTabLayout() {
  const pathname = usePathname()

  return (
    <Tabs value={pathname} className="w-screen bg-white md:w-full">
      <TabsList className="grid font-bricolage w-full grid-cols-3">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.href} value={tab.href} asChild>



            <Link href={tab.href}> <span className={`text-absoluteDark text-base font-medium 'text-absoluteDark'
              `}>{tab.name}</span></Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

