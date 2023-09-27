"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
import { useAxios } from "../../../../utills/axios";
import Home from "../../../../components/kanbanNew/home"
import { toast } from 'react-toastify';



const NewProject = ({ params }) => {
    const instance = useAxios();
    const router = useRouter();
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [taskFromApi, setTasksFromApi] = useState([]);
    // const [kanbanTasks, setKanbanTasks] = useState([]);



    if(taskFromApi){
        console.log(taskFromApi,"taskjh")
    }


    const handleTask = async () => {
        let data = {
            task_name: task,
            task_status: status,
            task_description:description,
            task_priority:priority
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
    const priorityNames = [
        "High Priority",
        "Low Priority",
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



//       let resultArray = [];

// if (taskFromApi && taskFromApi.length > 0) {
//     console.log(taskFromApi,"kjfdkjfkd")
//   const taskStatusMap = {};

//   taskFromApi.forEach((task) => {
//     const { task_status, _id, task_name: title, task_priority:taskPriority, task_description:description  } = task;

//     if (!taskStatusMap[task_status]) {
//       taskStatusMap[task_status] = {
//         name: task_status,
//         items: [],
//       };
//     }

//     taskStatusMap[task_status].items.push({
//       id: _id, // Use the _id from the API as the id
//       title,
//       description,
//       taskPriority

//     });
//   });

//   // Convert the taskStatusMap object into an array
//   resultArray = Object.values(taskStatusMap);
//   console.log(resultArray,"resutlAr")
// }


let resultArray = [];

if (taskFromApi && taskFromApi.length > 0) {
  // Prepopulate taskStatusMap with all possible statuses
  const taskStatusMap = {
    "completed": { name: "completed", items: [] },
    "onGoing": { name: "onGoing", items: [] },
    "onHold": { name: "onHold", items: [] }
  };

  taskFromApi.forEach((task) => {
    const { task_status, _id, task_name: title, task_priority: taskPriority, task_description: description } = task;

    // Use the task_status to add the task to the correct category
    if (taskStatusMap[task_status]) {
      taskStatusMap[task_status].items.push({
        id: _id,
        title,
        description,
        taskPriority
      });
    }
  });

  // Convert the taskStatusMap object into an array
  resultArray = Object.values(taskStatusMap);
}
else{
    let sampleArray = [{name:"completed",items:[]},{name:"onGoing",items:[]},{name:"onHold",items:[]},]
    resultArray = sampleArray
}
      
    //   setKanbanTasks(resultArray)
      console.log(resultArray,"resultArraydd");
      
      
      
      
    return (
        <div>
            {/* This is a project {params.project} */}

{/* 
            <div className="flex items-center justify-center gap-4 my-15">
                <input value={task} onChange={(e) => setTask(e.target.value)} style={{ border: "1px solid gray", width: "200px", height: "55px", borderRadius: "5px",paddingLeft:"15px" }} type="text" placeholder="Enter Task" className="" />
                <Box sx={{ width: 150 }}>
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
                <Box sx={{ width: 150 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={priority}
                            label="Priority"
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            {priorityNames.map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Box>
                <input value={description} onChange={(e) => setDescription(e.target.value)} style={{ border: "1px solid gray", width: "400px", height: "55px", borderRadius: "5px",paddingLeft:"15px" }} type="text" placeholder="Enter Description" className="" />

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
            </div> */}

            <div style={{ color: "white", width: "90%", margin: "0 auto" }}>
              { resultArray &&  <Home defaultTasks={resultArray} projectId={params.project} getAllTasks={getAllTasks}  />}
            </div>



        </div>
    );
};

export default NewProject;
