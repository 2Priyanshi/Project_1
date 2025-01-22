import React, { useState } from 'react';

function Trade() {
  const [order, setOrder] = useState({ symbol: '', quantity: '', type: 'Buy' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Submitted:', order);
  };

  return (
    <div className="trade">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={order.symbol}
          onChange={(e) => setOrder({ ...order, symbol: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={order.quantity}
          onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
        />
        <select
          value={order.type}
          onChange={(e) => setOrder({ ...order, type: e.target.value })}
        >
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Trade;
