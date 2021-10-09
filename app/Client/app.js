{
    function loadData()
    {
        // Data Parameters
        //temporary hardcoded
        const dataDaysBefore = 90;
        const currency = "eur";
        const interval = "daily";   
        const coinNames = ["ethereum","tezos","nano","gnosis","banano","basic-attention-token","ravencoin","callisto"];
        getCoinsData(coinNames,currency,dataDaysBefore,interval);
    }

    function launchApp(rawCoinData,requestErrors = [])
    {
        //temporary hardcoded
        const holdings = {"ethereum":0.09198,"nano":14,"tezos":20,"banano":1300,"gnosis":0.1,"ravencoin":50,"basic-attention-token":12.5,"callisto":115};

        //Convert raw data to user Friendly data
        const coinsData = extractCoinData(objClone(rawCoinData),objClone(holdings));        

        //Use the historic data and holdings arr to build a chart dataset
        const portfChart = buildPortfolioChartData(objClone(coinsData),objClone(holdings)); 
        
        //Initiate the display of the UI and data.
        //.....
        console.log(portfChart);
        console.log(coinsData);
    }   

    loadData();














}