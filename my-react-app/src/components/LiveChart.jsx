import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { fetchStockData, formatStockData } from "../api/stock-api";
import { candleStickOptions } from "../constants/mock";
import ReactApexChart from "react-apexcharts";

const LiveChart = React.memo(({ symbol }) => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        
        fetchStockData(symbol).then((data) => {
            if (isMounted) {
                setStockData(data);
            }
        });

        return () => {
            isMounted = false; // Cleanup to prevent memory leaks
        };
    }, [symbol]);

    const seriesData = useMemo(() => {
        const formattedData = formatStockData(stockData);
        return formattedData.slice(-200); // Keep only last 200 points
    }, [stockData]);

    const chartOptions = useMemo(() => ({
        ...candleStickOptions,
        chart: {
            ...candleStickOptions.chart,
            animations: { enabled: false }, // Disable animations
            toolbar: { show: false }, // Remove UI clutter
        },
    }), []);

    return (
        <Card>
            <ReactApexChart 
                series={[{ data: seriesData }]}
                options={chartOptions}
                type="candlestick"
            />
        </Card>
    );
});

export default LiveChart;
