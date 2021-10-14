{
    let coinList = [];

    const dataDaysBefore =7;
    const currency = "eur";
    const currencySymbol = "€";
    const interval = "hourly";   
    
    function loadData()
    {
        blurBg(4);
        coinList = JSON.parse(fetchUserData());    
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
            blurBg(0);
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
        displayCoinList(objClone(coinsData),currencySymbol);
        totalHoldings(objClone(portfChart),currencySymbol)
        buildChart(objClone(portfChart));
        blurBg(0);
    }   
loadData(); 
}