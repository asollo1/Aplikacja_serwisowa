"use client"
import Title from "../componets/form/title"
import Button from "../componets/ui_elements/button"
import Panel from "./panel"
import React, { useState } from 'react';
import Validator from "../componets/scripts/validator";
import Logoff from "../componets/scripts/logoff"
import { useRouter } from 'next/navigation'
const panelModes = {
    REQUESTS: 1,
    USERS: 2,
    LOGS: 3,
    DEFAULT: 4,
};
export default function Admin_panel(){
    const router = useRouter()
    const [panelMode, setPanelMode] = useState(panelModes.DEFAULT);
    const handleButtonClick = (mode: any) => {
      setPanelMode(mode);
    };
    if (!Validator("3")){
        router.push("/login");
        return null;  // Return null if user is not logged in. 
    }else{
        return (
            <div className="flex flex-col md:flex-row h-screen w-screen">
                <div className="md:w-1/5"></div>
                <div className="md:h-full w-full md:w-1/5 border-b-2 md:border-b-0 md:border-r-2 border-white p-4 md:p-10 fixed bg-black md:bg-transparent md:flex md:flex-col md:items-center md:justify-center">
                    <div className="text-center md:text-left"><Title label="Admin panel"></Title></div>
                    <div className="mt-2 mb:mt-10 text-center">
                        <Button content="Requests" onClick={() => handleButtonClick(panelModes.REQUESTS)} />
                        <Button content="Users" onClick={() => handleButtonClick(panelModes.USERS)} />
                        <Button content="Log off" onClick={() => {Logoff();}}/>
                    </div>
                </div>
                <div className="h-full md:w-4/5 p-10 flex flex-col mt-24 md:mt-0">
                    <Panel options={panelMode}></Panel>
                </div>
            </div>
        )
    }
}