import Header from '@components/header'
import Sidebar from '@components/sidebar'
// import '.styles/globals.css'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import GlobalState from '@components/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
        <div className='flex h-screen overflow-hidden'>
          <Sidebar />
          <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            <Header />
            <main>
              <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                {children}
              </div>
            </main>
          </div>
        </div>
        </GlobalState>
      </body>
    </html>
  )
}
