import React,{ useContext, useEffect, useState } from "react";
import Header2 from './Header2';
/*import { mockCompanyDetails } from '../constants/mock';*/
import Details from "./Details";
import Overview from "./Overview";

import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../api/stock-api";
import LiveChart from "./LiveChart";

const Dashboard = () =>{
const {darkMode} = useContext(ThemeContext);
const { stockSymbol } = useContext(StockContext);

const [stockDetails, setStockDetails] = useState({});
const [ quote, setQuote ] = useState({});

useEffect(() => {
  const updateStockDetails = async () => {
    try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails({
            Name: result.Name,
            Country: result.Country,
            Currency: result.Currency,
            Exchange: result.Exchange,
            Industry: result.Industry,
            MarketCapitalization: result.MarketCapitalization,
            ProfitMargin: result.ProfitMargin,
        });
    } catch (error) {
        setStockDetails({});
        console.error(error);
    }
};

    const updateStockOverview = async () => {
      try {
          const result = await fetchQuote(stockSymbol);
  
          const {
              "05. price": price,
              "09. change": change,
              "10. change percent": changePercent,
          } = result["Global Quote"] || {};
  
          setQuote({
              price: parseFloat(price).toFixed(2),
              change: parseFloat(change).toFixed(2),
              changePercent: changePercent,
          });
      } catch (error) {
          setQuote({});
          console.error(error);
      }
  };
  

    updateStockDetails();
    updateStockOverview();

}, [stockSymbol]);

  return <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-2 p-1 font-quicksand ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-r from-[#c9d6ff] to-[#fff]" }`}>
    <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center mt-0">
      <Header2 name={stockDetails.name}/>
    </div>
    <div className="md:col-span-2 row-span-4">
    <LiveChart symbol={stockSymbol} />
    </div>

    <div>

    <Overview
    symbol={stockSymbol}
    price={quote.price}
    change={quote.change}
    changePercent={quote.changePercent}
    currency={stockDetails.currency}
/>
          </div>

    <div className="row-span-2 xl:row-span-3">
    <Details details={stockDetails}/>
    </div>


  </div>;
};

export default Dashboard;
