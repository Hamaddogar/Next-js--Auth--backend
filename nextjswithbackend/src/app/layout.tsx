 import Navbar from '../app/navbar/page'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <header>
        <Navbar/>
      </header> */}

      <body>{children}</body>
    </html>
  )
}
