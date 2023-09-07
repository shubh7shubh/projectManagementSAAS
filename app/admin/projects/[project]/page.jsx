"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewProject = ({params}) => {
    const router = useRouter();



    return (
        <div>
            This is a project {params.project}
        </div>
    );
};

export default NewProject;
