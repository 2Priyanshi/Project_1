import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const MultipleCharts = ({ stocks }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const generateRandomData = () => {
            const newData = [];
            let basePrices = stocks.reduce((acc, stock) => {
                acc[stock] = Math.random() * 100 + 50; // Starting price between 50-150
                return acc;
            }, {});

            for (let i = 0; i < 20; i++) {
                let entry = { time: `Day ${i + 1}` };
                stocks.forEach((stock) => {
                    const volatility = (Math.random() - 0.5) *  30 * (Math.random() * 2 + 1); // Bigger fluctuations
                    basePrices[stock] += volatility; // Even more random movement
                    basePrices[stock] = Math.max(10, parseFloat(basePrices[stock].toFixed(2))); // Ensure price doesn't go below 10
                    entry[stock] = basePrices[stock];
                });
                newData.push(entry);
            }

            setData(newData);
        };

        generateRandomData();
        const interval = setInterval(generateRandomData, 5000); // Update every 5 sec

        return () => clearInterval(interval); // Cleanup
    }, [stocks]);

    const colors = ["#8884d8", "#82ca9d", "#ff7300", "#d62728", "#17becf"];

    return (
        <div className="w-full h-64 bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-2">Stock Price Fluctuations</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {stocks.map((stock, index) => (
                        <Line
                            key={stock}
                            type="monotone"
                            dataKey={stock}
                            stroke={colors[index % colors.length]}
                            strokeWidth={2}
                            dot={false} // Remove dots for cleaner graph
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MultipleCharts;
