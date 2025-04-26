





export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body >
          {children}
      </body>
    </html>
  )
}

