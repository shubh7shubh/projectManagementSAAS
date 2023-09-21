"use client"
// import Head from "next/head";
// import Layout from "../components/Layout";
import Image from 'next/image'
// import {
//   ChevronDownIcon,
//   PlusIcon,
//   DotsVerticalIcon,
//   PlusCircleIcon,
// } from "@heroicons/react/outline";
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CardItem from "../kanbanNew/CardItem";
import { Button } from '@mui/material';
import { GrAdd } from 'react-icons/gr';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// // import BoardData from "../data/board-data.json";
// import BoardData from "../kanbanNew/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { useAxios } from '../../utills/axios';


export default function Home({ defaultTasks, projectId, getAllTasks }) {
  const instance = useAxios();
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [updatedTask, setUpdatedTask] = useState({});
  const [newTask, setNewTask] = useState({
    task_name: "",
    task_priority: "",
    task_description: ""
  });


  const priorityNames = [
    "High Priority",
    "Low Priority",
    // "onHold",
  ]

  useEffect(() => {
    if (defaultTasks) {
      setBoardData(defaultTasks);
    }
  }, [defaultTasks]);


  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  if (boardData) {
    console.log(boardData, "boardDData")
  }


  const onDragEnd = async (re) => {
    if (!re.destination) return;

    const sourceDroppableId = parseInt(re.source.droppableId);
    const destinationDroppableId = parseInt(re.destination.droppableId);
    const sourceIndex = re.source.index;
    const destinationIndex = re.destination.index;

    // Create a copy of the board data to avoid mutating the state directly
    const newBoardData = [...boardData];

    // Get the dragged task
    const draggedTask = newBoardData[sourceDroppableId].items[sourceIndex];

    // Remove the task from the source column
    newBoardData[sourceDroppableId].items.splice(sourceIndex, 1);

    // Insert the task into the destination column
    newBoardData[destinationDroppableId].items.splice(destinationIndex, 0, draggedTask);

    // Update the state with the new board data
    console.log(newBoardData,"hjfdhjd")
    setBoardData(newBoardData);

    // Now you can access the dragged task and its new status

    const data = {
      task_status: newBoardData[destinationDroppableId].name, 
    };


    try {

      const res = await instance.patch(`/task/updatetaskstatus/${draggedTask.id}/admin`, data);

      if (res.data) {
        // console.log(res.data)
        // toast("Task status is updated")
        // setShowForm(false);
        // getAllTasks();

      }

    } catch (error) {
      console.log(error)
    }


    console.log(updatedTask,"hjfdhjd")
    toast.success(`Changed the status of ${draggedTask.title} to ${newBoardData[destinationDroppableId].name}`, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    setUpdatedTask(updatedTask);

    // You can do something with the updatedTask, like sending it to an API or storing it in another state.
    console.log(updatedTask, "updatedd");
  };


  // const onTextAreaKeyPress = async (e, boardId) => {
  //   // console.log(e,boardId,"textareaInput")
  //   if (e.keyCode === 13) { // Enter key
  //     const val = e.target.value;
  //     if (val.length === 0) {
  //       setShowForm(false);
  //     }
  //     console.log(boardId,"statusname")
  //     const newBoardData = [...boardData];
  //     console.log(newBoardData[boardId].items[0].title, "statusname")
  //     let data = {
  //       task_name: e.target.value,
  //       task_status: newBoardData[boardId].name
  //     }
  //     console.log(data,"ddfj")
  //     // setShowForm(false);

  //     try {

  //       const res = await instance.post(`/task/addTask/${projectId}/admin`, data);

  //       if (res.data) {
  //         console.log(res.data)
  //         toast("Task is added")
  //         setShowForm(false);
  //         getAllTasks();

  //       }

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // };

  const handleNewTask = async (statusId) => {

    const newBoardData = [...boardData];

    // console.log(newBoardData[statusId].name,"newTaskHandle")
    let data = {
            task_name: newTask.task_name,
            task_status: newBoardData[statusId].name,
            task_description:newTask.task_description,
            task_priority:newTask.task_priority
          }

          console.log(data,"newTaskHandle")
          setShowForm(false);

            try {

        const res = await instance.post(`/task/addTask/${projectId}/admin`, data);

        if (res.data) {
          // console.log(res.data)
          toast("Task is added")
          setShowForm(false);
          getAllTasks();

        }

      } catch (error) {
        console.log(error)
      }



  }



  return (
    // <Layout>
    <div style={{marginBottom:"200px"}} className="p-10 flex flex-col  h-screen ">

      {/* Board columns */}
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          {/* <div style={{border:"2px solid blue"}}  className="grid grid-cols-4 gap-5 my-5 "> */}
          <div className="flex justify-center gap-7 my-5 ">
            {boardData.length === 0 ? (
              <div>
                <p className='text-black'>There are no tasks. Please create tasks.</p>
              </div>
            ) : (boardData.map((board, bIndex) => (
              <div style={{ width: "300px" }} key={board.name}>
                <Droppable droppableId={bIndex.toString()}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div

                        className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                      >
                        <span
                          className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                        ></span>
                        <h4 className=" p-3 flex justify-between items-center mb-2">
                          <span className="text-2xl text-gray-600 font-bold">
                            {board.name.toUpperCase()}
                          </span>
                          {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}
                        </h4>

                        <div className="overflow-y-auto overflow-x-hidden h-auto"
                          style={{ maxHeight: 'calc(100vh - 290px)' }}>
                          {board.items.length > 0 &&
                            board.items.map((item, iIndex) => {
                              return (
                                <CardItem
                                  key={item.id}
                                  data={item}
                                  index={iIndex}
                                  className="m-3"
                                />
                              );
                            })}
                          {provided.placeholder}
                        </div>

                        {
                          showForm && selectedBoard === bIndex ? (
                            <div className="p-5 border-4 border-gray-300">
                              <input value={newTask.task_name} onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })} style={{ border: "1px solid gray", borderRadius: "5px", padding:"10px", margin: "15px 0",color:"black" }} type="text" placeholder="Enter Task Tittle" className="bg-transparent" />
                              <Box sx={{ width: 235,marginBottom:"15px" }}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={newTask.task_priority}
                                    label="Priority"
                                    onChange={(e) => setNewTask({...newTask, task_priority:e.target.value})}
                                  >
                                    {priorityNames.map((status) => (
                                      <MenuItem key={status} value={status}>{status}</MenuItem>
                                    ))}

                                  </Select>
                                </FormControl>
                              </Box>
                              <textarea style={{border:"1px solid gray"}} className=" border-1 border-gray-300 bg-transparent rounded text-black focus:ring-purple-400 w-full"
                                rows={3} placeholder="Task Description"
                                value={newTask.task_description}
                                // data-id={bIndex}
                                // onKeyDown={(e) => onTextAreaKeyPress(e, bIndex)}
                                onChange={(e) => setNewTask({ ...newTask, task_description: e.target.value })}
                              />
                              <Button
                                variant="contained"
                                onClick={() => handleNewTask(bIndex)}
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
                          ) : (
                            <button
                              className="flex justify-center items-center my-3 space-x-2 text-lg"
                              onClick={() => { setSelectedBoard(bIndex); setShowForm(true); }}
                            >
                              <span className='text-black'>Add task</span>
                              <GrAdd className="w-5 h-5 text-gray-500" />
                            </button>
                          )
                        }
                        {/* {
                          showForm && selectedBoard === bIndex ? (
                            <div className="p-3">
                              <textarea className="border-gray-300 rounded text-black focus:ring-purple-400 w-full"
                                rows={3} placeholder="Task info"
                                data-id={bIndex}
                                onKeyDown={(e) => onTextAreaKeyPress(e, bIndex)} />
                            </div>
                          ) : (
                            <button
                              className="flex justify-center items-center my-3 space-x-2 text-lg"
                              onClick={() => { setSelectedBoard(bIndex); setShowForm(true); }}
                            >
                              <span className='text-black'>Add task</span>
                              <FaBeer className="w-5 h-5 text-gray-500" />
                            </button>
                          )
                        } */}

                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            ))
            )}
          </div>
        </DragDropContext>
      )}
    </div>
    // </Layout>
  );
}







