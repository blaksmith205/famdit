"use client";
import { createContext, useState } from 'react';
import { Task, TaskAction, TaskState } from "./task-card";

export type Transaction = {
    name: string;
    amount: number;
    date: Date;
}

export type User = {
    name: string;
    tasks: Task[];
    balance?: number;
    transactions?: Transaction[];
    parent?: User;
    children?: User[];
}

export const UserContext = createContext({} as User);

const defaultTasks = [
    {name:"Dishes", amount: 1, parentView: true, state: TaskState.Pending, info: "Do that dishes when they pile up.", actions: [TaskAction.Approve], completedOn: new Date("04/09/2024")},
    {name:"Laundry", amount: 1, parentView: true, state: TaskState.Transfered, info: "Do your laundry every week.", actions: [TaskAction.Info, TaskAction.Repeat], completedOn: new Date("04/09/2024")},
    {name:"Mow Lawn", amount: 10, parentView: true, state: TaskState.Transfered, info: "Mow the lawn every week (every 2 weeks during winter).", actions: [TaskAction.Info, TaskAction.Repeat], completedOn: new Date("04/07/2024")},
] as Task[];

const defaultExternalTasks = [
    {name:"Mow", amount: 20, parentView: true, state: TaskState.Available, info: "Mow the lawn for 80-year old neighbor, Fred. Bring your own lawn mower and knock at the door beforehand.", actions: [TaskAction.Info], completedOn: new Date("04/21/2024")},
    {name:"Wash Car", amount: 10, parentView: true, state: TaskState.Available, info: "Mow the lawn every week (every 2 weeks during winter).", actions: [TaskAction.Info], completedBy: new Date("04/21/2024")},
] as Task[];

const defaultTransactions = [
    {name: "Walmart", amount: -27.91, date: new Date("04/09/2024")},
    {name: "Amazon", amount: -25.00, date: new Date("04/09/2024")},
    {name: "Task Payment - Mow Lawn", amount: 10.00, date: new Date("04/07/2024")},
] as Transaction[];

const parentUser = {
    name: "Parent",
    tasks: defaultTasks
} as User;

const childUser = {
    name: "John",
    tasks: [defaultTasks[0]],
    balance: 100,
    transactions: defaultTransactions,
    parent: parentUser,
} as User;

parentUser.children = [childUser];

export function UserProvider({ children }: Readonly<{children: React.ReactNode}>) {
  const [user, setUser] = useState(childUser);

  return (
    <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
  );
}