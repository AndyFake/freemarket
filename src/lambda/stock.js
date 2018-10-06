const UN = process.env.GITHUB_USERNAME
const UP = process.env.GITHUB_PASSWORD

var request = require('request');

function calculateNewStock(stock,changes){
  var newStock = [...stock.productStock]
  for(let change of changes){
    newStock=newStock.map(stock=>{
      if(stock.productType==change.title){
        return {
          productType:stock.productType,
          currentStock:stock.currentStock-change.quantity
          }
      }else{
        return stock
      }
    })
  }
  return newStock
}

exports.handler = function(event, context, callback) {
  var changes = JSON.parse(event.body)
  getStock(changes)
}

function getStock(changes){
  console.log('running')
  var getOptions = {
      url: `https://api.github.com/repos/${UN}/freemarket/contents/content/settings/stock.json`,
      auth: {
          "user": UN,
          "pass": UP,
      },
      headers: {
        'User-Agent': 'request'
      }
  };

  function getCallback(error, response, body) {
    const data = JSON.parse(body)
    var sha = data.sha
    var buf = new Buffer(data.content, 'base64').toString();
    var stock = JSON.parse(buf)
    var newStock = calculateNewStock(stock,changes)
    setStock(sha,newStock)
  }
  request(getOptions, getCallback);
}

function setStock(sha,newStock){

  var newFileContent = new Buffer(JSON.stringify({productStock:newStock})).toString("base64");

  var options = {
    url: `https://api.github.com/repos/${UN}/freemarket/contents/content/settings/stock.json`,
    auth: {
        "user": UN,
        "pass": UP
    },
    headers: {
      'User-Agent': 'request'
    },
    method:"PUT",
    body:JSON.stringify({
      "message":"update_stock",
      "content":newFileContent,
      "sha":sha,
      "committer": {
        "name":'andy',
        "email":'andy@fake.com'
      }
    })
  };

  function callback(error, response, body) {
    // console.log("response=> " + JSON.stringify(response))
    // console.log("body=> ") + body
    // console.log("error=> " + error)
  }
  request(options, callback);
}
