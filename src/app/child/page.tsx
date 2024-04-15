"use client";
import { useContext } from "react";
import TaskBlock, {TaskState, TaskAction, Task, TaskConsumer } from "../components/task-card";
import { User, UserContext } from "../components/accounts";
import TransactionCard from "../components/transaction-card";
import street_map from "./street_map_edited.png";
import Header from "../components/header";

export default function ChildPage() {
    let user = useContext(UserContext);
    if (user.children) {
        user = user.children[0];
    }

    return (
        <div className="flex-col items-center justify-center overflow-y-auto">
            <div className="m-auto w-1/2">
                <Header user={user}/>
            </div>
            <img className="w-1/2 m-auto mt-10 mb-5" src={street_map.src} alt="Street map view of local tasks" />
            <div className="columns-2 w-full flex items-center justify-center gap-4">
                <div className="w-1/4 h-full">
                    <h1>Recent Transactions</h1>
                    {user.transactions && user.transactions.map((transaction) =>
                        <TransactionCard key={transaction.name} transaction={transaction}/>
                    )}
                </div>
                <div className="w-1/4 h-full">
                    <h1>Available Tasks</h1>
                    {user.tasks && user.tasks.map((task) =>
                        <TaskBlock key={task.name} task={task}/>
                    )}
                </div>
            </div>
        </div>
    )
}