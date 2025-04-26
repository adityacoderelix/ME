import Link from 'next/link'
import { ReactNode } from 'react'

interface CustomButtonProps {
  href: string
  text: string
  className?: string
  children?: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function PrimaryLink({ href, text, className = '', children, variant = 'primary' }: CustomButtonProps) {
  const baseStyles = 'font-bricolage rounded-full text-sm sm:text-base md:py-3 py-2 md:px-8 px-4'
  const variantStyles = {
    primary: 'bg-primaryGreen hover:bg-brightGreen text-white',
    secondary: 'bg-white hover:bg-gray-100 border-primaryGreen border-2 text-primaryGreen'
  }

  return (
    <Link 
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children || text}
    </Link>
  )
}



