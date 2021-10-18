    let coinList = null;

    async function openUserDataPopup()
    {   
        blurBg(8);
        document.getElementById('fullPageovelay').style.display = "initial";
        
        if(coinList == null)
        {
            await fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(response => response.text())
        .then(text => coinList = JSON.parse(text));
        }        

        if(coinList.length != 0)
        {
            document.getElementById('insert-editDataPopup').style.display = "flex";
            document.getElementById('fullPageovelay').style.display = "initial";
        }
        else
        {
           closeUserDataPopup();    
            alert("error");
        }
    }
   
    function closeUserDataPopup()
    {
        document.getElementById('insert-editDataPopup').style.display = "none";
        document.getElementById('fullPageovelay').style.display = "none";
        blurBg(0);
    }

    async function getCoinData()
    {
        let searchQuery = document.getElementById("coinNameSearch").value.toLowerCase();
        let imgElement = document.getElementById("coinImg");
        let nameElement = document.getElementById("coinName");
        let idElement = document.getElementById("coinId");
        let errorLabel = document.getElementById("coinErrorLabel");

        const coinData = searchForCoin(searchQuery);
        const coinSymbol = coinData[2];
        const coinName = coinData[1];  
        const coinId = coinData[0];   
    
        if(coinSymbol != "")
        {
            imgElement.src = await getCoinImgUrl(coinId);  
            imgElement.style.visibility = "initial";
            nameElement.innerText = coinName;
            idElement.innerText = coinId;
            errorLabel.innerText = "";
            document.getElementById("saveButton").disabled = false;
        }
        else
        {
            //Reset  to initial state
            imgElement.src = "";  
            imgElement.onerror = function(){};
            imgElement.style.visibility = "hidden";
            nameElement.innerText = coinName;
            errorLabel.innerText = "-Nothing found-";
            document.getElementById("saveButton").disabled = true;
        }  
    }

    function searchForCoin(coinSymbol)
   {
       const coinData = ["","",""];
       for(let i=0;i<coinList.length;i++)
        {
            if(coinList[i].symbol.toLowerCase() == coinSymbol)
            {
                coinData[2] = coinList[i].symbol;
                coinData[1] = coinList[i].name; 
                coinData[0] = coinList[i].id;                                             
            }
        }
        return coinData;
    }
    function addNewCoin()
    {
        let coinSymbol = document.getElementById("coinNameSearch").value;
        let coinId = document.getElementById("coinId").innerText;
        let coinName = document.getElementById("coinName").innerText;
        let coinImgUrl = document.getElementById("coinImg").src;
        let holdings = document.getElementById("newCoinHoldings").value;

        if(!Number.isInteger(Number.parseInt(holdings)))
        {
            holdings = 0;
        }
        addNewPortfCoin(coinName,coinId,coinSymbol,coinImgUrl,holdings);
        closeUserDataPopup();
        loadData(); 
    }
    async function getCoinImgUrl(coinId)
    {
        let imgUrl = "";
        await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+coinId)
        .then(response => response.text())
        .then(text => imgUrl = JSON.parse(text)[0].image);
        return imgUrl;
    }
  