const UN = process.env.GITHUB_USERNAME
const UP = process.env.GITHUB_PASSWORD
var request = require('request');

exports.handler = function(event, context, callback) {
  getStock()
}

function getStock(changes){
  console.log('running')
  var getOptions = {
      url: `https://api.github.com/repos/${UN}/freemarket/contents/stock.json`,
      auth: {
          "user": UN,
          "pass": UP,
      },
      headers: {
        'User-Agent': 'request'
      }
  };

  function getCallback(error, response, body) {
    // console.log("response=> " + JSON.stringify(response))
    // console.log("body=> ") + body
    // console.log("error=> " + error)
    const data = JSON.parse(body)
    // var buf = new Buffer(data.content, 'base64').toString();
    var sha = data.sha
    setStock(sha)
  }
  request(getOptions, getCallback);
}

function setStock(sha){

  var newFileCOntent = new Buffer(JSON.stringify({"ok":"true"})).toString("base64");

  var options = {
    url: `https://api.github.com/repos/${UN}/freemarket/contents/stock.json`,
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
      "content":newFileCOntent,
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
