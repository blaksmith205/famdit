"use client";
import { usePathname } from 'next/navigation'
import { Menu } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid'

export default function Header({links}: {links: {href: string, label: string}[]}) {
    const pathname = usePathname()

    return (
        <header className='fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 gap-80'>
            <a href='/'>
                <UserIcon
                    className="-mr-1 ml-2 h-20 w-20 text-gray-200 hover:text-gray-100"
                    aria-hidden="true"
                />
            </a>
            { pathname !== "/" ? <h1 className='float-center'>Welcome {pathname}!</h1> : <></>}
            
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                    Sign In As
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5 text-gray-200 hover:text-gray-100"
                        aria-hidden="true"
                    />
                </Menu.Button>
                <Menu.Items
                    className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {links.map((link) => (
                        /* Use the `active` state to conditionally style the active item. */
                        <Menu.Item key={link.href} as={Fragment}>
                            {({ active }) => (
                                <a href={link.href} className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>{link.label}</a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </header>
    )

}