import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MarketData.css";

const MarketData = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const apiKey = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your API key
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=U25AIQYKB970C2TD`
        );
        const quote = response.data["Global Quote"];
        setMarketData(quote);
      } catch (err) {
        setError("Failed to fetch market data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) return <p>Loading market data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="market-data-container">
      <h2>Market Data</h2>
      <div className="market-data-card">
        <p><strong>Symbol:</strong> {marketData["01. symbol"]}</p>
        <p><strong>Price:</strong> ${marketData["05. price"]}</p>
        <p><strong>Change:</strong> {marketData["10. change percent"]}</p>
        <p><strong>Volume:</strong> {marketData["06. volume"]}</p>
      </div>
    </div>
  );
};

export default MarketData;
