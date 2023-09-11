'use client'
import React, { useState } from 'react';
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

const page = () => {
    const instance = useAxios();
    const [clientData, setClientData] = useState({

        clientName: '',
        clientEmail: '',
        phoneNum: '',

    });

    const handleSubmit = async () => {
    try {
        const res = await instance.post("/client/addclient/admin", clientData)

        if (res.success === true) {
            toast.success('Success Notification !', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            console.log(res.data,"reeeeeeee")
        }

        setClientData({

            clientName: '',
            clientEmail: '',
            phoneNum: '',
    
        })

        
    } catch (error) {
        console.log(error)
    }


    };
    return (
        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'> 
        <Box sx={{ maxWidth: "50%", margin: "0 auto" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Create a Client
            </Typography>
            <form>
                {/* Add margin-bottom to separate form fields */}
                <TextField
                    label="Client Name"
                    fullWidth
                    margin="normal"
                    value={clientData.clientName}
                    onChange={(e) =>
                        setClientData({ ...clientData, clientName: e.target.value })
                    }
                />
                {/* <div>
            <SearchDropdown propertyData={propertyData} options={loc?.result} onSelect={handleLocationSelect} />
        </div> */}


                {/* <div>
            <Box sx={{ minWidth: 320, marginTop: "15px", marginBottom: "10px" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleChange}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            // style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div> */}
                {/* 
        <div>
            <Box sx={{ minWidth: 320, marginTop: "15px", marginBottom: "10px" }}>
        
            </Box>
        </div> */}




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
                {/* <TextField
            label="Start Date"
            fullWidth
            margin="normal"
            value={clientData.startDate}
            onChange={(e) =>
                setClientData({ ...clientData, startDate: e.target.value })
            }
        /> */}
                {/* <TextField
            label="End Date"
            fullWidth
            margin="normal"
            value={clientData.endDate}
            onChange={(e) =>
                setClientData({ ...clientData, endDate: e.target.value })
            }
        /> */}
                {/* Add margin-top to separate form fields and button */}
                <Button
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
                </Button>
            </form>
        </Box>
        </div>
    )
}

export default page