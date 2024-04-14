"use client";
import { useState } from "react";
import TaskBlock, {TaskState, TaskAction, Task, TaskConsumer } from "../components/task-card";
import CreateTaskDialog from "../components/create-task-dialog";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const defaultTasks = [
    {name:"Dishes", amount: 1, parentView: true, state: TaskState.Pending, info: "Do that dishes when they pile up.", actions: [TaskAction.Approve]},
    {name:"Laundry", amount: 1, parentView: true, state: TaskState.Transfered, info: "Do your laundry every week.", actions: [TaskAction.Info, TaskAction.Repeat], completedOn: new Date("04/09/2024")},
    {name:"Mow Lawn", amount: 10, parentView: true, state: TaskState.Transfered, info: "Mow the lawn every week (every 2 weeks during winter).", actions: [TaskAction.Info, TaskAction.Repeat], completedOn: new Date("04/07/2024")},
] as Task[];

const defaultExternalTasks = [
    {name:"Mow", amount: 20, parentView: true, state: TaskState.Available, info: "Mow the lawn for 80-year old neighbor, Fred. Bring your own lawn mower and knock at the door beforehand.", actions: [TaskAction.Info], completedOn: new Date("04/09/2024")},
    {name:"Wash Car", amount: 10, parentView: true, state: TaskState.Available, info: "Mow the lawn every week (every 2 weeks during winter).", actions: [TaskAction.Info, TaskAction.Repeat], completedOn: new Date("04/07/2024")},
] as Task[];

export default function ParentPage() {
    const [createTask, setCreateTask] = useState(false);
    const [tasks, setTasks] = useState(defaultTasks);
    const [externalTasks, setExternalTasks] = useState(defaultExternalTasks);

    function addTask(...[task] : Parameters<TaskConsumer>): ReturnType<TaskConsumer> {
        setTasks([...tasks, task]);
    }

    function handleApproveTask(task: Task) {
        // Remove the element from the external tasks
        setExternalTasks(externalTasks.filter(t => t.name !== task.name))
        // Add the element to the internal tasks
        addTask(task)
    }

    return (
        <div className="columns-2 w-full h-screen flex items-center justify-center gap-4 overflow-y-auto">
            <div className="w-1/4 h-full">
                <h1>External Tasks</h1>
                {externalTasks.map((task) =>
                    <TaskBlock key={task.name} task={task} onApprove={handleApproveTask}/>
                )}
            </div>
            <div className="w-1/4 h-full">
                <h1>Available Tasks</h1>
                <div className="flex justify-end">
                    <button className="text-gray-500 hover:text-black size-5" onClick={() => setCreateTask(true)}>
                        <PlusIcon/>
                    </button>
                    <button className="text-gray-500 hover:text-black size-5">
                        <PencilSquareIcon/>
                    </button>
                </div>
                {tasks.map((task) =>
                    <TaskBlock key={task.name} task={task}/>
                )}
            </div>
            <CreateTaskDialog open={createTask} setOpen={setCreateTask} useTask={addTask}/>
      </div>
    )
}