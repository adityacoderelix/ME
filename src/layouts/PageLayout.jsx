
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'

export default function Component ({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

