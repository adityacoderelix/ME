'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Category = {
  id: string;
  label: string;
};

type FAQ = {
  question: string;
  answer: string | JSX.Element;
  categories: string[];
};

type FAQClientProps = {
  categories: Category[];
  faqs: FAQ[];
};

export function FAQClient({ categories, faqs }: FAQClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredFaqs = useMemo(() => 
    activeCategory === 'all' 
      ? faqs 
      : faqs.filter(faq => faq.categories.includes(activeCategory)),
    [activeCategory, faqs]
  )

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={category.id === activeCategory ? "default" : "secondary"}
            className={`rounded-full px-4 py-2 text-sm border ${
              category.id === activeCategory 
                ? "bg-black text-white border-black" 
                : "bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-[#F3F4F6]"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-[#E5E7EB] rounded-lg mb-4 overflow-hidden">
              <AccordionTrigger className="text-base font-normal text-[#111827] hover:no-underline px-6 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#6B7280] px-6 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {filteredFaqs.length === 0 && (
          <p className="text-center text-[#6B7280]">No FAQs found for this category.</p>
        )}
      </div>
    </>
  )
}