// const apiData = {
//   "success": true,
//   "message": "Assigned task for the user",
//   "assignedTasks": [
//     {
//       "_id": "6502f6fd6f01f3d5e4bf4d5c1",
//       "task_name": "task1",
//       "task_status": "onHold",
//       "isActive": true,
//       "projectId": "65019c150a2e05002b25b3081",
//       "createdAt": "2023-09-14T12:05:17.624Z",
//       "updatedAt": "2023-09-14T12:05:17.624Z",
//       "__v": 0
//     },
//     {
//       "_id": "6502f6fd6f01f3d5e4bf4d5c",
//       "task_name": "task2",
//       "task_status": "onHold",
//       "isActive": true,
//       "projectId": "65019c150a2e05002b25b308",
//       "createdAt": "2023-09-14T12:05:17.624Z",
//       "updatedAt": "2023-09-14T12:05:17.624Z",
//       "__v": 0
//     },
//     {
//       "_id": "6502f7096f01f3d5e4bf4d5e",
//       "task_name": "task4",
//       "task_status": "onGoing",
//       "isActive": true,
//       "projectId": "65019c150a2e05002b25b308",
//       "createdAt": "2023-09-14T12:05:29.766Z",
//       "updatedAt": "2023-09-14T12:05:29.766Z",
//       "__v": 0
//     },
//     {
//       "_id": "6502f7096f01f3d5e4bf4d5ee",
//       "task_name": "task5",
//       "task_status": "Completed",
//       "isActive": true,
//       "projectId": "65019c150a2e05002b25b308",
//       "createdAt": "2023-09-14T12:05:29.766Z",
//       "updatedAt": "2023-09-14T12:05:29.766Z",
//       "__v": 0
//     }
//   ]
// };

// // Create an object to map task_status values to their respective arrays
// const taskStatusMap = {};

// // Loop through the assignedTasks and populate the taskStatusMap
// apiData.assignedTasks.forEach((task) => {
//   console.log(task, "taskkkk")
//   const { task_status, _id, task_name: title } = task;

//   if (!taskStatusMap[task_status]) {
//     taskStatusMap[task_status] = {
//       name: task_status,
//       items: [],
//     };
//   }

//   taskStatusMap[task_status].items.push({
//     id: _id, // Use the _id from the API as the id
//     title,
//   });
// });

// // Convert the taskStatusMap object into an array
// const resultArray = Object.values(taskStatusMap);

// // console.log(resultArray,"rekjkejk");
