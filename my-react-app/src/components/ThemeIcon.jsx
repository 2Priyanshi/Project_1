import { MoonIcon } from "@heroicons/react/20/solid";
import React, { useState, useContext } from "react";

import ThemeContext from "../context/ThemeContext";

const ThemeIcon = () =>
{
    const {darkMode,setDarkMode} = useContext(ThemeContext);

    const toggleDarkMode = () =>{
        setDarkMode(!darkMode);
    }
    return(
        <button className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-30 shadow-lg ${darkMode ? "shadow-gray-200" : "fill-none" } `} onClick={toggleDarkMode}>
            <MoonIcon className={` h-8 w-10 cursor-pointer stroke-1 fill-none stroke-neutral-400 ${darkMode ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-neutral-400"}`}/>

        </button>
    )
}
export default ThemeIcon;