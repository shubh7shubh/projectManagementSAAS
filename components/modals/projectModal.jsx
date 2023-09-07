import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ProjectModal = ({ buttonText, modalTitle, onSubmit }) => {
    const [open, setOpen] = useState(false);
    const [projectData, setProjectData] = useState({
        projectName: '',
        status: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
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

    return (
        <>
            {/* <p></p> */}
            <Button sx={{color:"black",borderRadius:"10px",padding:"7px 15px" }} className="bg-[#FF730F] text-white hover:bg-[#db8e57]" onClick={handleOpen}>{buttonText}</Button>
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
                        <TextField
                            label="Status"
                            fullWidth
                            margin="normal"
                            value={projectData.status}
                            onChange={(e) =>
                                setProjectData({ ...projectData, status: e.target.value })
                            }
                        />
                        <TextField
                            label="Client Email"
                            fullWidth
                            margin="normal"
                            value={projectData.clientEmail}
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
