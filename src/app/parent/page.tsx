"use client";

import TaskBlock from "../components/TaskBlock";

export default function ParentPage() {
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
            <div className="flex-col ">
            <div className="flex-row ">
                <button className="">New Task</button>
                <button className="">Edit Tasks</button>
            </div>
            <TaskBlock taskName={"Laundry"} amount={10} icons={[0,1,2]} date={new Date()}/>
            </div>
      </div>
    )
}