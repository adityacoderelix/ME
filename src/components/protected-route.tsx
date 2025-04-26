/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          // router.push('/login')
          return
        }

        // const response = await fetch('http://localhost:5005/api/v1/auth/verify', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // })

        // if (response.ok) {
        //   setIsAuthenticated(true)
        // } else {
        //   localStorage.removeItem('token')
        //   router.push('/login')
        // }
                  setIsAuthenticated(true)

      } catch (error) {
        // console.error('Authentication error:', error)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

