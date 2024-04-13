"use client";
import TaskBlock, {TaskState, createClickableInfo, apply, createClickableApprove, createClickableRepeat, TaskAction } from "../components/TaskBlock";

export default function ParentPage() {
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
            <div className="flex-col ">
                <div className="flex-row ">
                    <button className="">New Task</button>
                    <button className="">Edit Tasks</button>
                </div>
                <TaskBlock task={{name:"Laundry", amount: 10, parentView: true, state: TaskState.Transfered, info: "Do your laundry every week.", actions: [TaskAction.Info, TaskAction.Approve, TaskAction.Repeat]}}/>
            </div>
      </div>
    )
}