"use client"
import Title from "../componets/form/title"
import Button from "../componets/ui_elements/button"
import Panel from "./panel"
import React, { LegacyRef, useRef, useState } from 'react';
import Validator from "../componets/scripts/validator";
import Logoff from "../componets/scripts/logoff"
import { useRouter } from 'next/navigation'

let buttons_shown = false;

const panelModes = {
    REQUESTS: 1,
    USERS: 2,
    USER_DATA: 3,
    REPORT_FORM: 4,
    DEFAULT: 5
};
export default function Admin_panel() {
    const router = useRouter()
    const buttons = useRef<HTMLDivElement>(null)
    const [panelMode, setPanelMode] = useState(panelModes.DEFAULT);
    const handleButtonClick = (mode: any) => {
        setPanelMode(mode);
    };
    if (!Validator("3")) {
        router.push("/login");
        return null;  // Return null if user is not logged in. 
    } else {
        return (
            <div className="flex flex-row h-screen w-screen">
                <div className="w-full border-b-2 border-black dark:border-white p-4 md:p-5 fixed bg-white dark:bg-black flex flex-col md:flex-row items-center justify-center">
                    <div className="text-center md:text-left md:w-1/2 mr-2">
                        <Title label="Panel administratora"></Title>
                    </div>
                    <div className="hidden md:flex flex-col md:flex-row md:flex-right justify-center md:justify-end md:w-1/2" ref={buttons as LegacyRef<HTMLDivElement>}>
                        <Button content="Zapytania serwisowe" onClick={() => handleButtonClick(panelModes.REQUESTS)} />
                        <Button content="Użytkownicy" onClick={() => handleButtonClick(panelModes.USERS)} />
                        <Button content="Dane użytkownika" onClick={() => handleButtonClick(panelModes.USER_DATA)} />
                        <Button content="Formularz zgłoszeniowy" onClick={() => handleButtonClick(panelModes.REPORT_FORM)} />
                        <Button content="Wyloguj się" onClick={() => { Logoff(); }} />
                    </div>
                    <div className="md:hidden">
                        <Button content="[---]" onClick={() => {
                            if (buttons_shown){
                                buttons.current!.className = "hidden md:flex flex-col md:flex-right justify-center md:justify-end md:w-1/2";
                                buttons_shown = false;
                            } else {
                                buttons.current!.className = "flex md:flex flex-col md:flex-right justify-center md:justify-end md:w-1/2";
                                buttons_shown = true;
                            }
                        }}/>
                    </div>
                </div>
                <div className="h-full w-screen p-10 flex flex-col mt-24">
                    <Panel options={panelMode}></Panel>
                </div>
            </div>
        )
    }
}