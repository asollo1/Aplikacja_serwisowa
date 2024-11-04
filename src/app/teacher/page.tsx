"use client"
import Title from "../componets/form/title"
import Button from "../componets/button"
import Panel from "./panel"
import React, { useState } from 'react';
import Validator from '../componets/validator'
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
    if(Validator("1")){
        return (
            <div className="flex flex-row h-screen w-screen">
                <div className="w-full border-b-2 border-white p-4 md:p-5 fixed bg-black flex flex-row items-center justify-center">
                    <div className="text-center md:text-left md:w-1/2 mr-2">
                        <Title label="Panel nauczyciela"></Title>
                    </div>
                    <div className="flex flex-right justify-end md:w-1/2">
                        <Button content="Zapytania serwisowe" onClick={() => handleButtonClick(panelModes.REQUESTS)} />
                        <Button content="Dodaj zapytanie" onClick={() => handleButtonClick(panelModes.REPORT)} />
                        <Button content="Wyloguj się" />
                    </div>
                </div>
                <div className="h-full w-screen p-10 flex flex-col mt-24">
                    <Panel options={panelMode}></Panel>
                </div>
            </div>
        )
    } else {
        window.location.href ='/login';
    }
}