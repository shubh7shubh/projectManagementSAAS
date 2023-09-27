'use client'
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { useAxios } from '../../../utills/axios';
import { BiSolidDownload } from "react-icons/bi";
import { IconButton, Tooltip } from '@mui/material';
import Loading from '../../../components/loader';

const page = () => {
    const instance = useAxios();
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(5)
    const [clientInvoices, setClientInvoices] = useState([])

 
    // LIST OF ALL INVIOCES



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

      const getClientInvoices = async () => {
        try {
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
              console.log("User ID not found in local storage.");
              return;
            }
            const res = await instance.get(`invoices/getallinvoicebyclientid/${userId}/client`)
            if (res.data) {
                setClientInvoices(res.data.InvoiceList)
            }

        } catch (error) {
            console.log(error)
        }

    }   
        getClientInvoices()
    }, [])







    const columns = [

        {
            field: "client.company",
            headerName: (
                <div className="text-[#FF730F] font-bold">Client Id</div>
            ),
            minWidth: 150,
            flex: 0.2,
            valueGetter: (params) => {
                return params.row.client.company;
            },
        },
        {
            field: "client.address",
            headerName: (
                <div className="text-[#FF730F] font-bold">Client Address</div>
            ),
            minWidth: 150,
            flex: 0.2,
            valueGetter: (params) => {
                return params.row.client.address;
            },
        },
        {
            field: 'products', // Access the 'products' field within the row
            headerName: (
                <div className="text-[#FF730F] font-bold">Products</div>
            ),
            minWidth: 200,
            flex: 0.2,
            renderCell: (params) => (
                <Select
                    value={params.value[0]?.description || ''}
                    variant="outlined"
                    fullWidth
                // Handle dropdown change here if needed
                >
                    {params.value.map((product, index) => (
                        <MenuItem key={index} value={product.description}>
                            {product.description}
                        </MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            field: "action",
            headerName: (
                <div className="text-[#FF730F] font-bold">Download Pdf</div>
            ),
            minWidth: 100,
            flex: 0.1,
            renderCell: ({ row }) => (
                <Box sx={{ margin: "0 auto" }}>
                    <Tooltip title="Download">
                        <IconButton
                            //   onClick={() => router.push(`/admin/property/edit/${row._id}`)}
                            //   onClick={() => console.log("click")}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(row.path, "_blank");
                                // console.log(row,"click")
                            }}
                            color="primary"
                        >
                            <BiSolidDownload />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },

    ];

 


    return (
        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
      
            {clientInvoices.length != 0 ? <div className='mt-6'>


                <Box>
                    <DataGrid
                        rows={clientInvoices}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[5, 10, 15, 100]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        checkboxSelection={false}
                        onRowClick={(params) => handleRowClick(params.row)}

                    />
                </Box>





            </div> : <div> <p>There are no invoices</p></div>}
        </div>
    )
}

export default page