"use client"
import { HostListingsTable } from "./host-listings-table"
import { useAuth } from "@/contexts/AuthContext"

export default function HostListingsPage() {
  const auth = useAuth()
  const userEmail = auth.user.email

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold font-bricolage mb-5">Your Listings</h1>
      <HostListingsTable userEmail={userEmail} />
    </div>
  )
}

