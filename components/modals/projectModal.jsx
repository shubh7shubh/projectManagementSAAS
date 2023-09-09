import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




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
    const [open, setOpen] = useState(false);
    // const theme = useTheme();
    const [status, setStatus] = useState('');
    const [projectData, setProjectData] = useState({
        projectName: '',
        status: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        projectCompany: '',
        projectCategory: '',
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        onSubmit(projectData);
        setOpen(false);
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



    const handleChange = (event) => {
        setStatus(event.target.value);
    };


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
                            value={projectData.projectName}
                            onChange={(e) =>
                                setProjectData({ ...projectData, projectName: e.target.value })
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
                        
                            </Box>
                        </div>


                
                    
                        <TextField
                            label="Project Category"
                            fullWidth
                            margin="normal"
                            value={projectData.projectCategory}
                            onChange={(e) =>
                                setProjectData({ ...projectData, clientEmail: e.target.value })
                            }
                        />
                        <TextField
                            label="Project Company"
                            fullWidth
                            margin="normal"
                            value={projectData.projectCompany}
                            onChange={(e) =>
                                setProjectData({ ...projectData, clientEmail: e.target.value })
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
