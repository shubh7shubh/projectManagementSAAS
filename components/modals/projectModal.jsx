"use client"
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAxios } from '../../utills/axios';




// function SearchDropdown({ options, onSelect, propertyData }) {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState(null);



//     useEffect(() => {
//       if (propertyData) {
//         setSearchQuery(propertyData?.location.name);
//         setSelectedOption(null);
//       }
//     }, [propertyData]);


//     const filteredOptions = options?.filter((option) =>
//       option.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleSearchChange = (e) => {
//       setSearchQuery(e.target.value);
//       setSelectedOption(null);
//     };

//     const handleOptionSelect = (optionName) => {
//       onSelect(optionName);
//       setSelectedOption(optionName);
//       setSearchQuery('');
//       setIsOpen(false);
//     };

//     const placeholder = selectedOption ? selectedOption : "Search locations";


//     return (

//       <div style={{ margin: "20px 0" }} className="relative">
//         <div
//           className={`relative z-10 ${isOpen ? "border-blue-500" : ""
//             } transition-all duration-300 group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd `}
//         >
//           <input
//             style={{ borderRadius: "18px" }}
//             type="text"
//             className="inputField"
//             placeholder={placeholder}
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onClick={() => setIsOpen(true)}
//           />
//         </div>

//         {isOpen && (
//           <div className="absolute left-0 bg-white border rounded-md w-full z-20 max-h-60 overflow-y-auto">
//             {filteredOptions.map((option) => (
//               <div
//                 key={option._id}
//                 className="px-4 py-2 cursor-pointer hover:bg-blue-100"
//                 onClick={() => handleOptionSelect(option.name)}
//               >
//                 {option.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     );
//   }





const ProjectModal = ({ buttonText, modalTitle, onSubmit }) => {
    const instance = useAxios();
    const [open, setOpen] = useState(false);
    // const theme = useTheme();
    const [status, setStatus] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState(null)
    const [clientNames, setClientNames] = useState([]);
    const [projectData, setProjectData] = useState({
        project_name: '',
        status: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        project_company: '',
        project_categories: '',
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        // onSubmit(projectData);
        // setOpen(false);
        try {

            const res = await instance.post("/project/addProject/admin", projectData);

            if (res.data) {
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '59%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white', // Changed background color to white
        boxShadow: 24,
        p: 3, // Adjust padding as needed
        borderRadius: 4, // Add border radius for rounded corners
        outline: 'none', // Remove default focus outline
    };

    // MUI DropDown

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Completed',
        "Ongoing",
        "Onhold",
        "Pending",
    ];


    // const clientNames = [
    //     'Completed',
    //     "Ongoing",
    //     "Onhold",
    //     "Pending",
    // ];



    const handleChange = (event) => {
        console.log(event.target.value, "clieee")

        setStatus(event.target.value);
        setProjectData({
            ...projectData,
            status: event.target.value
        });
    };



    // Get all Clients
    const getAllClients = async () => {
        try {
            const res = await instance.get("/client/allclientlist/admin");

            if (res.data.TaskList) {
                setClients(res?.data?.TaskList);

                console.log(res.data.TaskList, "task")
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        console.log("API call started");
        getAllClients(); // Make the API call
    }, []);



    const handleClient = (event) => {
        console.log(event.target.value, "clieee")
        setSelectedClient(event.target.value)
        setProjectData({
            ...projectData,
            clientEmail: event.target.value.clientEmail
        });
    };




    if (projectData) {
        console.log(projectData, "project")
    }

    return (
        <>
            {/* <p></p> */}
            <Button sx={{
                color: "white", borderRadius: "10px", padding: "7px 15px", backgroundColor: "#FF730F", "&:hover": {
                    backgroundColor: '#db8e57'
                },
            }} className="bg-[#FF730F] text-white hover:bg-[#db8e57]" onClick={handleOpen}>{buttonText}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalTitle}
                    </Typography>
                    <form>
                        {/* Add margin-bottom to separate form fields */}
                        <TextField
                            label="Project Name"
                            fullWidth
                            margin="normal"
                            value={projectData.project_name}
                            onChange={(e) =>
                                setProjectData({ ...projectData, project_name: e.target.value })
                            }
                        />
                        {/* <div>
                            <SearchDropdown propertyData={propertyData} options={loc?.result} onSelect={handleLocationSelect} />
                        </div> */}


                        <div>
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
                        </div>


                        <div>
                            <Box sx={{ minWidth: 320, marginTop: "15px", marginBottom: "10px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedClient}
                                        label="Client"
                                        onChange={handleClient}
                                    >
                                        {clients && clients.map((client) => (
                                            <MenuItem
                                                key={client._id}
                                                value={client}
                                            >
                                                {client.clientName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        {/* <div>
                            <Box sx={{ minWidth: 320, marginTop: "15px", marginBottom: "10px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={clients}
                                        label="Client"
                                        onChange={handleClient}
                                    >
                                        { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div> */}

                        <div>
                            <Box sx={{ minWidth: 320, marginTop: "15px", marginBottom: "10px" }}>

                            </Box>
                        </div>




                        <TextField
                            label="Project Category"
                            fullWidth
                            margin="normal"
                            value={projectData.project_categories}
                            onChange={(e) =>
                                setProjectData({ ...projectData, project_categories: e.target.value })
                            }
                        />
                        <TextField
                            label="Project Company"
                            fullWidth
                            margin="normal"
                            value={projectData.project_company}
                            onChange={(e) =>
                                setProjectData({ ...projectData, project_company: e.target.value })
                            }
                        />
                        <TextField
                            label="Start Date"
                            fullWidth
                            margin="normal"
                            value={projectData.startDate}
                            onChange={(e) =>
                                setProjectData({ ...projectData, startDate: e.target.value })
                            }
                        />
                        <TextField
                            label="End Date"
                            fullWidth
                            margin="normal"
                            value={projectData.endDate}
                            onChange={(e) =>
                                setProjectData({ ...projectData, endDate: e.target.value })
                            }
                        />
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
            </Modal>
        </>
    );
};

export default ProjectModal;
