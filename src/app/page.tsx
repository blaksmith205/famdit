"use client";
import Image from "next/image";
import TaskBlock from "./components/TaskBlock";
import Header from "./components/Header";
import Link from "next/link";
import { CardHeader } from "@material-tailwind/react";
import ParentPage from "./parent/page";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("Parent");


  return (
    <main className="">
      <Header links={[{href: "/parent", label:"Parent"}, {href: "/john", label:" Child - John"}]}/>
      {/* <ParentPage/> */}
    </main>
  );
}
