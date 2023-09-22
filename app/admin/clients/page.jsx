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
import { useAxios } from '../../../utills/axios';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import Loading from '../../../components/loader';

const page = () => {
    const instance = useAxios();
    const [clientForm, setClientForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clientList, setClientList] = useState(true)
    const [pageSize, setPageSize] = useState(5)
    const [clients, setClients] = useState([])
    const [clientData, setClientData] = useState({

        clientName: '',
        clientEmail: '',
        phoneNum: '',
        companyName: '',

    });

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await instance.post("/client/addclient/admin", clientData)

            if (res.data) {
                toast.success('Cliet is Added !', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                console.log(res.data, "reeeeeeee")
                setLoading(false)
                setClientList(true)
                setClientForm(false)
            }

            setClientData({

                clientName: '',
                clientEmail: '',
                phoneNum: '',
                companyName: '',

            })


        } catch (error) {
            console.log(error)
        }

    };

    const handleClientForm = () => {
        setClientForm(true)
        setClientList(false)
    }


    const handleClientList = () => {
        setClientList(true)
        setClientForm(false)
       
    }

       // GEt All Clents


       const getAllClients = async () => {

        try {

            const res = await instance.get("/client/allclientlist/admin")

            if (res.data.sucess) { // Access res.data.success
                console.log(res.data.TaskList, "task"); // Access res.data.TaskList
                setClients(res.data.TaskList)
            }

        } catch (error) {

            console.log(error)

        }
    }

    useEffect(() => {

        getAllClients()

    }, [])



    
const columns = [
    {
        field: "clientName",
        headerName: (
            <div className="text-[#FF730F] font-bold">Client Name</div>
        ),
        minWidth: 100,
        flex: 0.1,
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
        field: "phoneNum",
        headerName: (
            <div className="text-[#FF730F] font-bold">Mobile Number</div>
        ),
        minWidth: 100,
        flex: 0.1,
    },

];



    return (
        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
            <div className='flex justify-end gap-4'>
              {clientList ?  <Button
                    variant="contained"
                    onClick={handleClientForm}
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#FF730F', // Set the background color
                        '&:hover': {
                            backgroundColor: '#db8e57', // Set the hover background color
                        },
                        color: 'white', // Set the text color
                    }}
                    className="bg-[#FF730F] text-white hover:bg-[#db8e57] rounded-lg"
                >
                    Create Client
                </Button> : null}
          {clientList === false ?      <Button
                    variant="contained"
                    onClick={handleClientList}
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#FF730F', // Set the background color
                        '&:hover': {
                            backgroundColor: '#db8e57', // Set the hover background color
                        },
                        color: 'white', // Set the text color
                    }}
                    className="bg-[#FF730F] text-white hover:bg-[#db8e57] rounded-lg"
                >
                    Show Clients
                </Button> : null}

            </div>
            {clientForm ? <Box sx={{ maxWidth: "50%", margin: "0 auto" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create a Client
                </Typography>
                <form>

                    <TextField
                        label="Client Name"
                        fullWidth
                        margin="normal"
                        value={clientData.clientName}
                        onChange={(e) =>
                            setClientData({ ...clientData, clientName: e.target.value })
                        }
                    />

                    <TextField
                        label="Client Email"
                        fullWidth
                        margin="normal"
                        value={clientData.clientEmail}
                        onChange={(e) =>
                            setClientData({ ...clientData, clientEmail: e.target.value })
                        }
                    />
                    <TextField
                        label="Client Mobile Number"
                        fullWidth
                        margin="normal"
                        value={clientData.phoneNum}
                        onChange={(e) =>
                            setClientData({ ...clientData, phoneNum: e.target.value })
                        }
                    />

                    <TextField
                        label="Company Name"
                        fullWidth
                        margin="normal"
                        value={clientData.companyName}
                        onChange={(e) =>
                            setClientData({ ...clientData, companyName: e.target.value })
                        }
                    />

                 {loading === false  ? <Button
                        variant="contained"
                        onClick={handleSubmit}
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
                        Submit
                    </Button>: <Loading/> }
                </form>
            </Box> : clientList && clients.length != 0 ? <div className='mt-6'>


            <Box>
                    <DataGrid
                        rows={clients}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[5, 10, 15, 100]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        checkboxSelection={false}
                        onRowClick={(params) => handleRowClick(params.row)}

                    />
                </Box>





            </div> : <Loading/>}
        </div>
    )
}

export default page