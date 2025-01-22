import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { fetchStockData, formatStockData } from "../api/stock-api";
import { candleStickOptions } from "../constants/mock";
import ReactApexChart from "react-apexcharts";


const LiveChart = ({ symbol }) =>{
    const[stockData, setStockData] = useState([]);

    useEffect(()=>{
        fetchStockData(symbol).then( data => 
            setStockData(data)
        )
    },[])

    const seriesData = useMemo(()=>  formatStockData(stockData),[stockData])
    console.log(seriesData);
    return(<Card>
      <ReactApexChart 
         series={
            [
                {
                    data: seriesData
                }
            ]
         }

         options={candleStickOptions}
         type="candlestick"
      />
    </Card>

    )
}

export default LiveChart;