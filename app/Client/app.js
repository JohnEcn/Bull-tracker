{
    // Data Parameters
    //temporary hardcoded
    const coinList = 
    [
        {coinName:"ethereum",symbol:"eth",holdings:0.09198},
        {coinName:"nano",symbol:"nano",holdings:14},
        {coinName:"tezos",symbol:"xtz",holdings:20},
        {coinName:"banano",symbol:"ban",holdings:1300},
        {coinName:"basic-attention-token",symbol:"bat",holdings:12.5},
        {coinName:"callisto",symbol:"clo",holdings:115},
        {coinName:"gnosis",symbol:"gno",holdings:0.1},
        {coinName:"ravencoin",symbol:"rvn",holdings:50}
    ];
    
    const dataDaysBefore =1;
    const currency = "eur";
    const currencySymbol = "€";
    const interval = "hourly ";   
    
    function loadData()
    {
        blurBg(4);
        getCoinsData(objClone(coinList),currency,dataDaysBefore,interval);
    }

    function launchApp(rawCoinData,requestErrors = [])
    {
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