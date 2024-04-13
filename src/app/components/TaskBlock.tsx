"use client";
import { ClockIcon, CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import InfoDialog from "./InfoDialog";

export enum TaskState {
    Available, // Color with black text
    Pending, // Color with yellow text
    Credited, // Color with green text
    Transfered, // Color with red text
}

export enum TaskAction {
    Info, // Show extra information associated with the task
    Approve, // Allow the task to be approved by the parent
    Repeat, // Allow the task to be scheduled
}

export type Task = {
    name: string;
    amount: number;
    parentView: boolean; // When true, the task is shown in the parent view
    state: TaskState;
    info: string;
    actions?: TaskAction[];
    completedOn?: Date;
}

function approve(task: Task) {
    console.log("Approve task:", task);
}

function repeatTask(task: Task) {
    console.log("Repeat task:", task);
}

function getStyle(task: Task) {
    let style = "";
    switch (task.state) {
        case TaskState.Available:
            style = "text-black-400";
            break;
        case TaskState.Pending:
            style = "text-yellow-400";
            break;
        case TaskState.Credited:
            style = "text-green-400";
            break;
        case TaskState.Transfered:
            style = "text-red-400";
            break;
    }
    return style;
}

function buildButton(action: TaskAction, task: Task, stateChanger : (state: boolean) => void) {
    let ref = null;

    switch (action) {
        case TaskAction.Info:
            ref = {icon: InformationCircleIcon, handler: () => stateChanger(true)};
            break;
        case TaskAction.Approve:
            ref = {icon: CheckCircleIcon, handler: () => approve(task)};
            break;
        case TaskAction.Repeat:
            ref = {icon: ClockIcon, handler: () => repeatTask(task)};
            break;
    }
    if (ref) {
        return (
            <button key={action} onClick={ref.handler}>
                <ref.icon className="size-6 text-black-200 hover:text-black-100" aria-hidden="true"/>
            </button>
        )
    } else {
        return (<></>)
    }
}

export default function TaskBlock({task}: {task: Task}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    return (
        <>
        <div className="rounded-md p-2 shadow-md bg-white">
            <div className='flex justify-end'>
                {task.actions?.map((action) => buildButton(action, task, setDialogOpen))}
            </div>
            <div className="border-b-2 p-1 flex">
                <h1 className="flex-1">{task.name}</h1>
                <div className={getStyle(task)}>${task.amount.toFixed(2)}</div>
            </div>
            <div className="text-xs">
                Completed on: {task.completedOn ? task.completedOn.toLocaleDateString() : new Date().toLocaleDateString()}
            </div>
        </div>
        <InfoDialog task={task} open={dialogOpen} setOpen={setDialogOpen}/>
        </>
    )
}