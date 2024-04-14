"use client";
import { useEffect, useState } from "react";
import TaskBlock, {TaskState, TaskAction, Task, TaskConsumer } from "../components/TaskBlock";
import CreateTaskDialog from "../components/CreateTaskDialog";
import TaskForm from "../components/TaskForm";

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
        <div className="z-10 max-w-4xl w-full items-center justify-center font-mono text-sm lg:flex">
            <div className="flex-1">
                {externalTasks.map((task) =>
                    <TaskBlock key={task.name} task={task} onApprove={handleApproveTask}/>
                )}
            </div>
            <div className="flex-col ">
                <div className="flex justify-end gap-2 py-2">
                    <button className="text-black hover:text-gray-500 border" onClick={() => setCreateTask(true)}>New Task</button>
                    <button className="text-black hover:text-gray-500 border">Edit Tasks</button>
                </div>
                <CreateTaskDialog open={createTask} setOpen={setCreateTask} useTask={addTask}/>
                {tasks.map((task) =>
                    <TaskBlock key={task.name} task={task}/>
                )}
            </div>
      </div>
    )
}