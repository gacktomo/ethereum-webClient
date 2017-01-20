var express = require("express");
var fs = require("fs");
var app = express();
var Web3 = require('web3');
var web3 = new Web3();
var keythereum = require("keythereum");

app.use(express.static('htdocs'));
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var addr = "0xe6c398c71929912fb840ef5920244b0180ce647f";
var abi = '[{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"index","type":"uint256"}],"name":"get","outputs":[{"name":"data","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"deletePage","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"getlen","outputs":[{"name":"leng","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"time","type":"bytes32"},{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"data","type":"bytes"}],"name":"set","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"pages","outputs":[{"name":"owner","type":"address"},{"name":"timestamp","type":"bytes32"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"data","type":"uint256"}],"name":"RegisterEvent","type":"event"}]';
var domain = "test2.com";
var homepage = "index";

var abi_json = JSON.parse(abi);
var cnt = web3.eth.contract(abi_json).at(addr);

var events = cnt.allEvents();
events.watch(function(error, event){
  if (!error)
    console.log(event);
});

fs.readFile("htdocs/send/edu.tgz", function (err, data) {
    if (err) throw err;
    var hex = Buffer(data).toString("hex");
    var splitSize = 20000;
    var packetNum = parseInt(hex.length/splitSize);
    if(hex.length%splitSize==0) packetNum--;

    var timestamp = ""+new Date().getTime();
    for(let i=0;i<=packetNum;i++){
      var packet = '0x'+hex.substr(i*splitSize,splitSize);
      var hash = cnt.set.sendTransaction(timestamp,domain,homepage,packet,{gas:4000000,from:web3.eth.accounts[0]});
      if(i==0) console.log(calcGas(hash));
      console.log(i);
    }
});

function calcGas(hash){
  var tx = web3.eth.getTransaction(hash);
  var result = web3.eth.estimateGas({ to: addr, data: tx.input });
  return 'need gas : '+result;
}
