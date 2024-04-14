import { FormEventHandler, useState } from 'react'
import { Task, TaskAction, TaskState, TaskConsumer } from './task-card'

const emptyTask = {
    name: "",
    amount: 0,
    parentView: true,
    state: TaskState.Available,
} as Task;

export default function TaskForm({useTask} : {useTask: TaskConsumer}) {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [info, setInfo] = useState("");

    function submitForm(...[e] : Parameters<FormEventHandler>) : ReturnType<FormEventHandler> {
        if (!e || !name || !amount) {
            return;
        }
        e.preventDefault();
        let newTask = structuredClone(emptyTask);
        newTask.name = name
        newTask.amount = amount
        if (info) {
            newTask.info = info;
            addAction(newTask, TaskAction.Info)
        }
        useTask(newTask);
        setName("");
        setAmount(0);
        setInfo("")
    }

    function addAction(task: Task, action: TaskAction) {
        if (task.actions) {
            task.actions.push(action)
        } else {
            task.actions = [action]
        }
    }

    return (
        <div className="w-full">
            <form className="p-4 mb-4" onSubmit={submitForm}>
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">Task Name</label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <br />
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="amount">Amount</label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))} />
                <br />
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="info">Task Info:</label>
                <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="info"
                    id="info"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)} />
                <button
                    type="submit"
                    className="flex-1 mt-4 justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Create Task
                </button>
            </form>
        </div>
    )
}