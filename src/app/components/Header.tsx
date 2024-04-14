"use client";
import { Menu } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid'
import { User } from './accounts';

export type UserRoute = {
    href: string;
    label: string;
}

const routes = [
    {href: "/", label: "Parent"}, 
    {href: "/child", label: "John"},
 ] as UserRoute[];

export default function Header({user}: {user?: User}) {

    return (
        <div className='grid grid-cols-3 mt-2 items-center justify-center'>
            <a className="size-14 text-gray-500 hover:text-black" href='/'>
                <UserIcon aria-hidden="true"/>
            </a>
            <div className='text-center'>
                {user && <h1>Welcome {user.name}!</h1>}
                {user && user.balance && 
                    <div className='inline-flex flex-row gap-2'>
                        <h3 className='text-sm text-black'>Available Balance</h3>
                        <h3 className='text-sm text-green-400'>${user.balance.toFixed(2)}</h3>
                    </div>
                }
            </div>
            <div className="text-right">
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        Sign In As
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-gray-100 hover:text-black"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <Menu.Items
                        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className='px-1 py-1'>
                            {routes.map((link) => (
                                /* Use the `active` state to conditionally style the active item. */
                                <Menu.Item key={link.href} as={Fragment}>
                                    {({ active }) => (
                                        <a href={link.href} className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>{link.label}</a>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Menu>
            </div>
        </div>
    )
}