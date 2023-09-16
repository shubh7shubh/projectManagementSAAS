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
import CardItem from "../kanbanNew/CardItem";
// // import BoardData from "../data/board-data.json";
// import BoardData from "../kanbanNew/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const apiData = {
  "success": true,
  "message": "Assigned task for the user",
  "assignedTasks": [
    {
      "_id": "6502f6fd6f01f3d5e4bf4d5c1",
      "task_name": "task1",
      "task_status": "onHold",
      "isActive": true,
      "projectId": "65019c150a2e05002b25b3081",
      "createdAt": "2023-09-14T12:05:17.624Z",
      "updatedAt": "2023-09-14T12:05:17.624Z",
      "__v": 0
    },
    {
      "_id": "6502f6fd6f01f3d5e4bf4d5c",
      "task_name": "task2",
      "task_status": "onHold",
      "isActive": true,
      "projectId": "65019c150a2e05002b25b308",
      "createdAt": "2023-09-14T12:05:17.624Z",
      "updatedAt": "2023-09-14T12:05:17.624Z",
      "__v": 0
    },
    {
      "_id": "6502f6fd6f01f3d5e4bf4d5cd",
      "task_name": "task3",
      "task_status": "onHold",
      "isActive": true,
      "projectId": "65019c150a2e05002b25b308",
      "createdAt": "2023-09-14T12:05:17.624Z",
      "updatedAt": "2023-09-14T12:05:17.624Z",
      "__v": 0
    },
    {
      "_id": "6502f7096f01f3d5e4bf4d5e",
      "task_name": "task4",
      "task_status": "onGoing",
      "isActive": true,
      "projectId": "65019c150a2e05002b25b308",
      "createdAt": "2023-09-14T12:05:29.766Z",
      "updatedAt": "2023-09-14T12:05:29.766Z",
      "__v": 0
    },
    {
      "_id": "6502f7096f01f3d5e4bf4d5ee",
      "task_name": "task5",
      "task_status": "Completed",
      "isActive": true,
      "projectId": "65019c150a2e05002b25b308",
      "createdAt": "2023-09-14T12:05:29.766Z",
      "updatedAt": "2023-09-14T12:05:29.766Z",
      "__v": 0
    }
  ]
};

// Create an object to map task_status values to their respective arrays
const taskStatusMap = {};

// Loop through the assignedTasks and populate the taskStatusMap
apiData.assignedTasks.forEach((task) => {
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
const resultArray = Object.values(taskStatusMap);

console.log(resultArray,"rekjkejk");


export default function Home({defaultTasks}) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [updatedTask, setUpdatedTask] = useState({});


  useEffect(() => {
  if(defaultTasks){
         setBoardData(defaultTasks);
        }
    
  }, [defaultTasks]);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  if(updatedTask){
    console.log(updatedTask,"updatedTaskdd")
  }


  const onDragEnd = (re) => {
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
    setBoardData(newBoardData);
  
    // Now you can access the dragged task and its new status
    const updatedTask = {
      id: draggedTask.id, // Assuming you have a unique identifier for tasks
      title: draggedTask.title,
      status: newBoardData[destinationDroppableId].name, // Updated status
    };
    toast.success(`Changed the status of ${draggedTask.title} to ${newBoardData[destinationDroppableId].name}`, {
      position: toast.POSITION.BOTTOM_RIGHT
  });
    setUpdatedTask(updatedTask);
  
    // You can do something with the updatedTask, like sending it to an API or storing it in another state.
    console.log(updatedTask,"updatedd");
  };
  

  const onTextAreaKeyPress = (e) => {
    if(e.keyCode === 13) //Enter
    {
      const val = e.target.value;
      if(val.length === 0) {
        setShowForm(false);
      }
      else {
        const boardId = e.target.attributes['data-id'].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat:0,
          attachment: 0,
          assignees: []
        }
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  }

  return (
    // <Layout>
      <div className="p-10 flex flex-col  h-screen">
    
     

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-5 my-5 ">
              {boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
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
                              <span className="text-2xl text-gray-600">
                                {board.name.toUpperCase()}
                              </span>
                              {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}
                            </h4>

                            <div className="overflow-y-auto overflow-x-hidden h-auto"
                            style={{maxHeight:'calc(100vh - 290px)'}}>
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
                            
                            {/* {
                              showForm && selectedBoard === bIndex ? (
                                <div className="p-3">
                                  <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full" 
                                  rows={3} placeholder="Task info" 
                                  data-id={bIndex}
                                  onKeyDown={(e) => onTextAreaKeyPress(e)}/>
                                </div>
                              ): (
                                <button
                                  className="flex justify-center items-center my-3 space-x-2 text-lg"
                                  onClick={() => {setSelectedBoard(bIndex); setShowForm(true);}}
                                >
                                  <span className='text-black'>Add task</span>
                                  <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                                </button>
                              )
                            } */}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    // </Layout>
  );
}
