"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInfo, faClockRotateLeft, faCheck} from '@fortawesome/free-solid-svg-icons'

export default function TaskBlock(prop : {taskName : string, amount : number, icons: Array<number>, date: Date}) {
    function showInfo(event: MouseEvent) {
        console.log("Show info...")
        return <></>
    }
    
    function approve(event: MouseEvent) {
        console.log("Approve...")
        return <></>        
    }

    function showDuration(event: MouseEvent) {
        console.log("Show Duration...")
        return <></>
    }

    function getIcon(val: number){
        let icon = null;
        let callback = null;
        switch (val) {
            case 0:
                icon = faInfo;
                callback = showInfo;
                break;
            case 1:
                icon = faClockRotateLeft;
                callback = showDuration;
                break;
            case 2:
                icon = faCheck;
                callback = approve;
                break;
        }
        if (icon !== null) {
            return <FontAwesomeIcon key={val} icon={icon} onClick={callback} border width="20px"/>
        } else {
            return <></>
        }
    }
    return (
        <div className="gap-4 top-0 z-50 px-4 py-4 shadow-md bg-white">
            <div className="flex gap-4 align-right">
                <div>{prop.taskName}</div>
                <div className='text-green'>${prop.amount}</div>
                <div className='inline-flex flex-row'>
                    {prop.icons?.map((icon) => 
                        getIcon(icon)
                    )}
                </div>
            </div>
            <div>
                Completed on: {prop.date.toLocaleDateString()}
            </div>
        </div>
    )
}