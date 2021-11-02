{
    let coinList = [];

    const dataDaysBefore =7;
    const currency = "eur";
    const currencySymbol = "€";
    const interval = "hourly";  
    
    let timeoutId;
    
    function loadData()
    {
        //if this timeout does not get cancelled in time then a delay message appears
        timeoutId = setTimeout(function()
        {
            let msg  = "There are some delays using the Coingkeco API.";
            displayErrorMsg(msg,5);

        },7000);

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
        clearTimeout(timeoutId);
        if(requestErrors.length != 0)
        {
            let msg  = "There was an error retrieving the coin data. Please try again in 30 seconds.";
            blurBg(0);
            displayErrorMsg(msg);
            return;
        }

        if(rawCoinData == null)
        {
            blurBg(0);
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
    }   
loadData(); 
}