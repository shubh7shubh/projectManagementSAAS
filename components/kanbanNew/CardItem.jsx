"use client"
import React from "react";
// import Image from "next/dist/client/image";

import { FaBeer } from 'react-icons/fa';
import Image from 'next/image'
import Chip from '@mui/material/Chip';
// import {
//   ChevronDownIcon,
//   PlusIcon,
//   DotsVerticalIcon,
//   ChatAlt2Icon,
//   PaperClipIcon,
// } from "@heroicons/react/outline";
import { Draggable } from "react-beautiful-dnd";

function CardItem({ data, index }) {
  console.log(data,"nenjfn")
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-4"
        >
          {/* <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
                data.priority === 0
                  ? "from-blue-600 to-blue-400"
                  : data.priority === 1
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
              }
              `}
          >
            {data.priority === 0
              ? "Low Priority"
              : data.priority === 1
              ? "Medium Priority"
              : "High Priority"}
          </label> */}
          <h5 className="text-md font-bold my-3 text-lg leading-6 text-black">{data.title}</h5>

          
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
              <Chip label={ data.taskPriority} color="primary" />
                {/* <span className="text-black">dfdhfdjhfd</span> */}
              </span>
              {/* <span className="flex space-x-1 items-center">
                <FaBeer className="w-4 h-4 text-gray-500" />
                <span>dhfdjskj</span>
              </span> */}
            </div>



            {/* <ul className="flex space-x-3">
              {data.assignees.map((ass, index) => {
                return (
                  <li key={index}>
                    <Image
                      src={ass.avt}
                      width="36"
                      height="36"
                      objectFit="cover"
                      className=" rounded-full "
                    />
                  </li>
                );
              })}
              <li>
                <button
                  className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                    rounded-full"
                >
                  <PlusIcon className="w-5 h-5 text-gray-500" />
                </button>
              </li>
            </ul> */}
          </div>

          <div className="my-4">
            <p className="text-black">{data.description} </p>
          </div>
        </div>
        
      )}
    </Draggable>
  );
}

export default CardItem;
