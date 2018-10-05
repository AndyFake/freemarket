const UN = process.env.GITHUB_USERNAME
const SK = process.env.GITHUB_PASSWORD
var request = require('request');

exports.handler = function(event, context, callback) {
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: ''
    });
  }
  const data = JSON.parse(event.body);
  getStock(data)
}

function getStock(changes){
  var getOptions = {
      url: `http://api.github.com/repos/${UN}/freemarket/content/settings/contents/stock.json`,
      auth: {
          "user": UN,
          "pass": SK,
      },
      headers: {
        'User-Agent': 'request'
      }
  };

  function getCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(body)
        var buf = new Buffer(data.content, 'base64').toString();
        var stock = (JSON.parse(buf)).productStock
        var sha = data.sha
        var newStock = processChanges(stock,changes)
        setStock(newStock,sha)
    }
  }
  request(getOptions, getCallback);
}

function setStock(newStock,sha){

  var newJSON = new Buffer(JSON.stringify(newStock)).toString("base64");

  var options = {
    url: `https://api.github.com/repos/${UN}/freemarket/content/settings/contents/stock.json`,
    auth: {
        "user": UN,
        "pass": SK
    },
    headers: {
      'User-Agent': 'request'
    },
    method:"PUT",
    body:JSON.stringify({
      "message":"update_stock",
      "content":newJSON,
      "sha":sha,
      "committer": {
        "name":'andy',
        "email":'andy@fake.com'
      }
    })
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(body)
        console.log(data)
    }
    console.log('response-> '+JSON.stringify(response))
    console.log('error-> '+error)
  }

  request(options, callback);
}

function processChanges(stock,changes){
  var newStock = [...stock]
  for(let item of Object.keys(changes)){
    newStock = newStock.map(entry=>{
      if(entry.productType==item){
        return {productType:item,currentStock:entry.currentStock+changes[item]}
      }else{
        return item
      }
    })
    // newStock[item]+=changes[item]
  }
  return newStock
}

// getStock({"x":1,"y":1,"z":1})

