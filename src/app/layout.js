import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Nav from '../components/Nav'
import './globals.css'
import SideBar from '../components/SideBar'


export const metadata = {
  title: 'Pateo ESG',
  description: 'Created by Victor Fazekas',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark

      }}
    >
      <html lang="en">
        <body>
          <Nav />
          <SideBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
