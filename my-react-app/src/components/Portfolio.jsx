import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import ThemeContext from '../context/ThemeContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchStockDetails } from '../api/stock-api';

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Portfolio() {
  const {darkMode}= useContext(ThemeContext);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [comDetails,setComDetails] = useState(null);
  const [quantity, setQuantity] = useState(""); 
  const [entryPrice, setEntryPrice] = useState(""); 
  const [investments, setInvestments] = useState([]);
  const [balance,setBalance] = useState("");
  const userId = localStorage.getItem("userId");
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);

  const data = [
    { name: "Profit", value: totalProfit, color: "#4CAF50" }, // Green for Profit
    { name: "Loss", value: totalLoss, color: "#F44336" }, // Red for Loss
  ];

useEffect(() => {
  if (!userId) return;

  fetch(`http://localhost:8080/api/wallet/${userId}/balance`)
    .then((res) => res.json())
    .then((data) => setBalance(data))
    .catch((err) => console.error("Error fetching balance:", err));
}, [userId]);

  useEffect(()=>{
    if(selectedCompany){
      const getCompanyDetails = async()=>{
        const data = await fetchStockDetails(selectedCompany);
        setComDetails({
          Symbol: data.Symbol,
          AssetType: data.AssetType,
          Name: data.Name,
          Description: data.Description,
        });
      };
      getCompanyDetails();
    }
  },[selectedCompany]);

  const companies = [
    "Nifty",
    "Tata Steel",
    "HDFC Bank",
    "Infosys",
    "IBM",
    "Wipro",
    "Meta",
    "ICICI Bank",
    "Wagend Infra Venture",
  ];

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
    
  
 

  const handleTrade = async (action) => {
    if (!selectedCompany || !quantity || !entryPrice || !userId) return;
  
    const endpoint = action === "Buy" ? "buy" : "sell";
  
    try {
      const response = await fetch(`http://localhost:8080/api/transactions/${endpoint}?userId=${userId}&stockSymbol=${selectedCompany}&quantity=${quantity}&price=${entryPrice}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Transaction failed!");
      }
  
      const data = await response.json();
      alert(`${action} transaction successful!`);
      console.log("Transaction Data:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed: " + error.message);
    }
  
    setQuantity("");
    setEntryPrice("");
  };
  
  
  const fetchInvestments = async () => {
    if (!userId) return;
  
    try {
      const response = await fetch(`http://localhost:8080/api/transactions/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch investments");
  
      const data = await response.json();
  
      // Group investments by stock symbol
      const groupedInvestments = {};
      
      for (const investment of data) {
        const { stockSymbol, orderType, quantity, totalAmount, price } = investment;
        
        if (!groupedInvestments[stockSymbol]) {
          groupedInvestments[stockSymbol] = {
            totalBuy: 0,
            quantity: 0,
            stockSymbol,
          };
        }
  
        if (orderType === "BUY") {
          groupedInvestments[stockSymbol].totalBuy += parseFloat(totalAmount);
          groupedInvestments[stockSymbol].quantity += quantity;
        } else if (orderType === "SELL") {
          groupedInvestments[stockSymbol].totalBuy -= parseFloat(totalAmount);
          groupedInvestments[stockSymbol].quantity -= quantity;
        }
      }
  
      // Convert grouped object into an array
      const investmentArray = Object.values(groupedInvestments);
  
      // Fetch current stock prices
      const updatedInvestments = await Promise.all(
        investmentArray.map(async (inv) => {
          const stockData = await fetchStockDetails(inv.stockSymbol); // API call to get latest stock price
          const currentPrice = parseFloat(stockData.Price) || 0; // Assume 0 if no price found
          const marketValue = currentPrice * inv.quantity;
  
          return {
            ...inv,
            currentPrice,
            marketValue,
            profitOrLoss: (marketValue - inv.totalBuy).toFixed(2), // Profit/Loss formula
          };
        })
      );
  
      setInvestments(updatedInvestments);
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };
  
  useEffect(() => {
    let profit = 0;
    let loss = 0;
  
    investments.forEach(inv => {
      if (inv.profitOrLoss >= 0) {
        profit += parseFloat(inv.profitOrLoss);
      } else {
        loss += Math.abs(parseFloat(inv.profitOrLoss));
      }
    });
  
    setTotalProfit(profit);
    setTotalLoss(loss);
  }, [investments]); // Runs whenever investments update
  
  useEffect(() => {
    if (userId) {
      fetchInvestments();
    }
  }, [userId]); // Ensures it runs when `userId` is available
  
  
  
  


  return (
    <>
      <div
        className={`h-screen w-screen grid grid-cols-2 gap-2 p-3 font-quicksand ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-neutral-100"
        }`}
      >
        {/* First Card (Left) */}
        <div className={`flex justify-start items-center      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-neutral-100"
        }`}>
          <Card className={`bg-gray-200 p-6 rounded-lg shadow-md w-4/5 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-neutral-100"
        }`} >
            {selectedCompany ? (
              <div>
                <h2 className="font-bold text-lg">{selectedCompany}</h2>
                <form className="mt-4 space-y-3">
                  
                  {/* Quantity Row */}
                  <div className="flex items-center gap-4">
                    <label className="w-40 font-medium">Quantity:</label>
                    <input
                      type="number"
                      className="w-1/3 p-2 border rounded"
                      placeholder=""
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <input
                      type="number"
                      className="w-1/3 p-2 border rounded"
                      placeholder="Entry price"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                    />
                  </div>
                  
                  {/* Time Frame Row */}
                  <div className="flex items-center gap-4">
                    <label className="w-40 font-medium text-right pr-4">
                      Time Frame:
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="w-1/3 p-2 border rounded"
                      placeholderText="Select a date"
                    />
                  </div>

                  {/* Stoploss & Target Row */}
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      className="w-1/3 p-2 border rounded"
                      placeholder="Stoploss"
                    />
                    <input
                      type="number"
                      className="w-1/3 p-2 border rounded"
                      placeholder="Target"
                    />
                  </div>

                  {/* Buy & Sell Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleTrade("Buy")}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleTrade("Sell")}
                    >
                      Sell
                    </button>
                  </div>
                </form>

                {/* Investment List 
                {investments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold text-md mb-2">Invested Companies</h3>
                    <ul className="bg-white p-4 rounded-lg shadow">
                      {investments.map((inv, index) => (
                        <li key={index} className="flex justify-between border-b py-2">
                          <span className="font-medium">{inv.company}</span>
                          <span>{inv.quantity} shares</span>
                          <span className={inv.action === "Buy" ? "text-green-500" : "text-red-500"}>
                            {inv.action}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}*/}
              </div>
            ) : (
            <div>
              <div className="text-center flex">
                <Card className='justify-start flex'>
                  <div className='text-left text-lg'>
                        <div>
                             {balance}
                        </div>
                        <div className=' text-sm mt-1'>
                            Total Portfolio
                        </div>
                        
                      </div>

                      
                </Card>
                <Card className='flex justify-end '>
                <div className='text-left text-sm'>
                        <div>
                          Available Margin: {balance}
                        </div>
                        <div className='mt-3'>
                          Invested Margin:  {balance-999999}
                        </div>
                          
                      </div>
                </Card>
              </div>
              <div>
              <Card className="flex flex-col">
              <div className="overflow-y-auto max-h-100">
  <ul>
    {investments.length > 0 ? (
      <li className="p-3 flex justify-between border-b font-bold">
        <span>Stock</span>
        <span>Shares</span>
        <span>Buy Amount</span>
        <span>Profit/Loss</span>
        <span>Action</span>
      </li>
    ) : null}
    
    {investments.length > 0 ? (
      investments.map((inv, index) => (
        <li key={index} className="p-3 flex justify-between border-b items-center">
          <span className="font-medium">{inv.stockSymbol}</span>
          <span>{inv.quantity} shares</span>
          <span>{inv.totalBuy}</span>
          <span className={inv.profitOrLoss >= 0 ? "text-green-500" : "text-red-500"}>
            {inv.profitOrLoss}
          </span>
          <button 
            className="bg-red-500 text-white px-4 py-1 rounded" 
            onClick={() => handleSell(inv.stockSymbol, inv.quantity)}
          >
            Sell
          </button>
        </li>
      ))
    ) : (
      <li className="p-3 text-gray-500">No investments yet</li>
    )}



  </ul>
  </div>
</Card>


              </div>

              <div className="grid grid-cols-2 gap-4">
  {/* Profit Card */}
  <div className="p-4 bg-green-100 border-l-4 border-green-500 shadow-md rounded-lg text-center">
    <h2 className="text-xl font-bold text-green-700">₹{totalProfit}</h2>
    <p className="text-gray-600">Total Profit</p>
  </div>

  {/* Loss Card */}
  <div className="p-4 bg-red-100 border-l-4 border-red-500 shadow-md rounded-lg text-center">
    <h2 className="text-xl font-bold text-red-700">₹{totalLoss}</h2>
    <p className="text-gray-600">Total Loss</p>
  </div>
</div>

            
            </div>
              
            )}
          </Card>


        </div>


                  
        {/* Second Card (Right) */}
        <div className="flex justify-end items-center">
          <Card className="bg-gray-300 p-6 rounded-lg shadow-md w-4/5">
            {selectedCompany ? (
              // Show the details of the selected company
              <div>
                <h2 className="font-bold text-lg">{selectedCompany} Details</h2>
                {comDetails ? (
                  <ul className="mt-4 space-y-2">
                    <li><strong><span>Symbol:</span></strong><span>{comDetails.Symbol}</span></li><hr></hr>
                    <li><strong>Asset Type:</strong> {comDetails.AssetType}</li><hr></hr>
                    <li><strong>Name:</strong> {comDetails.Name}</li><hr></hr>
                    <li><strong>Description:</strong> {comDetails.Description}</li><hr></hr>
                  </ul>
                ) : (
                  <p>Loading details...</p>
                )}
              </div>
            ) : (
              // Show company list if no company is selected
              <ul>
                {companies.map((company, index) => (
                  <li
                    key={index}
                    className="p-4 cursor-pointer hover:bg-gray-400 transition"
                    onClick={() => setSelectedCompany(company)}
                  >
                    {company}
                    {index !== companies.length - 1 && <hr />}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
        
    </>
  );
  
 
}

export default Portfolio;
