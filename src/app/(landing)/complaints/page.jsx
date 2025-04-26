'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

import Heading from "@/components/ui/heading"
import SubHeading from "@/components/ui/sub-heading"
import Title from "@/components/ui/title"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ComplaintsPage() {
  const [complaintType, setComplaintType] = useState('service')

  const submitForm = (e)=>{
     e.preventDefault()
  }
  return (
    <div className="min-h-screen py-8 px-4 bg-white text-black font-sans antialiased">
     
      <main className="max-w-3xl mx-auto py-16">
      
      <div className='my-4'>
      <Heading text="We're here to help"/>
        <SubHeading text="At Majestic Escape, we strive for excellence. If you've experienced any issues, we want to know about it and make it right."/>
   
      </div>
       

        <form onSubmit={submitForm} className="space-y-8 mb-16">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input id="name" placeholder="Your full name" className="w-full" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input id="email" type="email" placeholder="Your email address" className="w-full" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Complaint Type</Label>
            <RadioGroup value={complaintType} onValueChange={setComplaintType} className="flex space-x-4">
              {['Service', 'Booking', 'Other'].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.toLowerCase()} id={type.toLowerCase()} />
                  <Label htmlFor={type.toLowerCase()}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaint" className="text-sm font-medium">Complaint Details</Label>
            <Textarea 
              id="complaint" 
              placeholder="Please provide details about your complaint" 
              className="w-full min-h-[100px]"
            />
          </div>

          <button type="button" className=" bg-primaryGreen text-white hover:bg-brightGreen py-3 px-6 rounded-3xl">
            Submit Complaint
            <Send className="inline-block ml-2 h-4 w-4" />
          </button>
        </form>

        <section className="mb-16">
          <Title text="Frequently Asked Questions"/>
    
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "How long does it take to process a complaint?",
                answer: "We aim to respond to all complaints within 24-48 hours. Complex issues may take longer to resolve, but we'll keep you updated throughout the process."
              },
              {
                question: "Can I track the status of my complaint?",
                answer: "Yes, once you submit a complaint, you'll receive a unique reference number. You can use this to track the status of your complaint through our customer portal."
              },
              {
                question: "What if I'm not satisfied with the resolution?",
                answer: "If you're not satisfied with the resolution, you can request an escalation. Our customer service team will review your case and a senior manager will contact you directly."
              }
            ].map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-left text-graphite text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-stone text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="text-center flex justify-center flex-col items-center gap-y-4">
   <div>
       <Title text="Need immediate assistance?"/>
          <SubHeading text="Our customer support team is available 24/7 to help you with any urgent issues."/>
          </div>    
          <button type="button" className=" bg-primaryGreen text-white hover:bg-brightGreen py-3 px-6 rounded-3xl">
          Contact Support
            <Send className="inline-block ml-2 h-4 w-4" />
          </button>

         
        </section>
      </main>
    </div>
  )
}