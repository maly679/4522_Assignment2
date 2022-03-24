const uniqueNamesAPI = 'https://sqldatacoins.azurewebsites.net/api/HttpTrigger3?code=Rwc2/lGDvUiJ9DnDqLXYLLGcP41IB2eSnFMA8SGIyXLhFvjon00elw==';

// https://www.mysamplecode.com/2012/04/generate-html-table-using-javascript.html

function namesTable(){
    fetch(uniqueNamesAPI)
        .then(response => response.json())
        .then((data) => {
            // console.log(data)
            addTable(data)
        })
        .catch(function(){
            console.log("error")
        })
}

function addTable(data) {
      
    var myTableDiv = document.getElementById("myDynamicTable");
      
    var table = document.createElement('TABLE');
    table.border='1';
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    
    for (var key in data){
        console.log(data[key].CoinName,data[key].CoinSymbol)
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        //Name
        var td = document.createElement('TD');
        td.width='75';
        td.appendChild(document.createTextNode(data[key].CoinName));
        tr.appendChild(td);

        //Symbol
        var td = document.createElement('TD');
        td.width='75';
        td.appendChild(document.createTextNode(data[key].CoinSymbol));
        tr.appendChild(td);
    }

    myTableDiv.innerHTML = "";
    myTableDiv.appendChild(table);
    
}