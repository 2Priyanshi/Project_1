import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";

const SearchResults = ({ results }) => {
const {darkMode} = useContext(ThemeContext);
const {setStockSymbol} = useContext(StockContext);
console.log(results);
return (
    
<ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollber-dark" : "bg-white border-neutral-200 custom-scrollbar"}`}>

{results.map((item)=> {
    return (<li key={item.symbol} className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md  ${darkMode ? "hover:bg-indigo-900" : "hover:bg-indigo-200"}`}
                onClick={()=>{
                    setStockSymbol(item.symbol);
                }}>
        <span>{item.symbol}</span>
        <span className="text-xs">{item.name}</span>
    </li>
    );
})}
    </ul>
    );
};
export default SearchResults;