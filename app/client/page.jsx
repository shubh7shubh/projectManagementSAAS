"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';

const page = () => {
  const router = useRouter();
  const [cookies, setCookes] = useCookies(["jwtToken"]);

  useEffect(() => {
    if (cookies.jwtToken === undefined) {
      toast.error("Please Login")
      router.push(`/client/login`)
    }
  }, [])
  

  return (
    <div>Client Dashboard</div>
  )
}

export default page