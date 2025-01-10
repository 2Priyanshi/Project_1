import React from 'react';

function MarketTrends() {
  const mockTrends = [
    { symbol: 'AAPL', change: '+1.5%' },
    { symbol: 'GOOGL', change: '-0.8%' },
    { symbol: 'TSLA', change: '+3.2%' },
  ];

  return (
    <div className="market-trends">
      <h2>Market Trends</h2>
      <ul>
        {mockTrends.map((trend, index) => (
          <li key={index}>
            {trend.symbol}: {trend.change}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarketTrends;
