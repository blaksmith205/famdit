"use client";
import { useContext } from "react";
import TaskBlock, {TaskState, TaskAction, Task, TaskConsumer } from "../components/task-card";
import { User, UserContext } from "../components/accounts";
import TransactionCard from "../components/transaction-card";

export default function ChildPage() {
    let user = useContext(UserContext);
    if (user.children) {
        user = user.children[0];
    }

    return (
        <div className="columns-2 w-full h-screen flex items-center justify-center gap-4 overflow-y-auto">
            <div className="w-1/4 h-full">
                <h1>Recent Transactions</h1>
                {user.transactions && user.transactions.map((transaction) =>
                    <TransactionCard key={transaction.name} transaction={transaction}/>
                )}
            </div>
            <div className="w-1/4 h-full">
                <h1>Available Tasks</h1>
                {user.tasks.map((task) =>
                    <TaskBlock key={task.name} task={task}/>
                )}
            </div>
      </div>
    )
}