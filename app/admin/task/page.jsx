"use client"
// import React from 'react'
// import KanbanBoard from '../../../components/kanbanBoard/KanbanBoard'

// const page = () => {
//   return (
//     <KanbanBoard/>
//   )
// }

// export default page


import '../../../styles/globals.css'

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicKanbanBoard = dynamic(() => import('../../../components/kanbanBoard/KanbanBoard'), {
  ssr: false, // Load this component only on the client side
});

function YourPage() {
  useEffect(() => {
    // This code will run on the client side after the component is mounted.
    const portalContainer = document.createElement('div');
    document.body.appendChild(portalContainer);
    
    return () => {
      document.body.removeChild(portalContainer);
    };
  }, []);

  return (
    // <div style={{border:"2px solid green",backgroundColor:"black",color:"white"}}>
    <div style={{color:"white",backgroundColor:"black"}}>
      {/* Task */}
      {/* Other page content */}
      <DynamicKanbanBoard />
    </div>
  );
}

export default YourPage;
