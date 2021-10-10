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
    ];
    
    const dataDaysBefore = 90;
    const currency = "eur";
    const interval = "daily";   
    
    function loadData()
    {
        getCoinsData(objClone(coinList),currency,dataDaysBefore,interval);
    }

    function launchApp(rawCoinData,requestErrors = [])
    {
        //Convert raw data to user Friendly data
        const coinsData = extractCoinData(objClone(rawCoinData),objClone(coinList));        

        //Use the historic data and holdings arr to build a chart dataset
        const portfChart = buildPortfolioChartData(objClone(coinsData),objClone(coinList)); 
        
        //Initiate the display of the UI and data.
        console.log(portfChart);
        console.log(coinsData);
    }   
    loadData();
}