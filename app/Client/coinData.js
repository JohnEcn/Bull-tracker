{
    function getCoinsData(coinNames,currency,dataDaysBefore,interval)
    {
        const promiseArr = [];

        //Fetching historical data for each coin
        for(let i = 0; i<coinNames.length; i++)
        {            
            let result = fetchCoinData(coinNames[i],currency,dataDaysBefore,interval);
            promiseArr.push(result);                   
        }
        
        //Fetching current data for all coins with a single request
        let result = fetchCoinCurrentPrice(coinNames,currency);
        promiseArr.push(result);   
        
        //When all request are complete combine the data
        Promise.all(promiseArr).then(
            (values) =>
            {
                const resultDataArr = [];
                const currentData = JSON.parse(values[values.length-1]);

                for(let i = 0; i<values.length-1; i++)
                {
                    resultDataArr.push(
                        {
                            coinName:coinNames[i],
                            currentPrice:currentData[coinNames[i]][currency],
                            currentMkCap:currentData[coinNames[i]][currency+"_market_cap"],
                            historicalData: JSON.parse(values[i])
                        });
                }
                launchApp(resultDataArr);   
            }
        );            
    }

    function extractCurrentCoinData(coinsData)
    {
        const currentData = [];

        for(let i = 0; i<coinsData.length; i++)
        {
            let coinPriceData = coinsData[i].historicalData.prices;

            //Find least recent price
            let minUnixTime = coinPriceData[0][0];
            let oldestPrice = coinPriceData[0][1];
            
            for(let i = 0; i<coinPriceData.length; i++)
            {
                if(coinPriceData[i][0] < minUnixTime)
                {
                    minUnixTime = coinPriceData[i][0];
                    oldestPrice = coinPriceData[i][1];
                }                
            }

            currentData.push(
                {
                    coinName:coinsData[i].coinName,
                    currentPrice:coinsData[i].currentPrice,
                    mkCap:coinsData[i].currentMkCap,
                    percChange: ((coinsData[i].currentPrice - oldestPrice) / oldestPrice ) *100,
                    historicalData:coinsData[i].historicalData.prices
                })

        }
        return currentData;
    }
    
    function buildPortfolioChartData(coinsData,holdingsArr)
    {           
        const portfChartData = [];  
        let minArrSize = Infinity;
        for(let k = 0; k<coinsData.length; k++)
        {
            if(coinsData[k].historicalData.length < minArrSize)
            {
                minArrSize = coinsData[k].historicalData.length
            }
        }
        
        for(let i = 0; i<minArrSize; i++)
        {
            let holdings = 0;
            let avgDate = 0;
                
            for(let k = 0; k<coinsData.length; k++)
            {
                let coinHolding = holdingsArr[coinsData[k].coinName];
                    
                holdings += coinsData[k].historicalData[i][1] * coinHolding;     
                avgDate +=  coinsData[k].historicalData[i][0];  

            }

            portfChartData.push([new Date(avgDate/coinsData.length).toLocaleString('en-GB'),holdings])
        }
    
        let currentHoldings = 0;
        for(let k = 0; k<coinsData.length; k++)
        {
            let coinHolding = holdingsArr[coinsData[k].coinName];                    
            currentHoldings += coinsData[k].currentPrice * coinHolding;  
        }
        portfChartData.push(["Right now",currentHoldings])
        return portfChartData;
    }
}