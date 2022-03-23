import fetch from 'node-fetch';

const url = 'https://sqldatacoins.azurewebsites.net/api/coins';

function put_comment(id, message){
    var comment_start = "{\"Comments\": \""
    const put_url = url.concat("/",id)
    const comment = comment_start.concat(message,"\"}")

    fetch(put_url, {
        method: 'PUT',
        body: comment
    })
        .then(response => response.json())
        .then((data) => {
            console.log("success", data)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

//test
var id = "6235300c7d843b7d8b633361"
var msg = "its a test"
put_comment(id, msg)