import React from 'react';

function Portfolio() {
  const mockPortfolio = [
    { symbol: 'AAPL', quantity: 10, price: 150 },
    { symbol: 'GOOGL', quantity: 5, price: 2800 },
    { symbol: 'TSLA', quantity: 8, price: 700 },
  ];

  return (
    <div className="portfolio">
      <h2>Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {mockPortfolio.map((stock, index) => (
            <tr key={index}>
              <td>{stock.symbol}</td>
              <td>{stock.quantity}</td>
              <td>${stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Portfolio;
