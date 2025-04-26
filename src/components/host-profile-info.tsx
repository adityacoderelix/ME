"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Briefcase, Globe, MapPin, Shield, BookOpen, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  avatar: z.string().optional(),
  education: z.string().max(100, "Education must be less than 100 characters").optional(),
  work: z.string().max(100, "Work must be less than 100 characters").optional(),
  languages: z.array(z.string()).optional(),
  location: z.string().max(100, "Location must be less than 100 characters").optional(),
  responseRate: z.number().min(0).max(100).optional(),
  responseTime: z.string().optional(),
  yearsHosting: z.number().min(0).optional(),
  testimonialText: z.string().max(500, "Testimonial must be less than 500 characters").optional(),
  testimonialAuthor: z.string().max(100, "Author name must be less than 100 characters").optional(),
})

type FormValues = z.infer<typeof formSchema>

interface HostProfileFormProps {
  initialData?: {
    name: string
    email: string
    phone: string
    dob: string
    avatar?: string
    education?: string
    work?: string
    languages?: string[]
    location?: string
    responseRate?: number
    responseTime?: string
    yearsHosting?: number
    isSuperhost?: boolean
    testimonial?: {
      text?: string
      author?: string
    }
  }
  onSubmit: (data: FormValues) => void
  isLoading?: boolean
}

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Hindi",
]

const responseTimeOptions = ["Within an hour", "Within a few hours", "Within a day", "Within 2 days"]

export default function HostProfileForm({ initialData, onSubmit, isLoading = false }: HostProfileFormProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(initialData?.languages || [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: initialData?.avatar || "",
      education: initialData?.education || "",
      work: initialData?.work || "",
      languages: initialData?.languages || [],
      location: initialData?.location || "",
      responseRate: initialData?.responseRate || 95,
      responseTime: initialData?.responseTime || "Within a few hours",
      yearsHosting: initialData?.yearsHosting || 0,
      testimonialText: initialData?.testimonial?.text || "",
      testimonialAuthor: initialData?.testimonial?.author || "",
    },
  })

  function handleSubmit(data: FormValues) {
    onSubmit(data)
  }

  function handleLanguageToggle(language: string) {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        const updated = prev.filter((l) => l !== language)
        form.setValue("languages", updated)
        return updated
      } else {
        const updated = [...prev, language]
        form.setValue("languages", updated)
        return updated
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Host Profile</h1>
        {initialData?.isSuperhost && (
          <Badge className="bg-[#4D7C3F]/10 text-[#4D7C3F] hover:bg-[#4D7C3F]/10 border-0 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Superhost
          </Badge>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                This information is already in your account but you can update your profile photo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-white shadow-sm">
                    <AvatarImage
                      src={initialData?.avatar || "/placeholder.svg?height=96&width=96"}
                      alt={`${initialData?.name || "Host"} Avatar`}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {initialData?.name
                        ? initialData.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()
                            .substring(0, 2)
                        : "H"}
                    </AvatarFallback>
                  </Avatar>
                  {initialData?.isSuperhost && (
                    <Badge className="absolute bottom-0 right-0 bg-[#4D7C3F] text-white border-0 rounded-full p-1">
                      <Shield className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Photo</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input {...field} placeholder="Upload a new photo" />
                            <Button type="button" size="icon" variant="outline">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a clear photo of yourself to help guests recognize you.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <Input value={initialData?.name || ""} disabled />
                  <p className="text-xs text-muted-foreground mt-1">Your name is managed in account settings</p>
                </div>
                <div className="space-y-1">
                  <FormLabel>Date of Birth</FormLabel>
                  <Input value={initialData?.dob || ""} disabled />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your date of birth is managed in account settings
                  </p>
                </div>
                <div className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <Input value={initialData?.email || ""} disabled />
                  <p className="text-xs text-muted-foreground mt-1">Your email is managed in account settings</p>
                </div>
                <div className="space-y-1">
                  <FormLabel>Phone</FormLabel>
                  <Input value={initialData?.phone || ""} disabled />
                  <p className="text-xs text-muted-foreground mt-1">Your phone is managed in account settings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Host Details</CardTitle>
              <CardDescription>
                Tell guests more about yourself to help them feel comfortable staying with you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#4D7C3F]" />
                        Education
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Studied at University of..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="work"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#4D7C3F]" />
                        Work
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Works at..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#4D7C3F]" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Lives in New York, USA" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsHosting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years Hosting</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                          value={field.value || ""}
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <FormLabel className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#4D7C3F]" />
                  Languages
                </FormLabel>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((language) => (
                    <Badge
                      key={language}
                      variant={selectedLanguages.includes(language) ? "default" : "outline"}
                      className={
                        selectedLanguages.includes(language)
                          ? "bg-[#4D7C3F] hover:bg-[#3D6A2F] cursor-pointer"
                          : "hover:bg-[#4D7C3F]/10 cursor-pointer"
                      }
                      onClick={() => handleLanguageToggle(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
                <FormMessage>{form.formState.errors.languages?.message}</FormMessage>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="responseRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Response Rate (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                          value={field.value || ""}
                          min={0}
                          max={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responseTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Response Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select response time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {responseTimeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Testimonial</CardTitle>
              <CardDescription>Choose a testimonial from a guest to feature on your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="testimonialText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g. John was an amazing host, very responsive and helpful..."
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="testimonialAuthor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Sarah from New York" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#4D7C3F] hover:bg-[#3D6A2F]" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

