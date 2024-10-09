"use client"
import Title from "../componets/form/title"
import Button from "../componets/button"
import Panel from "./panel"
import React, { useState } from 'react';
const panelModes = {
    REQUESTS: 1,
    REPORT: 2,
    DEFAULT: 3
};
export default function Admin_panel(){
    const [panelMode, setPanelMode] = useState(panelModes.DEFAULT);
    const handleButtonClick = (mode: any) => {
      setPanelMode(mode);
    };
    return (
        <div className="w-full h-screen max-h-screen">
            <div className="w-full border-b-2 border-white p-4 md:p-5 fixed bg-black flex flex-row items-center justify-center">
                <div className="text-center md:text-left md:w-1/2 mr-2">
                    <Title label="Panel serwisanta"></Title>
                </div>
                <div className="flex flex-right justify-end md:w-1/2">
                    <Button content="Zapytania serwisowe" onClick={() => handleButtonClick(panelModes.REQUESTS)} />
                    <Button content="Dodaj zapytanie" onClick={() => handleButtonClick(panelModes.REPORT)} />
                    <Button content="Wyloguj się" />
                </div>
            </div>
            <div className="w-full border-b-2 border-white p-4 md:p-5 invisible bg-black flex-row items-center justify-center">
                <div className="text-center md:text-left md:w-1/2 mr-2">
                    <Title label="Panel serwisanta"></Title>
                </div>
                <div className="flex flex-right justify-end md:w-1/2">
                    <Button content="Zapytania serwisowe" onClick={() => handleButtonClick(panelModes.REQUESTS)} />
                    <Button content="Dodaj zapytanie" onClick={() => handleButtonClick(panelModes.REPORT)} />
                    <Button content="Wyloguj się" />
                </div>
            </div>
            <div className="flex justify-center items-center h-full">
                <div className="p-10">
                    <Panel options={panelMode}></Panel>
                </div>
            </div>
        </div>
    )
}