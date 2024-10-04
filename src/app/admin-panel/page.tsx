"use client"
import Title from "../componets/form/title"
import Button from "../componets/button"
import Panel from "./panel"
import React, { useState } from 'react';
const panelModes = {
    REQUESTS: 1,
    USERS: 2,
    LOGS: 3,
    DEFAULT: 4,
};
export default function Admin_panel(){
    const [panelMode, setPanelMode] = useState(panelModes.DEFAULT);
  
    const handleButtonClick = (mode: any) => {
      setPanelMode(mode);
    };
    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="h-full w-1/5 border-r-2 border-white p-10 flex flex-col items-center justify-center">
                <Title label="Admin panel"></Title>
                <div className="mt-10 text-center">
                    <Button content="Requests" onClick={() => handleButtonClick(panelModes.REQUESTS)} />
                    <Button content="Users" onClick={() => handleButtonClick(panelModes.USERS)} />
                    <Button content="Logs" onClick={() => handleButtonClick(panelModes.LOGS)} />
                    <Button content="Log off" />
                </div>
            </div>
            <div className="h-full w-4/5 p-10 flex flex-col">
                <Panel options={panelMode}></Panel>
            </div>
        </div>
    )
}