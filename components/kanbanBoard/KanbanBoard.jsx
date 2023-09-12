"use client"
// import PlusIcon from "../icons/PlusIcon";
import PlusIcon from "../../icons/PlusIcon"
import { useEffect, useMemo, useState } from "react";
// import { Column, Id, Task } from "../types";
import ColumnContainer from "../kanbanBoard/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDndContext,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "../kanbanBoard/TaskCard";
import { useAxios } from "../../utills/axios"

const defaultCols = [
  {
    id: "onHold",
    title: "ON HOLD",
  },
  {
    id: "onGoing",
    title: "ON GOING",
  },
  {
    id: "completed",
    title: "COMPLETED",
  },
];

const defaultTasks = [
  {
    id: "1",
    columnId: "onHold",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "onGoing",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "onGoing",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "onGoing",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "completed",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "completed",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "completed",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "onHold",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "onHold",
    content: "Implement data validation",
  },

];



function KanbanBoard() {
  const instance = useAxios();
  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState(defaultTasks);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const [dragOnTask, setDragOnTask] = useState(false)

  const [dragOnColumn, setDragOnColumn] = useState(false)

  const [previousStatus, setPreviousStatus] = useState("onHold")

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    // This code will run on the client side after the component is mounted.
    const portalContainer = document.createElement('div');
    document.body.appendChild(portalContainer);

    return () => {
      // Attempt to remove portalContainer, but handle any errors
      try {
        document.body.removeChild(portalContainer);
      } catch (error) {
        console.error("Error while removing portalContainer:", error);
      }
    };
  }, []);

  useEffect(() => {
    console.log(tasks, "takss")
  }, [tasks])


  async function updateTaskStatus(task) {
    // const instance = useAxios();
    console.log(task,"rtert")
    try {
      if (task) {
        const { id, columnId } = task;
        setPreviousStatus(columnId)
        console.log(`Updating task ${id} status to ${columnId}`);
  
        // Check if the task's columnId has changed
        // if (previousStatus !== columnId) {
          // Make the API request to update the task status
          const res = await instance.post(`/admin/projects/${id}`, {
            id: columnId
          });
          
          if (res.data) {
            console.log(res.data, "resss");
          }
        // }
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div
      // style={{border:"2px solid red"}}
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]

    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          {/* <button
            onClick={() => {
              createNewColumn();
            }}
            className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-danger
      hover:ring-2
      flex
      gap-2
      "
          >
          <PlusIcon /> 
            Add Column
          </button> */}
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    console.log(id, content, "content")
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  // function createNewColumn() {
  //   const columnToAdd = {
  //     id: generateId(),
  //     title: `Column ${columns.length + 1}`,
  //   };

  //   setColumns([...columns, columnToAdd]);
  // }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event) {
    console.log("1")
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    console.log("2")
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      console.log("3")
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }





  function onDragOver(event) {
    console.log("4")

    // let shouldUpdateTaskStatus = false;
    // let shouldUpdateColumnStatus = false;
    // updateTaskStatus(event.active.data.current?.task)

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setDragOnTask(true)
      console.log("5")
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        // shouldUpdateTaskStatus = true;
        console.log("DROPPING TASK OVER TASK");
       
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setDragOnColumn(true)
      // updateTaskStatus(event.active.data.current?.task);
      console.log("6")
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
    
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
       
      });
    }

    if (dragOnColumn || dragOnColumn && dragOnTask ) {
      console.log("Start")
      updateTaskStatus(event.active.data.current?.task);
    }
  }

}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}






export default KanbanBoard;

