"use client";
import { createContext, useEffect, useState } from 'react';
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
    children?: User[];
}

export const UserContext = createContext({} as User);

const defaultTasks = [
    {name:"Dishes", amount: 1, parentView: true, state: TaskState.Pending, info: "Do that dishes when they pile up.", actions: [TaskAction.Approve], completedOn: new Date("04/09/2024"), external: false},
    {name:"Laundry", amount: 1, parentView: true, state: TaskState.Transfered, info: "Do your laundry every week.", actions: [TaskAction.Info, TaskAction.Repeat], completedOn: new Date("04/09/2024"), external: false},
    {name:"Mow Lawn", amount: 10, parentView: true, state: TaskState.Transfered, info: "Mow the lawn every week (every 2 weeks during winter).", actions: [TaskAction.Info, TaskAction.Repeat], completedOn: new Date("04/07/2024"), external: false},
    {name:"Mow", amount: 20, parentView: true, state: TaskState.Available, info: "Mow the lawn for 80-year old neighbor, Fred. Bring your own lawn mower and knock at the door beforehand.", actions: [TaskAction.Info], completedOn: new Date("04/21/2024"), external: true},
    {name:"Wash Car", amount: 10, parentView: true, state: TaskState.Available, info: "Mow the lawn every week (every 2 weeks during winter).", actions: [TaskAction.Info], completeBy: new Date("04/21/2024"), external: true},
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

function userReviver(key: string, value: any) {
    switch (key) {
        case "state": return value as TaskState
        case "actions": return value.map((action: number) => action as TaskAction)
        case "date": case "completedOn": case "completeBy":return new Date(value)
        default: return value;
    }
}

export function saveUser(user: User) {
    window.sessionStorage.setItem("famdit-user", JSON.stringify(user));
}

export function UserProvider({ children }: Readonly<{children: React.ReactNode}>) {
  const [user, setUser] = useState({} as User);

  // Only perform once
  useEffect(() => {
    let usr = window.sessionStorage.getItem("famdit-user");
    if (usr) {
        setUser(JSON.parse(usr, userReviver));
    } else {
        setUser(parentUser);
        saveUser(parentUser)
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
  )
}