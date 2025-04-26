"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { FileInput } from "@/components/ui/file-input"
import { Icons } from "@/components/ui/icons"

export function DocumentUpload({ updateFormData, formData }) {
  const [documentInfo, setDocumentInfo] = useState(
    formData?.documentInfo || {
      documentType: null,
      documentNumber: "",
      documentFile: null,
      isVerified: false,
    },
  )
  const [showDialog, setShowDialog] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const hasChanges = JSON.stringify(formData?.documentInfo) !== JSON.stringify(documentInfo)
    if (hasChanges) {
      updateFormData({ documentInfo })
    }
  }, [documentInfo, updateFormData, formData])

  const handleDocumentTypeChange = (value) => {
    setDocumentInfo((prev) => ({ ...prev, documentType: value }))
  }

  const handleFileChange = (file) => {
    setDocumentInfo((prev) => ({ ...prev, documentFile: file }))
  }

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setDocumentInfo((prev) => ({ ...prev, isVerified: true }))
      setIsUploading(false)
      setShowDialog(true)
    }, 2000)
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bricolage">Document Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          onValueChange={handleDocumentTypeChange}
          value={documentInfo.documentType}
          className="grid grid-cols-3 gap-4"
        >
          <Label
            htmlFor="pan"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              documentInfo.documentType === "pan"
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value="pan" id="pan" className="sr-only" />
            <Icons.CreditCard className="h-6 w-6 mb-2" />
            <span className="font-bricolage text-lg font-semibold">PAN</span>
          </Label>
          <Label
            htmlFor="voterId"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              documentInfo.documentType === "voterId"
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value="voterId" id="voterId" className="sr-only" />
            <Icons.Vote className="h-6 w-6 mb-2" />
            <span className="font-bricolage text-lg font-semibold">Voter ID</span>
          </Label>
          <Label
            htmlFor="passport"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              documentInfo.documentType === "passport"
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value="passport" id="passport" className="sr-only" />
            <Icons.Passport className="h-6 w-6 mb-2" />
            <span className="font-bricolage text-lg font-semibold">Passport</span>
          </Label>
        </RadioGroup>
        <div>
          <Label htmlFor="document" className="font-bricolage text-lg text-gray-700 font-semibold mb-2 block">
            Upload Document
          </Label>
          <FileInput
            id="document"
            accept=".jpg, .jpeg, .png"
            onFileSelect={handleFileChange}
            className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
          >
            <div className="text-center">
              <Icons.Upload className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-700">
                Drop your file here, or click to browse
              </span>
            </div>

            


          </FileInput>
          {documentInfo.documentFile && (
            <p className="mt-2 text-sm text-gray-500">Selected file: {documentInfo.documentFile.name}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpload}
          disabled={!documentInfo.documentType || !documentInfo.documentFile || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Icons.Loader className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload and Verify"
          )}
        </Button>
      </CardFooter>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Successful</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <Icons.CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <p className="text-center text-lg">Your document has been successfully verified.</p>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

