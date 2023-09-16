"use client"
import { useRouter } from "next/navigation";
import { Button, IconButton, InputAdornment, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import { Input } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import dynamic from 'next/dynamic';
import { useAxios } from "../../../../utills/axios";
import Home from "../../../../components/kanbanNew/home"
import { toast } from 'react-toastify';



const NewProject = ({ params }) => {
    const instance = useAxios();
    const router = useRouter();
    const [status, setStatus] = useState('');
    const [task, setTask] = useState('');
    const [taskFromApi, setTasksFromApi] = useState([]);
    // const [kanbanTasks, setKanbanTasks] = useState([]);


    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleTask = async () => {
        let data = {
            task_name: task,
            task_status: status
        }

        try {

            const res = await instance.post(`/task/addTask/${params.project}/admin`, data);

            if (res.data) {
                console.log(res.data)
        getAllTasks()
        toast("Task is added")
        setTask("")
        setStatus("")
            }

        } catch (error) {
            console.log(error)
        }
        console.log(data, "rrrttt")

    }

    const statusNames = [
        "completed",
        "onGoing",
        "onHold",
    ]


    const getAllTasks = async () => {
        try {

            const res = await instance.get(`/task/getassignedtasktoprject/${params.project}`);

            if (res.data) {
                console.log(res.data.assignedTasks,"tasksss")
                setTasksFromApi(res.data.assignedTasks)
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllTasks();
    }, [])



      let resultArray = [];

if (taskFromApi) {
  const taskStatusMap = {};

  taskFromApi.forEach((task) => {
    const { task_status, _id, task_name: title } = task;

    if (!taskStatusMap[task_status]) {
      taskStatusMap[task_status] = {
        name: task_status,
        items: [],
      };
    }

    taskStatusMap[task_status].items.push({
      id: _id, // Use the _id from the API as the id
      title,
    });
  });

  // Convert the taskStatusMap object into an array
  resultArray = Object.values(taskStatusMap);
}
      
    //   setKanbanTasks(resultArray)
      console.log(resultArray,"resultArray");
      
      
      
      
    return (
        <div>
            {/* This is a project {params.project} */}


            <div className="flex items-center justify-center gap-4 my-15">
                <input value={task} onChange={(e) => setTask(e.target.value)} style={{ border: "1px solid gray", width: "500px", height: "55px", borderRadius: "5px" }} type="text" placeholder="Enter Task" className="" />
                <Box sx={{ width: 320 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statusNames.map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Box>

                <Button
                    variant="contained"
                    onClick={handleTask}
                    sx={{
                        backgroundColor: '#FF730F', // Set the background color
                        '&:hover': {
                            backgroundColor: '#db8e57', // Set the hover background color
                        },
                        color: 'white', // Set the text color
                    }}
                    className="bg-[#FF730F] text-white hover:bg-[#db8e57]"
                >
                    Create Task
                </Button>
            </div>

            <div style={{ color: "white", backgroundColor: "black", width: "90%", margin: "0 auto" }}>
              { resultArray &&  <Home defaultTasks={resultArray}  />}
            </div>



        </div>
    );
};

export default NewProject;
