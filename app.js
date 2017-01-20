var express = require("express");
var fs = require("fs");
var app = express();
var Web3 = require('web3');
var web3 = new Web3();

app.use(express.static('htdocs'));
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var addr = "0xa70d6a74284a3d1a25c41fe35e6c2dd96729e5a4";
var abi = '[{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"index","type":"uint256"}],"name":"get","outputs":[{"name":"data","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"deletePage","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"getlen","outputs":[{"name":"leng","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"time","type":"bytes32"},{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"data","type":"bytes"}],"name":"set","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"pages","outputs":[{"name":"owner","type":"address"},{"name":"timestamp","type":"bytes32"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"data","type":"uint256"}],"name":"RegisterEvent","type":"event"}]';
var domain = "test.com";
var homepage = "index";

var abi_json = JSON.parse(abi);
var cnt = web3.eth.contract(abi_json).at(addr);
var length = cnt.getlen(domain,homepage).c[0];
var result = '';
for(let i=0;i<length;i++){
  var res = ""+cnt.get(domain,homepage,i)
  result += res.slice(2);
}
console.log(result);

var buf = new Buffer(result, 'hex');
console.log(buf);
fs.writeFileSync('htdocs/tmp/index.html', buf);

// var server = app.listen(4000, function(){
//   console.log("Node.js is listening to PORT:" + server.address().port);
// });
