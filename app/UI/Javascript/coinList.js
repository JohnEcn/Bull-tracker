function displayCoinList(coinData,currencyStr)
{
    //Get the parent element of coinsList
    const coinList = document.getElementById("coinListContainer");

    //Get the prototype row and remove the id
    const coinRowDiv = document.getElementById("coinRowPrototype");
    coinRowDiv.id = "";
    coinRowDiv.style = "visibility:initial";
    //Delete the prototype row
    coinRowDiv.remove();

    for(let i=0;i<coinData.length;i++)
    {
        let newRow = coinRowDiv.cloneNode(true);

        //CoinName
        newRow.childNodes[1].childNodes[3].childNodes[3].innerHTML = formatName(coinData[i].coinName);
        //Coin Image
        newRow.childNodes[1].childNodes[3].childNodes[1].src="https://cryptoicons.org/api/icon/"+ coinData[i].coinSymbol +"/40";
        newRow.childNodes[1].childNodes[3].childNodes[1].onerror = function()
        {
            newRow.childNodes[1].childNodes[3].childNodes[1].src="https://cryptoicon-api.vercel.app/api/icon/"+ coinData[i].coinSymbol;;
        };
        //Coin price
        newRow.childNodes[3].childNodes[3].childNodes[1].innerHTML = currencyStr + formatPrices(coinData[i].currentPrice);
        //Coin percentage change
        setPerc(coinData[i].percChange,newRow.childNodes[3].childNodes[5].childNodes[1]);
        //Coin Holdings price
        newRow.childNodes[5].childNodes[3].childNodes[1].innerHTML = currencyStr + formatPrices(coinData[i].holdings * coinData[i].currentPrice);
        //Coin holdings count
        newRow.childNodes[5].childNodes[5].childNodes[1].innerHTML = coinData[i].holdings;

        newRow.childNodes
        coinList.appendChild(newRow);
    }  
   
}

function formatPrices(number)
{
    if(number < 1)
    {
        return number.toFixed(5);
    }
    return (Math.round(number * 100) / 100).toFixed(2);

}
function formatName(str) {
  return str[0].toUpperCase() + str.slice(1).replace("-"," ").replace("-"," ")  ;;
}
function setPerc(number,node) {

    let red = 200;
    let green = 200;
    let blue = 200;    

    if(number > 0)
    {
        red = red - (red * (number/100))*2.5;
        blue = blue - (blue * (number/100))*2.5;
    }
    else if(number < 0)
    {
        green = green - (green * ((number*-1)/100))*2.5;
        blue = blue - (blue * ((number*-1)/100))*2.5;
    }

    let color = "rgb("+red+","+green+","+blue+")";
    node.style.color = color;
    node.innerHTML = (Math.round(number * 100) / 100).toFixed(2) + "%";
}
