document.addEventListener('DOMContentLoaded', function() {

    const mainCoins = 'https://sqldatacoins.azurewebsites.net/api/HttpTrigger3?code=Rwc2/lGDvUiJ9DnDqLXYLLGcP41IB2eSnFMA8SGIyXLhFvjon00elw==';
    const CryptoCoins = 'https://sqldatacoins.azurewebsites.net/api/CryptoInfo';
    const CoinPut = 'https://sqldatacoins.azurewebsites.net/api/coins/id';
    let glist;
    let selectedCoinValue;
    let selectedComment;
    
    //location.reload();
    
      function addCoinList(data) {
    
        document.querySelector(".coin").innerHTML = "";
        let ulStuff = document.getElementsByClassName(".coin");
        for (let d of data) {
            let optionT = document.createElement("li");
            optionT.textContent = d.CoinName;
            document.querySelector(".coin").appendChild(optionT);
    
        }
    
        document.querySelector(".symbol").innerHTML = "";
       
        for (let d of data) {
            let optionT = document.createElement("li");
            console.log(d.Symbol);
            optionT.textContent = d.CoinSymbol;
            document.querySelector(".symbol").appendChild(optionT);
    
        }
    
        document.querySelector(".price").innerHTML = "";
       
        for (let d of data) {
            let optionT = document.createElement("li");
            console.log(d.Symbol);
            optionT.textContent = d.Price;
            document.querySelector(".price").appendChild(optionT);
    
        }
         /* document.querySelector(".marketcap").innerHTML = "";

        for (let d of data) {
            let optionT = document.createElement("li");
            console.log(d.Symbol);
            optionT.textContent = d.marketcap;
            console.log(marketcap);
            document.querySelector(".marketcap").appendChild(optionT);
            //console.log(d.marketcap);
        }  */
    
        document.querySelector(".date").innerHTML = "";
       
        for (let d of data) {
            let optionT = document.createElement("li");
            console.log(d.Symbol);
            optionT.textContent = d.Date;
            document.querySelector(".date").appendChild(optionT);
    
        }
    
        document.querySelector(".comments").innerHTML = "";
       
        for (let d of data) {
            let optionT = document.createElement("li");
            optionT.classList.add("deleteOption");
            
            let button = document.createElement("button");
            if ( d.Comments)  {
                optionT.innerHTML = d.Comments + ' <button class = "deleteButton"><img class = "exitButton" src="./exitButton.png" /></button> </li>';
                optionT.setAttribute("id", d.ID);
            } else {
                optionT.innerHTML = "</br>";
            }
            document.querySelector(".comments").appendChild(optionT);
            
    
        }
    
    
        for (let d of data) {
            let optionT = document.createElement("option");
            console.log(d.Symbol);
            optionT.text = d.CoinName;
            optionT.value = d.ID;
            document.querySelector("#selectCoin").appendChild(optionT);
    
        }
    
    }
     async function renderMainCoins() {
        return new Promise(function(resolve) {
            setTimeout(function() {
           fetch(mainCoins).then(response => response.json()).then(data => {
            console.log(data);
            glist = [...data];
           });
    
           resolve();
        }, 500)
     });
    }
    
     
     async function renderCryptoCoins() {
        return new Promise(function(resolve) {
            setTimeout(function() {
        fetch(CryptoCoins).then(response => response.json()).then(data => {
    
        
            console.log(data);
                 for (let d of data) {
                     for (let g of glist) {
                 if (d.Symbol == g.CoinSymbol) {
                    var a = "$"
                     g.Price = a + d.Price;
                     g.marketcap = a + d.marketcap;
                    console.log(d.marketcap);
                     g.Date = d.Date.split("T")[0];
                     
                 }
              }
            }
    
          });
          resolve();
        }, 800)
    });
    }
    
    
    async function renderCoinPut() {
        return new Promise(function(resolve) {
            setTimeout(function() {
        fetch(CoinPut).then(response => response.json()).then(data => {
    
                for (let d of data) {
    
                    for (let g of glist) {
                       console.log(d.Symbol);
                if (d.Symbol == g.CoinSymbol) {
                    g.Comments = d.selectedComment;
                    g.ID = d._id;
                    console.log(g.ID);
                }
             }
           
            
         }
         document.querySelector(".table-responsive").removeChild(img);
         
         addCoinList(glist);

        });
        resolve();
      }, 1000)
    });  
     
    }
    

    let img = document.createElement("img");
    img.setAttribute('src', 'bitcoin loading.gif');
    document.querySelector(".table-responsive").appendChild(img);
    
    
    
    async function inParallel() {
        const promise1 = renderMainCoins();
        const promise2 = renderCryptoCoins();
        const promise3 = renderCoinPut();
        const first = await promise1;
        const second = await promise2;
        const third = await promise3;
        // const addCoin = await addCoinList(glist);
     }
    
    // renderMainCoins();
    // renderCryptoCoins();
    //  renderCoinPut();
    inParallel();
     console.log(glist);
     
    
    document.querySelector("#selectCoin").addEventListener("change", function(event) {
        // console.log(document.querySelector("#selectCoin"));
        // var selectedOption = document.forms[0].selectCoin;
    
        selectedCoinValue = event.target.value;
        console.log(selectedCoinValue);
    
    });
    
    document.querySelector("#comment-box").addEventListener("change", function (event) {
    
       
        selectedComment = event.target.value;
        console.log(selectedComment);
    
    
    });
    
    
    
    document.querySelector(".comments").addEventListener('click',  function(e) {
    
        e.preventDefault();
    
            if(e.target.className == 'exitButton') {
        
        let IDofDeletedCoin = e.target.parentElement.parentElement.id;
        console.log(IDofDeletedCoin);
    
            fetch(`https://sqldatacoins.azurewebsites.net/api/coins/${IDofDeletedCoin}`, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
    
            }
        });
            
    
    
    
    
    
    
    
    document.querySelector(".submitCoin").addEventListener("click",  function(e) {
    
        e.preventDefault();
    
        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify({selectedComment}) // We send data in JSON format
           }
           
           // make the HTTP put request using fetch api
           fetch(`https://sqldatacoins.azurewebsites.net/api/coins/${selectedCoinValue}`, putMethod)
           .then(response => response.json())
           .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
           .catch(err => console.log(err)) // Do something with the error
    
        });
    });