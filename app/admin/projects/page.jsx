"use client"
import React from 'react'
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
        field: "name",
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

    const projects = [
        {
            "projectName": "New Website",
            "status": "Ongoing",
            "clientEmail": "john.doe@example.com",
            "startDate": "2023-09-08",
            "endDate": "2023-10-08",
        },
        {
            "projectName": "Product Launch",
            "status": "Completed",
            "clientEmail": "jane.doe@example.com",
            "startDate": "2023-09-09",
            "endDate": "2023-10-09",
        },
        {
            "projectName": "Marketing Campaign",
            "status": "Onhold",
            "clientEmail": "bill.smith@example.com",
            "startDate": "2023-09-10",
            "endDate": "2023-10-10",
        },
        {
            "projectName": "New App Development",
            "status": "Ongoing",
            "clientEmail": "mary.jones@example.com",
            "startDate": "2023-09-11",
            "endDate": "2023-10-11",
        },
        {
            "projectName": "Data Migration",
            "status": "Completed",
            "clientEmail": "tom.brown@example.com",
            "startDate": "2023-09-12",
            "endDate": "2023-10-12",
        },
        {
            "projectName": "System Upgrade",
            "status": "Onhold",
            "clientEmail": "sally.white@example.com",
            "startDate": "2023-09-13",
            "endDate": "2023-10-13",
        },
        {
            "projectName": "New Feature Development",
            "status": "Ongoing",
            "clientEmail": "david.green@example.com",
            "startDate": "2023-09-14",
            "endDate": "2023-10-14",
        },
        {
            "projectName": "Security Audit",
            "status": "Completed",
            "clientEmail": "michael.black@example.com",
            "startDate": "2023-09-15",
            "endDate": "2023-10-15",
        },
        {
            "projectName": "Training Program",
            "status": "Onhold",
            "clientEmail": "jenny.pink@example.com",
            "startDate": "2023-09-16",
            "endDate": "2023-10-16",
        },
        {
            "projectName": "IT Support",
            "status": "Onhold",
            "clientEmail": "frank.blue@example.com",
            "startDate": "2023-09-17",
            "endDate": "2023-10-17",
        },
        {
            "projectName": "New Feature Development",
            "status": "Ongoing",
            "clientEmail": "david.green@example.com",
            "startDate": "2023-09-14",
            "endDate": "2023-10-14",
        },
        {
            "projectName": "Security Audit",
            "status": "Completed",
            "clientEmail": "michael.black@example.com",
            "startDate": "2023-09-15",
            "endDate": "2023-10-15",
        },
        {
            "projectName": "Training Program",
            "status": "Onhold",
            "clientEmail": "jenny.pink@example.com",
            "startDate": "2023-09-16",
            "endDate": "2023-10-16",
        },
        {
            "projectName": "IT Support",
            "status": "Onhold",
            "clientEmail": "frank.blue@example.com",
            "startDate": "2023-09-17",
            "endDate": "2023-10-17",
        },
    ];

    const newProjects = projects.map((project, index) => ({
        id: index + 1,
        name: project.projectName,
        status: project.status,
        clientEmail: project.clientEmail,
        startDate: project.startDate,
        endDate: project.endDate,
    }));

    const [rowProjects, setRowProjects] = useState(newProjects)

    const projectSubmit = (project) => {
        console.log(project, "projectDetails")
    }


    const handleRowClick = (row) => {
        console.log(row, "rowwww")
        router.push(`/admin/projects/${row.id}`);
    };

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
                        rows={rowProjects}
                        columns={columns}
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
