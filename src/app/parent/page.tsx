"use client";
import { useState, useContext } from "react";
import TaskBlock, {TaskState, Task, TaskConsumer } from "../components/task-card";
import CreateTaskDialog from "../components/create-task-dialog";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../components/accounts";

export default function ParentPage() {
    const [user] = useState(useContext(UserContext));
    const [tasks, setTasks] = useState(user.tasks);
    const [createTask, setCreateTask] = useState(false);

    function addTask(...[task] : Parameters<TaskConsumer>): ReturnType<TaskConsumer> {
        setTasks([...tasks, task]);
    }

    function handleApproveTask(task: Task) {
        // Remove the task
        setTasks(tasks.filter(t => t.name !== task.name))
        // Add the element to the child's task list
        if (user.children) {
            user.children.forEach((user) => user.tasks = user.tasks.concat(task))
        }
    }

    return (
        <div className="columns-2 w-full h-screen flex items-center justify-center gap-4 overflow-y-auto">
            <div className="w-1/4 h-full">
                <h1>External Tasks</h1>
                {tasks.map((task) =>
                    (task.external && task.state !== TaskState.Approved) && <TaskBlock key={task.name} task={task} onApprove={handleApproveTask}/>
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
                    (!task.external || task.state === TaskState.Approved) && <TaskBlock key={task.name} task={task}/>
                )}
            </div>
            <CreateTaskDialog open={createTask} setOpen={setCreateTask} useTask={addTask}/>
      </div>
    )
}