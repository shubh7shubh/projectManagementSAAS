"use client"
import React, { useEffect } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
// import ProjectModal from '@components/modals/projectModal';
import ProjectModal from '../../../components/modals/projectModal'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'
import { useAxios } from "../../../utills/axios"

const getStatusCellStyle = (params) => {
    const status = params.value;

    let color = '';
    switch (status) {
        case 'Completed':
            color = 'green';
            break;
        case 'Onhold':
            color = 'red';
            break;
        case 'Ongoing':
            color = 'orange';
            break;
        default:
            color = '';
            break;
    }

    return {
        //   backgroundColor: backgroundColor,
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
    // {
    //     field: "status",
    //     headerName: (
    //         <div className="text-[#FF730F] font-bold">Status</div>
    //     ),
    //     minWidth: 100,
    //     flex: 0.1,
    //     renderCell: (params) => (
    //         <div style={getStatusCellStyle(params)}>{params.value}</div>
    //     ),
    // },
    // {
    //     field: "clientEmail",
    //     headerName: (
    //         <div className="text-[#FF730F] font-bold">Client Email</div>
    //     ),
    //     minWidth: 100,
    //     flex: 0.1,
    // },
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
    {
        field: "project_company",
        headerName: (
            <div className="text-[#FF730F] font-bold">Project Company</div>
        ),
        minWidth: 100,
        flex: 0.1,
    },
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


const Projects = () => {
        const router = useRouter();
    const [pageSize, setPageSize] = useState(5)
    const instance = useAxios();
    const [projects, setProjects] = useState([])


    const projectSubmit = (project) => {
        console.log(project, "projectDetails")
    }


    const handleRowClick = (row) => {
        console.log(row, "rowwww")
        router.push(`/admin/projects/${row.id}`);
    };


    async function getAllProjects() {
        try {

          const res = await instance.get(
            `/project/allprojects/admin`
          );
          if (res.data.ProjectList) {
            // setUsers(res?.data?.data);
            // setLoading(false);
            setProjects(res.data.ProjectList)
            console.log(res.data,"eeeeeee")
          }

        } catch (e) {
        //   setLoading(false);
          console.log(e)

        }
      }
    
      useEffect(() => {
        getAllProjects();
      }, []);


    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className="relative w-28 h-9 bg-[#FF730F] transform -skew-x-12 flex items-center justify-center">
                    <p className="text-white  px-4">Projects</p>

                </div>
                <div>
                    {/* <button className='bg-[#FF730F] px-4 rounded-lg text-white py-2'>CREATE NEW PROJECT</button> */}
                    <ProjectModal
                        buttonText="Create New Project"
                        modalTitle="Create new project"
                        onSubmit={projectSubmit}
                    />
                </div>
            </div>

            <div className='mt-4'>
                <Box>
                    <DataGrid
                        rows={projects}
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

        </div>
    );
};

export default Projects;
