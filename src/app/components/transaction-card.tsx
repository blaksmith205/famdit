import { Transaction } from "./accounts";

export default function TransactionCard({transaction}: {transaction: Transaction}) {
    return (
        <div className="grid grid-cols-2 rounded p-2 shadow-md bg-white mb-2">
            <div className="h-full">
                <h2>{transaction.name}</h2>
                <div className="text-xs">{transaction.date.toLocaleDateString()}</div>
            </div>
            {transaction.amount <= 0 
            ? <h1 className="flex items-center justify-end text-red-400">${(-transaction.amount).toFixed(2)}</h1> 
            : <h1 className="flex items-center justify-end text-green-400">${transaction.amount.toFixed(2)}</h1>
            }
        </div>
    )
}