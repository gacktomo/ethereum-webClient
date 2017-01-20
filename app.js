var express = require("express");
var fs = require("fs");
var zlib = require('zlib');
var tar  = require('tar');
var bodyParser = require('body-parser');
var app = express();
var Web3 = require('web3');
var web3 = new Web3();

app.use(express.static('htdocs'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var addr = "0xe6c398c71929912fb840ef5920244b0180ce647f";
var abi = '[{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"index","type":"uint256"}],"name":"get","outputs":[{"name":"data","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"deletePage","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"getlen","outputs":[{"name":"leng","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"time","type":"bytes32"},{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"data","type":"bytes"}],"name":"set","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"pages","outputs":[{"name":"owner","type":"address"},{"name":"timestamp","type":"bytes32"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"data","type":"uint256"}],"name":"RegisterEvent","type":"event"}]';
var domain = "test2.com";
var homepage = "index";

var abi_json = JSON.parse(abi);
var cnt = web3.eth.contract(abi_json).at(addr);

var server = app.listen(4000, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

app.post("/toPage", function(req, res, next){
    console.log(req.body);
    domain = req.body.domain;
    homepage = req.body.pageName;
    getContent(function(state){
      res.json({result:state});
    });
});

function getContent(callback){
  //get packetNum
  var length = cnt.getlen(domain,homepage).c[0];
  if(length==0) {
    callback('Not Found');
    return;
  }
  console.log(length);

  //fetch packets
  var result = '';
  for(let i=0;i<length;i++){
    var res = ""+cnt.get(domain,homepage,i)
    result += res.slice(2);
  }

  //fetched data covert to Buffer & write!
  var buf = new Buffer(result, 'hex');
  console.log(buf);
  fs.writeFileSync('htdocs/tmp/index.tgz', buf);

  //untar
  var tarballPath = 'htdocs/tmp/index.tgz';
  var outputPath  = 'htdocs/tmp';
  var gunzip    = zlib.createGunzip();
  var extractor = tar.Extract({path: outputPath});
  fs.createReadStream(tarballPath).pipe(gunzip).pipe(extractor);
  console.log('unpacked!');
  callback('OK');
}
