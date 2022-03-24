// import fetch from 'node-fetch';  // uncomment for local node.js test

const url = 'https://sqldatacoins.azurewebsites.net/api/coins';

function put_comment(id){
    var message = document.getElementById("comment-box").value
    var name = document.getElementById("fullname").value
    var email = document.getElementById("email").value
    var comment_start = "{\"Comments\": \""
    const put_url = url.concat("/",id)
    const comment = comment_start.concat(message," - ",name,": ",email,"\"}")

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

//test values/call
// var id = "6235300c7d843b7d8b633361"
// var msg = "node test from cli"
// put_comment(id, msg)
