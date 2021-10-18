{
    let coinList = [];

    const dataDaysBefore =7;
    const currency = "eur";
    const currencySymbol = "€";
    const interval = "hourly";   
    
    function loadData()
    {
        coinList = JSON.parse(fetchUserCoins());    
        if(coinList.length != 0)
        {
            getCoinsData(objClone(coinList),currency,dataDaysBefore,interval);
        }
        else
        {
            launchApp(null);
        }        
    }

    function launchApp(rawCoinData,requestErrors = [])
    {
        if(rawCoinData == null)
        {
            //Display new user message
            return;
        }
        
        //Convert raw data to user Friendly data
        const coinsData = extractCoinData(objClone(rawCoinData),objClone(coinList));        

        //Use the historic data and holdings arr to build a chart dataset
        const portfChart = buildPortfolioChartData(objClone(coinsData),objClone(coinList)); 
        
        //Initiate the display of the UI and data.
        coinsData.sort(function(a, b) {
         return b.holdings * b.currentPrice - a.holdings * a.currentPrice
        });
        console.log(coinsData);
        displayCoinList(objClone(coinsData),currencySymbol);
        totalHoldings(objClone(portfChart),currencySymbol)
        buildChart(objClone(portfChart));
    }   
loadData(); 
}