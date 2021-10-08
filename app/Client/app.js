{

    function loadData()
    {
        // Data Parameters
        //temporary hardcoded
        const dataDaysBefore = 90;
        const currency = "eur";
        const interval = "hourly";   
        const coinNames = ["ethereum","tezos","nano","gnosis","banano","basic-attention-token","ravencoin","callisto"];
        getCoinsData(coinNames,currency,dataDaysBefore,interval);
    }

    function launchApp(fetchedData)
    {
        //temporary hardcoded
        const holdings = {"ethereum":0.09198,"nano":14,"tezos":20,"banano":1300,"gnosis":0.1,"ravencoin":50,"basic-attention-token":12.5,"callisto":115};
        const coinsData = extractCurrentCoinData(objClone(fetchedData));
        const portfChart = buildPortfolioChartData(objClone(coinsData),objClone(holdings));     
        console.log(portfChart);
    }

    function objClone(obj)
    {
        return JSON.parse(JSON.stringify(obj))
    }

    loadData();














}