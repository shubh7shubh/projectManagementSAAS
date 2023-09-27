"use client"
import React, { useEffect } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
// import ProjectModal from '@components/modals/projectModal';
// import ProjectModal from '../../../components/modals/projectModal'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'
import { useAxios } from "../../../utills/axios"
import Loading from '../../../components/loader';



const getStatusCellStyle = (params) => {
    const status = params.value ? params.value.toLowerCase() : ''; // Convert status to lowercase if it exists

    let color = '';
    switch (status) {
        case 'completed':
            color = 'green';
            break;
        case 'onhold':
            color = 'red';
            break;
        case 'ongoing':
            color = 'orange';
            break;
        default:
            color = '';
            break;
    }

    return {
        color: color,
    };
};

const columns = [
    {
        field: "project_name",
        headerName: (
            <div className="text-[#FF730F] font-bold">Project Name</div>
        ),
        minWidth: 100,
        flex: 0.1,
    },
    {
        field: "status",
        headerName: (
            <div className="text-[#FF730F] font-bold">Status</div>
        ),
        minWidth: 100,
        flex: 0.1,
        renderCell: (params) => (
            <div style={getStatusCellStyle(params)}>{params.value}</div>
        ),
    },
    {
        field: "clientEmail",
        headerName: (
            <div className="text-[#FF730F] font-bold">Client Email</div>
        ),
        minWidth: 100,
        flex: 0.1,
    },
    {
        field: "startDate",
        headerName: (
            <div className="text-[#FF730F] font-bold">Start Date</div>
        ),
        minWidth: 100,
        flex: 0.1,
    },
    {
        field: "endDate",
        headerName: (
            <div className="text-[#FF730F] font-bold">End Date</div>
        ),
        minWidth: 100,
        flex: 0.1,
    },
    // {
    //     field: "project_company",
    //     headerName: (
    //         <div className="text-[#FF730F] font-bold">Project Company</div>
    //     ),
    //     minWidth: 100,
    //     flex: 0.1,
    // },
    {
        field: "action",
        headerName: (
            <div className="text-[#FF730F] font-bold">Actions</div>
        ),
        minWidth: 100,
        flex: 0.1,
        renderCell: ({ row }) => (
            <Box>
                <Tooltip title="Edit">
                    <IconButton
                        //   onClick={() => router.push(`/admin/property/edit/${row._id}`)}
                        //   onClick={() => console.log("click")}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("click")
                        }}
                        color="primary"
                    >
                        <BsPencil />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        //   onClick={() => {
                        //     setDeleteId(row?._id);
                        //     setDeleteOpen(true);
                        //   }}
                        // onClick={() => console.log("click")}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("click")
                        }}
                        color="error"
                    >
                        <MdDeleteForever />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];






const ClientProjects = () => {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(5)
    const instance = useAxios();
    const [clientProjects, setClientProjects] = useState([])
    const [clients, setClients] = useState([])



    const handleRowClick = (row) => {
        console.log(row, "rowwww")
        router.push(`/client/clientProject/${row._id}`);
    };

    useEffect(() => {
        // Function to retrieve "userId" from local storage
        const getUserIdFromLocalStorage = () => {
          try {
            const userId = localStorage.getItem("userId");
            return userId;
          } catch (error) {
            console.error("Error retrieving userId from local storage:", error);
            return null;
          }
        };
    
        // Function to fetch client projects
        const getClientProjects = async () => {
          try {
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
              console.log("User ID not found in local storage.");
              return;
            }
    
            const res = await instance.get(`user/userclinetdetails/${userId}/client`);
            if (res.data.assignedProjects) {
              setClientProjects(res.data.assignedProjects);
            }
          } catch (e) {
            console.error("Error fetching client projects:", e);
          }
        };
    
        // Call getClientProjects when the component mounts
        getClientProjects();
      }, []);


//     const getClientInfo = async () => {
//         const getUserIdFromLocalStorage = () => {
//             try {
//               const userId = localStorage.getItem("userId");
//               return userId;
//             } catch (error) {
//               console.error("Error retrieving userId from local storage:", error);
//               return null;
//             }
//           };
//         try {
//           const userId = getUserIdFromLocalStorage();
//           if (!userId) {
//             console.log("User ID not found in local storage.");
//             return;
//           }
  
//           const res = await instance.get(`user/userclinetdetails/${userId}/client`);
//           if (res.data) {
//           //   setClientProjects(res.data.assignedProjects);
//           }
//         } catch (e) {
//           console.error("Error fetching client projects:", e);
//         }
//       };


//       useEffect(() => {
//  // Function to fetch client information
    

//         getClientInfo()
   
//       }, [])
      

    return (
       <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'> 
{/* <div><button onClick={getClientInfo}>click</button></div> */}
     <div className='mt-4'>
                <Box>
                    <DataGrid
                        rows={clientProjects}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[5, 10, 15, 100]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        checkboxSelection={false}
                        onRowClick={(params) => handleRowClick(params.row)}

                    />
                </Box>

            </div>
        {/* {clientProjects && clientProjects.length != 0 ?    <div className='mt-4'>
                <Box>
                    <DataGrid
                        rows={clientProjects}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[5, 10, 15, 100]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        checkboxSelection={false}
                        onRowClick={(params) => handleRowClick(params.row)}

                    />
                </Box>

            </div> : <Loading/>} */}

        </div>
    );
};

export default ClientProjects;
