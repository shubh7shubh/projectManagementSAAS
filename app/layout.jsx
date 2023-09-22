
// import '.styles/globals.css'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
// import Header from '@components/header'
// import Sidebar from '@components/sidebar'
// import GlobalState from '@components/context'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import GlobalState from '../components/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react'
import {Loading} from '../components/loader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <GlobalState> */}
        <div className='flex h-screen overflow-hidden'>
          <Sidebar />
          <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            <Header />
            <Suspense fallback={<Loading/>}>
            <main>
              {/* <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'> */}
              <div>
                {children}
              </div>
            </main>
            </Suspense>
          </div>
        </div>
        <ToastContainer/>
        {/* </GlobalState> */}
      </body>
    </html>
  )
}
