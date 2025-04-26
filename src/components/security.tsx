"use client"

import { useState } from "react"
import { CheckCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"

import { Switch } from "@/components/ui/switch"
import { Card } from "./ui/card"

export default function Component() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  return (
    <main className="flex-1 px-4 py-6 lg:px-8">
    {/* <h1 className="text-2xl font-bold">Account</h1> */}
    <div className="mt-8 max-w-5xl space-y-6">
   
   
      <Card className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
        <div className="mt-4 flex items-center gap-2">
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
            aria-label="Toggle two-factor authentication"
            className={twoFactorEnabled ? "bg-primaryGreen" : "bg-gray-500"}
          />
          <span className="text-sm font-medium">
            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
         You would need to enter your password as well as OTP received on your mail
        </p>
      </Card>
      <Card className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">Email Verification</h2>
        <p className="text-sm text-muted-foreground">Verify your email to enhance account security</p>
        <div className="mt-4 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-primaryGreen" />
          <span className="text-sm">Verified</span>
        </div>
        <Button className="mt-4 rounded-full border-brightGreen text-brightGreen" variant="outline">
          Change Email
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">Keep your email verified for authentication.</p>
      </Card>
    
      <Card className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">Account Activity</h2>
        <p className="text-sm text-muted-foreground">Review your recent account activity</p>
        <Button className="mt-4 rounded-full border-brightGreen text-brightGreen" variant="outline">
          View Activity
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">See what operations you have done recently.</p>
      </Card>
    </div>
  </main>
  )
}