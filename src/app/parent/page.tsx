"use client";
import { useEffect, useState } from "react";
import TaskBlock, {TaskState, TaskAction, Task, TaskConsumer } from "../components/TaskBlock";
import CreateTaskDialog from "../components/CreateTaskDialog";
import TaskForm from "../components/TaskForm";

const defaultTasks = [
    {name:"Laundry", amount: 10, parentView: true, state: TaskState.Transfered, info: "Do your laundry every week.", actions: [TaskAction.Info, TaskAction.Repeat]}
] as Task[];

export default function ParentPage() {
    const [createTask, setCreateTask] = useState(false);
    const [tasks, setTasks] = useState(defaultTasks);

    function addTask(...[task] : Parameters<TaskConsumer>): ReturnType<TaskConsumer> {
        setTasks([...tasks, task]);
    }

    return (
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
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