"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export function GSTVerification({ updateFormData, formData }) {
  const [gstInfo, setGstInfo] = useState(
    formData?.gstInfo || {
      gstNumber: "",
      gstName: "",
      isVerified: false,
    },
  )
  const [showDialog, setShowDialog] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const hasChanges = JSON.stringify(formData?.gstInfo) !== JSON.stringify(gstInfo)
    if (hasChanges) {
      updateFormData({ gstInfo })
    }
  }, [gstInfo, updateFormData, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setGstInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setGstInfo((prev) => ({ ...prev, isVerified: true }))
      setIsVerifying(false)
      setShowDialog(true)
    }, 2000)
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bricolage">GST Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gstNumber" className="font-bricolage text-lg text-gray-700 font-semibold">
            GST Number
          </Label>
          <Input
            id="gstNumber"
            name="gstNumber"
            value={gstInfo.gstNumber}
            onChange={handleChange}
            className="font-bricolage text-lg"
            placeholder="Enter your GST number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gstName" className="font-bricolage text-lg text-gray-700 font-semibold">
            Name associated with GST
          </Label>
          <Input
            id="gstName"
            name="gstName"
            value={gstInfo.gstName}
            onChange={handleChange}
            className="font-bricolage text-lg"
            placeholder="Enter the name associated with your GST"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleVerify}
          disabled={!gstInfo.gstNumber || !gstInfo.gstName || isVerifying}
          className="w-full"
        >
          {isVerifying ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Verifying...
            </>
          ) : (
            "Verify GST"
          )}
        </Button>
      </CardFooter>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>GST Verification Successful</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <Icons.CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <p className="text-center text-lg">Your GST details have been successfully verified.</p>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

