import React from 'react'
import Button from "./componets/button"
import Nav_item from "./componets/navbar"
import logo from "./logo.svg"
import Link from 'next/link'
export default function Home() {
  var Logo = logo;
  return (
    <div className="min-h-screen">
      {/* Nabar */}
      <div className="w-full min-h-10 bg-black border-b-2 border-white flex flex-row fixed">
        <Nav_item align="left" content={<div className="h-10"><img className='max-h-full' src={logo.src} /></div>} />
        <Nav_item align="right" content={
          <Link href='/login'>
            <Button content={'Logowanie'} />
          </Link>
        } />
      </div>
      {/* Main */}
      <div className="w-full h-screen">
        <div className="h-full flex items-center">
          <div className="text-2xl p-10">
            <h1 className="text-5xl font-extrabold pb-10">Oficjalna aplikacja serwisu ZSE</h1>
            Witaj,<br></br>
            <div className="md:w-1/2">
              Możesz tutaj zgłosić problemy ze sprzętem komputerowym
              w Zespole Szkół Elektronicznych w&nbsp;Bolesławcu<br></br><br></br>
            </div>
            <Link href='/login'>
              <Button content={'Logowanie'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
