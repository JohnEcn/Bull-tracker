function addCoin(coinName,coinId,coinSymbol,holdings)
{
    let currentCoinList = JSON.parse(fetchUserData());  

    //if coin already exist in portfolio add the holdings
    for(let i=0;i<currentCoinList.length;i++)
    {
        if(coinId == currentCoinList[i].coinName)
        {
            currentCoinList[i].holdings = Number.parseInt(holdings);
            setUserData(JSON.stringify(currentCoinList));
            return;
        }
    }

    currentCoinList.push({coin:coinName,coinName:coinId,symbol:coinSymbol,holdings:holdings});
    setUserData(JSON.stringify(currentCoinList));
}