import React,{useContext} from "react";
import ThemeContext from "../context/ThemeContext";

const Card = ({ children }) => {
    const {darkMode} =  useContext(ThemeContext);
    return <div className={`w-full h-full rounded-md relative p-5 border-1 shadow-md hover:shadow-lg transition-shadow duration-300" ${darkMode ? "bg-gray-900 border-gray-700 shadow-gray-800" : "bg-white/40 backdrop-blur-lg border border-white/30"}`}>
        {children}
        </div>
}
export default Card;