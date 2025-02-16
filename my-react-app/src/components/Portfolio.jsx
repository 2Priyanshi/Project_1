import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import ThemeContext from '../context/ThemeContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchStockDetails } from '../api/stock-api';

function Portfolio() {
  const {darkMode}= useContext(ThemeContext);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [comDetails,setComDetails] = useState(null);
  const [quantity, setQuantity] = useState(""); 
  const [entryPrice, setEntryPrice] = useState(""); 
  const [investments, setInvestments] = useState([]);
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

  const handleTrade = (action) => {
    if (!selectedCompany || !quantity || !entryPrice) return;

    const newInvestment = {
      company: selectedCompany,
      quantity: quantity,
      entryPrice: entryPrice,
      action: action, 
    };

    setInvestments([...investments, newInvestment]);
    setQuantity(""); 
    setEntryPrice("");
  };


  return (
    <>
      <div
        className={`h-screen w-screen grid grid-cols-2 gap-2 p-3 font-quicksand ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-neutral-100"
        }`}
      >
        {/* First Card (Left) */}
        <div className="flex justify-start items-center">
          <Card className="bg-gray-200 p-6 rounded-lg shadow-md w-4/5">
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

                {/* Investment List */}
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
                )}
              </div>
            ) : (
              <div className="text-center">No company selected so far.</div>
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
