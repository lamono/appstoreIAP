var Validation = function(){};

var post = function (url, data, cb) {
  data = data || {};
  var content = data;
  var parse_u = require('url').parse(url, true);
  var isHttp = parse_u.protocol == 'http:';
  var options = {
    host: parse_u.hostname,
    port: parse_u.port || (isHttp ? 80 : 443),
    path: parse_u.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': content.length
    }
  };
  var req = require(isHttp ? 'http' : 'https').request(options, function (res) {
    var _data = '';
    res.on('data', function (chunk) {
      _data += chunk;
    });
    res.on('end', function () {
      cb != undefined && cb(_data);
    });
  });
  req.write(content);
  req.end();
};

//the sandbox url: 
var verifyURL = 'https://sandbox.itunes.apple.com/verifyReceipt';
//the work url:
//var verifyURL = 'https://buy.itunes.apple.com/verifyReceipt';

Validation.prototype.check = function(receipt,callback){
	var content = '{"receipt-data" : "' + new Buffer(receipt).toString('base64') + '"}';
  post(verifyURL, content, function (data) {
    var json = JSON.parse(data);
    if (json.status == 0) {
      callback(data, true);
    }else{
			callback(data,true);
		}
  });
};

module.exports = Validation;
