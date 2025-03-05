import React, { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
const Details =({details}) => {
    const {darkMode} = useContext(ThemeContext);

    const detailsList ={
        Name: "Name",
        Country: "Country",
        Currency: "Currency",
        Exchange: "Exchange",
        LatestQuater: "Latest Quater",
        MarketCapitalization: "Market Capitalization",
        ProfitMargin: "Profit Margin",

    };

    const convertMillionToBillion = (number) => {
        return (number/1000).toFixed(2);
    };
return (<Card>
       <ul className={`w-full h-full flex flex-col justify-between divide-y-1 ${darkMode ? "divide-gray-800" : null}`}>

        {Object.keys(detailsList).map((item)=>{
            return (<li key={item} className="flex-1 flex justify-between items-center">
                <span>{detailsList[item]}</span>
                <span>{item === "MarketCapitalization" ? `${convertMillionToBillion(details[item])}B` : details[item]}</span>
            </li>
        );
        })}
       </ul>
    </Card>
);
};

export default Details;