"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button';

const Home = () => {
  const router = useRouter()
  return (
<>
<p className='title-xl2'>Homepage</p>
<div className='flex flex-col gap-5 w-full justify-center items-center'>

<Button
                        variant="contained"
                        onClick={() => router.push('/client')}
                        sx={{
                            marginTop: 2,
                            backgroundColor: '#FF730F', // Set the background color
                            '&:hover': {
                                backgroundColor: '#db8e57', // Set the hover background color
                            },
                            color: 'white', // Set the text color
                        }}
                        className="bg-[#FF730F] text-white hover:bg-[#db8e57]"
                    >
                        Client Dashboard
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/admin')}
                        sx={{
                            marginTop: 2,
                            backgroundColor: '#FF730F', // Set the background color
                            '&:hover': {
                                backgroundColor: '#db8e57', // Set the hover background color
                            },
                            color: 'white', // Set the text color
                        }}
                        className="bg-[#FF730F] text-white hover:bg-[#db8e57]"
                    >
                        Admin Dashboard
                    </Button>

</div>

</>
  )
}

export default Home