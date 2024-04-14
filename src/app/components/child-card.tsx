import { User } from "./accounts";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ChildCard({child, addFunds}: {child: User, addFunds?: (child: User) => void}) {
    return (
        <div className="flex-inline flex gap-4 rounded p-2 shadow-md bg-white mb-2 border">
            <h1>{child.name}</h1>
            {child.balance && child.balance <= 0 
            ? <h1 className="text-red-400">${(-child.balance).toFixed(2)}</h1> 
            : <h1 className="text-green-400">${child.balance?.toFixed(2)}</h1>
            }
            <button className="text-gray-500 hover:text-black size-6" onClick={() => addFunds && addFunds(child)}>
                <PlusIcon/>
            </button>
        </div>
    )
}