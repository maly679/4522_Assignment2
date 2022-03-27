document.addEventListener('DOMContentLoaded', function() {

const mainCoins = 'https://sqldatacoins.azurewebsites.net/api/HttpTrigger3?code=Rwc2/lGDvUiJ9DnDqLXYLLGcP41IB2eSnFMA8SGIyXLhFvjon00elw==';
const CryptoCoins = 'https://sqldatacoins.azurewebsites.net/api/CryptoInfo';
const CoinPut = 'https://sqldatacoins.azurewebsites.net/api/coins/id ';
let glist;

Promise.all([
    fetch(mainCoins),
    fetch(CryptoCoins),
    fetch(CoinPut)
  ]).then(allResponses => {
    const response1 = allResponses[0]
    const response2 = allResponses[1]
    const response3 = allResponses[2]
  
    response1.json().then(data => {
        console.log("yes");
        glist = [...data];

    });


        response2.json().then(data => {

    
              console.log(data);
                   for (let d of data) {
                       for (let g of glist) {
                   if (d.Symbol == g.CoinSymbol) {
                       g.Price = d.Marketcap;
                       g.Date = d.Date.split("23:59")[0];
                       
                   }
                }
              
            }
      
         
        });
        response3.json().then(data => {

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
     addCoinList(glist);
     console.log(glist);

        });

      });
    

let selectedCoinValue;
let selectedComment;


function addCoinList(data) {

    console.log(data);

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
        if ( d.Comments)  {
        optionT.textContent = d.Comments;
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


document.querySelector("#selectCoin").addEventListener("change", function(event) {


    selectedCoinValue = event.target.value;
    console.log(selectedCoinValue);

});

document.querySelector("#comment-box").addEventListener("change", function (event) {

   
    selectedComment = event.target.value;
    console.log(selectedComment);


});
let url = `https://sqldatacoins.azurewebsites.net/api/coins/${selectedCoinValue}`;
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
