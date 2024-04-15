"use client";
import { useState, useContext } from "react";
import TaskBlock, {TaskState, Task, TaskConsumer } from "./components/task-card";
import CreateTaskDialog from "./components/create-task-dialog";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { User, UserContext, saveUser } from "./components/accounts";
import ChildCard from "./components/child-card";
import Header from "./components/header";

export default function ParentPage() {
    let user = useContext(UserContext);
    const [createTask, setCreateTask] = useState(false);

    function setTasks(tasks: Task[]) {
        user.tasks = tasks;
        saveUser(user);
    }

    function addTask(...[task] : Parameters<TaskConsumer>): ReturnType<TaskConsumer> {
        setTasks([...user.tasks, task]);
    }

    function handleApproveTask(task: Task) {
        // Add the element to the child's task list
        if (user.children) {
            user.children.forEach((user) => user.tasks = user.tasks.concat(task))
        }
        // Remove the task
        setTasks(user.tasks.filter(t => t.name !== task.name))
    }

    function addFunds(child: User) {
        console.log("Add funds to child: " + child.name);
    }

    if (user) {
        return (
            <div>
                <div className="flex-col items-center justify-center overflow-y-auto">
                    <div className="m-auto w-1/2">
                        <Header user={user}/>
                    </div>
                    <div className="w-40 m-auto mt-10 mb-5">
                        {user.children && user.children.map((child) => 
                            <ChildCard key={child.name} child={child} addFunds={addFunds}/>
                        )}
                    </div>
                    <div className="columns-2 h-screen flex items-center justify-center gap-4 overflow-y-auto">
                        <div className="w-1/4 h-full">
                            <h1>External Tasks</h1>
                            {user.tasks && user.tasks.map((task) =>
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
                            {user.tasks && user.tasks.map((task) =>
                                (!task.external || task.state === TaskState.Approved) && <TaskBlock key={task.name} task={task}/>
                            )}
                        </div>
                        <CreateTaskDialog open={createTask} setOpen={setCreateTask} useTask={addTask}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}