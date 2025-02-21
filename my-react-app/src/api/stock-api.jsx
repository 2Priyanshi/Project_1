const basePath ="https://finnhub.io/api/v1"/*https://www.alphavantage.co";*/
/* XL0FGKKAN8UFKKSK */
/* FK8ZIFTUTQ7VFMCO */

export const searchSymbols = async (query) =>{
    /*const url = `${basePath}/search?q=${query}&token=${import.meta.env.VITE_API_KEY}`;*/

    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=VI40KQQPZVS71Z6G`;

    const response = await fetch(url);
    if(!response.ok)
    {
        const message =`AN error has occured : ${response.status}`;
        throw new Error(message);
    }

    
     return await response.json();
};

export const fetchStockDetails = async (stockSymbol)=>{
    /*const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${import.meta.env.VITE_API_KEY}`;*/
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=VI40KQQPZVS71Z6G`;
    console.log(url);
    console.log(stockSymbol);
    const response = await fetch(url);
    

    if(!response.ok)
        {
            const message =`AN error has occured : ${response.status}`;
            throw new Error(message);
        }
        console.log(response);
    
         return await response.json();

};

export const fetchQuote = async (stockSymbol) => {
   /* const url = `${basePath}/quote?symbol=${stockSymbol}&token=${import.meta.env.VITE_API_KEY}`;*/
   const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=VI40KQQPZVS71Z6G`

    const response = await fetch(url);

    if(!response.ok)
        {
            const message =`AN error has occured : ${response.status}`;
            throw new Error(message);
        }
    
        
         return await response.json();

};

/*export const fetchHistoricalData = async (stockSymbol, resolution, from, to) =>{

    const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${import.meta.env.VITE_API_KEY}`;
    console.log(url);
    console.log("API Response:", result);


    const response = await fetch(url);

    if(!response.ok)
        {
            const message =`AN error has occured : ${response.status}`;
            throw new Error(message);
        }
    
         return await response.json();

}*/

export const fetchStockData = async (symbol) =>{

    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=VI40KQQPZVS71Z6G`);
    const data = await response.json();
    return data;
}

export const formatStockData = (stockData) =>{
    const formattedData = []
    if(stockData['Weekly Adjusted Time Series'] ){
       Object.entries(
        stockData['Weekly Adjusted Time Series']
       ).map(
        ([key , value ])=>{
            formattedData.push({
                x:key,
                y:[
                    value['1. open'],
                    value['2. high'],
                    value['3. low'],
                    value['4. close'],
                ]
            })
        }
       )
    }

     return formattedData
}