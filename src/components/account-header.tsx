import { ChevronRight } from 'lucide-react'

export default function AccountHeader() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <p >
          Account
        </p>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Personal Info</span>
      </div>
    </nav>
  )
}