import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import ThemeContext from '../context/ThemeContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchStockDetails, fetchQuote } from '../api/stock-api';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Search from './Search';
import MultipleCharts from './MultipleCharts';


function Portfolio() {
  const { darkMode } = useContext(ThemeContext);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [comDetails, setComDetails] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [investments, setInvestments] = useState([]);
  const [balance, setBalance] = useState("");
  const userId = localStorage.getItem("userId");
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [pendingTrade, setPendingTrade] = useState(null);
  const [transactions,setTransactions] = useState([]);
  const navigate = useNavigate();
  

  const data = [
    { name: "Profit", value: totalProfit, color: "#4CAF50" }, // Green for Profit
    { name: "Loss", value: totalLoss, color: "#F44336" }, // Red for Loss
  ];

  const fetchAndStorePrices = async () => {
    try {
      const prices = {};
  
      for (const company of companies) {
        const result = await fetchQuote(company); // API Call
        const price = parseFloat(result["Global Quote"]?.["05. price"] || 0).toFixed(2);
  
        if (price !== "0.00") {
          prices[company] = price;
        }
      }
  
      localStorage.setItem("marketPrices", JSON.stringify({
        prices,
        lastUpdated: new Date().toISOString(),
      }));
  
      return prices;
    } catch (error) {
      console.error("Error fetching stock prices:", error);
      return null;
    }
  };
  
  const getStoredPrices = () => {
    const storedData = JSON.parse(localStorage.getItem("marketPrices"));
  
    if (!storedData) return {};
  
    // Check if stored data is from today
    const lastUpdated = new Date(storedData.lastUpdated);
    const now = new Date();
  
    const isSameDay = 
      lastUpdated.getFullYear() === now.getFullYear() &&
      lastUpdated.getMonth() === now.getMonth() &&
      lastUpdated.getDate() === now.getDate();
  
    return isSameDay ? storedData.prices : {};
  };
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("marketPrices"));
    const lastUpdated = storedData ? new Date(storedData.lastUpdated) : null;
    const now = new Date();
  
    // If no data or data is outdated (not from today), fetch new prices
    if (!lastUpdated || now.getDate() !== lastUpdated.getDate()) {
      fetchAndStorePrices();
    }
  }, []); // Runs once when the component mounts
  

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/api/wallet/${userId}/balance`)
      .then((res) => res.json())
      .then((data) => setBalance(data))
      .catch((err) => console.error("Error fetching balance:", err));
  }, [userId]);

  useEffect(() => {
    if (selectedCompany) {
      const getCompanyDetails = async () => {
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
  }, [selectedCompany]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/transactions/profit-loss/${userId}`)
        .then(response => response.json())
        .then(data => {
          setTransactions(data);
          fetchInvestments();
        })
        .catch(error => console.error('Error fetching transactions:', error));
    }
  }, [userId]);
  



  const companies = [
    
    
    
    
    "IBM",
  
    "Meta",
    "AAPL",
    "GOOGL",
    "GOOG",
    "TATACHEM.BSE",
    "TATAMOTORS.BSE",
    
    
    "GOOG.AMS",
    "TCS.BSE",
    
    
    "AAPL.TRT",
    "APC.FRK",
    "APC.DEX",
  
    
  ];

  const fetchStockPrice = async () => {
    if (!selectedCompany) {
      console.error("Stock symbol is missing.");
      return null;
    }

    const storedPrices = getStoredPrices();
    if(storedPrices[selectedCompany])

      {
        console.log("==============");
        console.log(storedPrices);
        return storedPrices[selectedCompany];
      }
    try {
      const result = await fetchQuote(selectedCompany);
      const price = parseFloat(result["Global Quote"]?.["05. price"] || 0).toFixed(2);

      if (!price || price === "0.00") {
        
        console.error(`Failed to fetch stock price for ${selectedCompany}.`);
        return null;
      }

      return price;
    } catch (error) {
      console.error(`Error fetching stock price for ${selectedCompany}:, error`);
      return null;
    }
  };

  const handleTrade = async (action, stockSymbol, qty) => {
    const symbol = stockSymbol || selectedCompany;
    const quantityToSell = qty || quantity;



    if (!symbol || !quantityToSell || !userId) {
      console.error("Missing required fields for transaction.");
      return;
    }

    console.log(".....");
    console.log(selectedCompany);
    console.log(".....");

    const price = await fetchStockPrice();
    
    if (!price) {
      alert("Transaction failed: Unable to fetch stock price.");
      
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/transactions/${action.toLowerCase()}?userId=${userId}&stockSymbol=${symbol}&quantity=${quantityToSell}&price=${price}`, {
        method: "POST",
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) throw new Error("Transaction failed!");

      const data = await response.json();
      alert("Transaction successful!");
      fetchInvestments(); // Refresh investments after selling
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed: " + error.message);
    }
  };



  const fetchInvestments = async () => {
    if (!userId) return;
  
    try {
      // Ensure transactions are available before proceeding
      if (transactions.length === 0) {
        console.warn("Transactions not loaded yet. Waiting...");
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/transactions/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch investments");
  
      const data = await response.json();
  
      // Group investments by stock symbol
      const groupedInvestments = {};
  
      for (const investment of data) {
        const { stockSymbol, orderType, quantity, totalAmount } = investment;
  
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
          groupedInvestments[stockSymbol].quantity -= quantity;
          if (groupedInvestments[stockSymbol].quantity > 0) {
            const avgPrice = groupedInvestments[stockSymbol].totalBuy / (groupedInvestments[stockSymbol].quantity + quantity);
            groupedInvestments[stockSymbol].totalBuy = avgPrice * groupedInvestments[stockSymbol].quantity;
          } else {
            groupedInvestments[stockSymbol].totalBuy = 0;
          }
        }
      }
  
      // Convert to array
      const investmentArray = Object.values(groupedInvestments);
  
      // Fetch current stock prices and calculate profit/loss
      const updatedInvestments = await Promise.all(
        investmentArray.map(async (inv) => {
          const stockData = await fetchStockDetails(inv.stockSymbol);
          const currentPrice = parseFloat(stockData.Price) || 0;
          const marketValue = currentPrice * inv.quantity;
  
          const transactionData = transactions.find(t => t.stockSymbol === inv.stockSymbol);
          const profitOrLoss = transactionData ? parseFloat(transactionData.profitLossValue) : 0;
          console.log("Fetched Transactions:", transactions);

  
          return {
            ...inv,
            currentPrice,
            marketValue,
            profitOrLoss,
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
  }, [userId]); // Ensures it runs when userId is available




  const handleSell = (stockSymbol, quantity) => {
    console.log("Updating selected company to:", stockSymbol);
    setSelectedCompany(stockSymbol);
    setPendingTrade({ action: "SELL", stockSymbol, quantity });
  };

  useEffect(() => {
    if (pendingTrade && selectedCompany === pendingTrade.stockSymbol) {
      console.log("Executing trade for:", selectedCompany);
      handleTrade(pendingTrade.action, pendingTrade.stockSymbol, pendingTrade.quantity);
      setPendingTrade(null); // Reset pending trade
    }
  }, [selectedCompany]);

  return (
    <>





      <div
        className={`h-screen w-screen grid grid-cols-2 gap-2 p-3 font-quicksand ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-r from-[#c9d6ff] to-[#fff]"
          }`}
      >
        {/* First Card (Left) */}


        <div className={`flex justify-start items-center transition-all duration-500 ease-in-out ${darkMode ? "bg-gray-900 text-gray-100" : "null"}`}>
          <Card className={`bg-gray-200  p-6 rounded-lg shadow-md w-4/5 transition-all duration-500 ease-in-out transform hover:scale-[1.02] ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white/40 backdrop-blur-lg border border-white/30"}`}>



           {selectedCompany ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h2 className="font-bold text-lg">{selectedCompany}</h2>

                <div className={`mt-4 space-y-3 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white/40 backdrop-blur-lg border border-white/30"}`}>
                  <form className={`mt-1 space-y-3 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white/40 backdrop-blur-lg border border-white/30"}`}>

                    {/* Quantity Row */}

                    <div className={`flex items-center gap-4 `}>
                      <label className="w-40 font-medium">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        className="w-1/3 p-2 border rounded focus:ring-2 focus:ring-blue-400 transition"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                      />
                      <input
                        type="number"
                        className="w-1/3 p-2 border rounded focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Entry price"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                      />
                    </div>

                    {/* Time Frame Row */}
                    <div className="flex items-center gap-4">
                      <label className="w-40 font-medium text-right pr-4">Time Frame:</label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-1/3 p-2 border rounded focus:ring-2 focus:ring-blue-400 transition"
                        placeholderText="Select a date"
                      />
                    </div>

                    {/* Stoploss & Target Row */}
                    <div className="flex items-center gap-4">
                      <input type="number" className="w-1/3 p-2 border rounded" placeholder="Stoploss" />
                      <input type="number" className="w-1/3 p-2 border rounded" placeholder="Target" />
                    </div>

                    {/* Buy & Sell Buttons */}
                    <div className="flex gap-2 mt-3">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-500 text-white px-4 py-2 rounded transition-all shadow-md hover:bg-green-600"
                        onClick={() => handleTrade("Buy")}
                      >
                        Buy
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-red-500 text-white px-4 py-2 rounded transition-all shadow-md hover:bg-red-600"
                        onClick={() => handleTrade("Sell")}
                      >
                        Sell
                      </motion.button>
                    </div>
                  </form>
                  <Card>
                    <div className='m-1'>
                      <MultipleCharts stocks={["AAPL", "META", "IBM", "GOOGL"]} />
                    </div>
                  </Card>
                </div>
              </motion.div>



            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <div className="text-center flex m-2">
                  <Card className="justify-start flex transition-all duration-500 transform hover:scale-105 bg-white p-4 rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-left text-lg font-semibold"
                    >


                      <div className="text-2xl font-bold ">{Number(balance).toFixed(2)}</div>
                      <div className="text-md text-gray-600 ">Total Portfolio</div>

                    </motion.div>
                  </Card>

                  <Card className="flex mt-4 justify-end transition-all duration-500 transform hover:scale-105 shadow-lg bg-white p-4 rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-left text-sm font-medium text-gray-800"
                    >
                      <div className="text-lg font-semibold">Available Margin: <span className="font-bold">{Number(balance).toFixed(2)}</span></div>
                      <div className="mt-3 text-gray-600 ">Invested Margin: <span className="font-semibold">{(999999 - (balance)).toFixed(2)}</span></div>
                    </motion.div>
                  </Card>
                </div>


                <Card className="flex flex-col transition-all duration-500 ease-in-out hover:shadow-lg">
                  <div className="overflow-y-auto max-h-[350px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    <ul>
                      {investments.length > 0 && (
                        <motion.li
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-3 grid grid-cols-5 font-bold border-b sticky top-0 z-10 bg-white"
                        >
                          <span className="text-left">Stock</span>
                          <span className="text-center">Shares</span>
                          <span className="text-right">Buy/Sell</span>
                          <span className="text-right">Profit/Loss</span>
                          <span className="text-center">Action</span>
                        </motion.li>
                      )}

                      {investments.length > 0 ? (
                        investments.map((inv, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 grid grid-cols-5 border-b items-center"
                          >
                            <span className="text-left font-medium">{inv.stockSymbol}</span>
                            <span className="text-center">{inv.quantity} shares</span>
                            <span className="text-right">{inv.totalBuy.toFixed(2)}</span>
                            <span className={`text-right ${inv.profitOrLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {typeof inv.profitOrLoss === "number" ? inv.profitOrLoss.toFixed(2) : "0.00"}
                            </span>
                            <div className='flex justify-center'>
                             
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="bg-red-500 text-white text-sm rounded shadow-md hover:bg-red-600 w-16"
                                onClick={() => handleSell(inv.stockSymbol, inv.quantity)}
                              >
                                Sell
                              </motion.button>
                            </div>
                          </motion.li>
                        ))
                      ) : (
                        <li className="p-3 text-gray-500 text-center">No investments yet</li>
                      )}
                    </ul>
                  </div>
                </Card>


                {/* Profit & Loss Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-green-100 border-l-4 border-green-500 shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-green-700">₹{totalProfit}</h2>
                    <p className="text-gray-600">Total Profit</p>
                  </div>
                  <div className="p-4 bg-red-100 border-l-4 border-red-500 shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-red-700">₹{totalLoss}</h2>
                    <p className="text-gray-600">Total Loss</p>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </div>

        {/* Second Card (Right) */}
        <Card className="p-6 rounded-2xl shadow-lg bg-gray-700 text-white ">
          <motion.button
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-600 transition-all absolute right-4 top-3"
            onClick={() => navigate("/dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftCircleIcon className="w-6 h-6" />

          </motion.button>
          {selectedCompany ? (
            <Card>
              <div>

                <h2 className="text-xl font-semibold mb-4">{selectedCompany} Details</h2>
      
                <button
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  onClick={() => setSelectedCompany(null)}
                >
                  Back to List
                </button>
              </div>
            </Card>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a Company</h2>

              <ul className="grid grid-cols-2 gap-4">
                {companies.map((company, index) => ( 
                  <li
                    key={index}
                    className={`p-4 cursor-pointer rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border-gray-800 flex items-center justify-center text-center
        ${selectedCompany === company ? "bg-blue-500 text-white " : "bg-white text-gray-900 hover:bg-gray-300"}
      `}
                    onClick={() => setSelectedCompany(company)}
                  >
                    {company}
                  </li>
                ))}
              </ul>

            </div>
          )}
        </Card>

      </div>


    </>
  );


}

export default Portfolio;