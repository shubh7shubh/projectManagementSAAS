"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
import { useAxios } from "../../../../utills/axios";
// import Home from "../../../../components/kanbanNew/home"
import { toast } from 'react-toastify';
import { Chip } from "@mui/material";



const NewCLientProject = ({ params }) => {
    const instance = useAxios();
    const router = useRouter();
    const [clientProjects, setClientProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [taskk, setTaskk] = useState([

        {
            task_status: "onGoing",
            _id: "1234567890",
            task_name: "Design the new website landing page",
            task_priority: "high",
            task_description: "Design the new website landing page that will be used to promote the upcoming product launch.",
        },
        {
            task_status: "onGoing",
            _id: "9876543210",
            task_name: "Develop the new feature for the mobile app",
            task_priority: "critical",
            task_description: "Develop the new feature for the mobile app that will allow users to book appointments online.",
        },
        {
            task_status: "onGoing",
            _id: "0987654321",
            task_name: "Write the press release for the new product launch",
            task_priority: "medium",
            task_description: "Write the press release that will be used to announce the launch of the new product.",
        },
        {
            task_status: "onGoing",
            _id: "2134567890",
            task_name: "Order the supplies for the upcoming event",
            task_priority: "low",
            task_description: "Order the supplies for the upcoming event, such as food, drinks, and decorations.",
        },
        {
            task_status: "onGoing",
            _id: "3123456789",
            task_name: "Create the social media campaign for the new product launch",
            task_priority: "high",
            task_description: "Create the social media campaign that will be used to promote the launch of the new product.",
        },
        {
            task_status: "onHold",
            _id: "6432456789",
            task_name: "Prepare for the upcoming customer meeting",
            task_priority: "high",
            task_description: "Prepare for the upcoming customer meeting by creating a presentation and gathering all of the necessary information.",
        },
        {
            task_status: "onHold",
            _id: "7543456789",
            task_name: "Send out the customer newsletter",
            task_priority: "medium",
            task_description: "Send out the customer newsletter with information about the new product launch, upcoming events, and other news.",
        },
        {
            task_status: "onHold",
            _id: "8654456789",
            task_name: "Review the quarterly sales report",
            task_priority: "low",
            task_description: "Review the quarterly sales report and identify any areas where improvement is needed.",
        },
        {
            task_status: "completed",
            _id: "9765456789",
            task_name: "Write the blog post about the benefits of using a large language model",
            task_priority: "high",
            task_description: "Write a blog post about the benefits of using a large language model.",
        },
        {
            task_status: "completed",
            _id: "0876456789",
            task_name: "Fix the bug in the production code",
            task_priority: "critical",
            task_description: "Fix the bug that is causing the production code to crash.",
        }
    ]);
    // const [kanbanTasks, setKanbanTasks] = useState([]);


    if(params){
        console.log(params.clientProjects,"dfsdf")
    }




    useEffect(() => {
      // Find the project with the matching _id

      const project = clientProjects.find((curElem) => curElem._id === params.clientProjects);
    
      // If a matching project is found, set the tasks
      if (project) {
        setTasks(project.project_tasks);
      }
    }, [clientProjects, params.clientProjects]);


  useEffect(() => {
    if(tasks){
      console.log(tasks,"taskkss")
    }
  }, [tasks])
  



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
  
      // Function to fetch client projects
      const getClientProjects = async () => {
        try {
          const userId = getUserIdFromLocalStorage();
          if (!userId) {
            console.log("User ID not found in local storage.");
            return;
          }
  
          const res = await instance.get(`user/userclinetdetails/${userId}/client`);
          if (res.data.assignedProjects) {
            setClientProjects(res.data.assignedProjects);
          }
        } catch (e) {
          console.error("Error fetching client projects:", e);
        }
      };
  
      // Call getClientProjects when the component mounts
      getClientProjects();
    }, []);

    


    let resultArray = [];

    if (tasks && tasks.length > 0) {
        // Prepopulate taskStatusMap with all possible statuses
        const taskStatusMap = {
            "completed": { name: "completed", items: [] },
            "onGoing": { name: "onGoing", items: [] },
            "onHold": { name: "onHold", items: [] }
        };

        tasks.forEach((task) => {
            const { task_status, _id, task_name: title, task_priority: taskPriority, task_description: description } = task;

            // Use the task_status to add the task to the correct category
            if (taskStatusMap[task_status]) {
                taskStatusMap[task_status].items.push({
                    id: _id,
                    title,
                    // description,
                    // taskPriority
                });
            }
        });

        // Convert the taskStatusMap object into an array
        resultArray = Object.values(taskStatusMap);
    }
    else {
        let sampleArray = [{ name: "completed", items: [] }, { name: "onGoing", items: [] }, { name: "onHold", items: [] },]
        resultArray = sampleArray
    }

    //   setKanbanTasks(resultArray)
    console.log(resultArray, "resultArraydd");




    return (
        <div>
          <div style={{ color: "white", width: "90%", margin: "0 auto" }}>
            <div style={{ marginBottom: "200px" }} className="p-10 flex flex-col  h-screen ">
              <div className="flex justify-center gap-7 my-5 ">
                {resultArray.length === 0 ? (
                  <div>
                    <p className='text-black'>There are no tasks. Please create tasks.</p>
                  </div>
                ) : (resultArray.map((board, bIndex) => (
                  <div style={{ width: "300px" }} key={board.name}>
                    <div className={`bg-gray-100 rounded-md shadow-md flex flex-col relative overflow-hidden`}>
                      <span className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0"></span>
                      <h4 className="p-3 flex justify-between items-center mb-2">
                        <span className="text-2xl text-gray-600 font-bold">
                          {board.name.toUpperCase()}
                        </span>
                      </h4>
                      <div className="overflow-y-auto overflow-x-hidden h-auto" style={{ maxHeight: 'calc(100vh - 290px)' }}>
                        {board.items.length > 0 &&
                          board.items.map((item, iIndex) => {
                            return (
                              <div className="bg-white rounded-md p-3 m-3 mt-0 last:mb-4" key={item.id}>
                                <h5 className="text-md font-bold my-3 text-lg leading-6 text-black">{item.title}</h5>
                                {/* <div className="flex justify-between">
                                  <div className="flex space-x-2 items-center">
                                    <span className="flex space-x-1 items-center">
                                      <Chip label={item.taskPriority} color="primary" />
                                    </span>
                                  </div>
                                </div> */}
                                {/* <div className="my-4">
                                  <p className="text-black">{item.description}</p>
                                </div> */}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                ))
                )}
              </div>
            </div>
          </div>
        </div>
      );
};

export default NewCLientProject;
