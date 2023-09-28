
"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const adminDashboard = () => {
  const router = useRouter();
  const [cookies, setCookes] = useCookies(["jwtToken"]);

  useEffect(() => {
    if (cookies.jwtToken === undefined) {
      toast.error("Please Login")
      router.push(`/admin/login`)
    }
  }, [])

  return (
    <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'> 
      
      AdminDashboard</div>
  )
}

export default adminDashboard