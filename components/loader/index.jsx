import React from 'react'
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';


const Loading = () => {
  return (
    <Box sx={{ width: '100%',display:"flex",alignItems:"center",justifyContent:"center" }}>
      <CircularProgress sx={{color:"#FF730F"}} />
    </Box>
  )
}

export default Loading
