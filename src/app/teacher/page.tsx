"use client"
import Title from "../componets/form/title"
import Button from "../componets/ui_elements/button"
import Panel from "./panel"
import React, { useState } from 'react';
import Validator from '../componets/scripts/validator'
import Logoff from "../componets/scripts/logoff";
import { useRouter } from 'next/navigation'
const panelModes = {
    REQUESTS: 1,
    REPORT: 2,
    USER_DATA: 3,
    DEFAULT: 4
};
export default function Admin_panel(){
    const router = useRouter()
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
                        <Button content="Dane użytkownika" onClick={() => handleButtonClick(panelModes.USER_DATA)} />
                        <Button content="Wyloguj się" onClick={() => Logoff()}/>
                    </div>
                </div>
                <div className="h-full w-screen p-10 flex flex-col mt-24">
                    <Panel options={panelMode}></Panel>
                </div>
            </div>
        )
    } else {
        router.push('/login');
        return null;  // Return null if user is not logged in.
    }
}