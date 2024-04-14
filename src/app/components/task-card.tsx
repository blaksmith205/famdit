"use client";
import { ClockIcon, CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import InfoDialog from "./info-dialog";

export enum TaskState {
    Available, // Color with black text
    Approved, // Color with black text
    Pending, // Color with yellow text
    Credited, // Color with green text
    Transfered, // Color with red text
}

export enum TaskAction {
    Info, // Show extra information associated with the task
    Approve, // Allow the task to be approved by the parent
    Repeat, // Allow the task to be scheduled
}

export type TaskConsumer = (task: Task) => void

export type Task = {
    name: string;
    amount: number;
    parentView: boolean; // When true, the task is shown in the parent view
    state: TaskState;
    external: boolean;
    info?: string;
    actions?: TaskAction[];
    completedOn?: Date;
    completeBy?: Date;
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
        case TaskState.Approved:
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
            // Show the Info Dialog when the icon is pressed
            ref = {icon: InformationCircleIcon, handler: () => stateChanger(true)};
            break;
        case TaskAction.Approve:
            // Approve the task when the icon is pressed
            ref = {icon: CheckCircleIcon, handler: () => approve(task)};
            break;
        case TaskAction.Repeat:
            // Open the repeat dialog when the icon is pressed
            ref = {icon: ClockIcon, handler: () => repeatTask(task)};
            break;
    }
    if (ref) {
        return (
            <button key={action} onClick={ref.handler}>
                <ref.icon className="size-6 text-gray-500 hover:text-black" aria-hidden="true"/>
            </button>
        )
    } else {
        return (<></>)
    }
}

function getDate(task: Task): string {
    let nowDate = new Date().toLocaleDateString()
    // Need the parent to approve the task by reading through the requirements (info)
    // Or the task to be available for the child
    if ((task.parentView && task.state <= TaskState.Approved) || (!task.parentView && task.state <= TaskState.Approved)) {
        return "Complete by " + (task.completeBy ? task.completeBy.toLocaleDateString() : nowDate)
    } else {
        return "Completed " + (task.completedOn ? task.completedOn.toLocaleDateString() : nowDate)
    }
}

export default function TaskBlock({task, onApprove}: {task: Task, onApprove?: TaskConsumer}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    return (
        <>
        <div className="rounded p-2 shadow-md bg-white mb-2">
            <div className='flex justify-end'>
                {task.actions?.map((action) => buildButton(action, task, setDialogOpen))}
            </div>
            <div className="border-b-2 p-1 flex">
                <h1 className="flex-1">{task.name}</h1>
                <div className={getStyle(task)}>${task.amount.toFixed(2)}</div>
            </div>
            <div className="text-xs">{getDate(task)}</div>
        </div>
        <InfoDialog task={task} open={dialogOpen} setOpen={setDialogOpen} onApprove={onApprove}/>
        </>
    )
}