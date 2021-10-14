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

    function searchCoin()
    {
        let searchQuery = document.getElementById("coinNameSearch").value.toLowerCase();
        let imgElement = document.getElementById("coinImg");
        let nameElement = document.getElementById("coinSymbol");
        let errorLabel = document.getElementById("coinErrorLabel");

        let coinSymbol = "";
        let coinName = "";   

        //Reset window to initial state
        imgElement.src = "";  
        imgElement.onerror = function(){};
        nameElement.innerText = coinName;
        errorLabel.innerText = "";

        for(let i=0;i<coinList.length;i++)
        {
            if(coinList[i].symbol.toLowerCase() == searchQuery)
            {
                coinSymbol = coinList[i].symbol;
                coinName = coinList[i].name;                                               
            }
        }

        if(coinSymbol != "")
        {
            imgElement.src = "https://cryptoicons.org/api/icon/"+ coinSymbol +"/100";  
            imgElement.onerror = function()        
            {
                imgElement.src="https://cryptoicon-api.vercel.app/api/icon/"+ coinSymbol;
            };
            nameElement.innerText = coinName;
            document.getElementById("saveButton").disabled = false;
        }
        else
        {
            errorLabel.innerText = "-Nothing found-";
        }  
   }
  