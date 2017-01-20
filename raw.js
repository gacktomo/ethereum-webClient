var express = require("express");
var fs = require("fs");
var app = express();
var Web3 = require('web3');
var web3 = new Web3();
var keythereum = require("keythereum");

app.use(express.static('htdocs'));
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var addr = "0xa2ecb2aba3e857de6888261c7cd5edaa28f86e68";
var abi = '[{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"get","outputs":[{"name":"data","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"set","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"pages","outputs":[{"name":"owner","type":"address"},{"name":"data","type":"bytes"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"data","type":"bytes"}],"name":"RegisterEvent","type":"event"}]';
var domain = "test.com";
var homepage = "index";
var abi_json = JSON.parse(abi);
var cnt = web3.eth.contract(abi_json).at(addr);


var events = cnt.allEvents();
// watch for changes
events.watch(function(error, event){
  if (!error)
    console.log(event);
});

var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('b77e1c209a2a4a499585bbc433258ce3b8aa074784681cbc1f246ebfbc7bd36e', 'hex')

gasPrice = web3.eth.gasPrice;
gasPriceHex = web3.toHex(gasPrice);
gasLimitHex = web3.toHex(300000);

console.log('Current gasPrice: ' + gasPrice + ' OR ' + gasPriceHex);

nonce =  web3.eth.getTransactionCount(web3.eth.accounts[0]) ;
nonceHex = web3.toHex(nonce);

var rawTx = {
  nonce: nonceHex,
  gasPrice: gasPriceHex,
  gasLimit: gasLimitHex,
  from: web3.eth.accounts[0],
  to: addr,
  value: '0x00',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
}

var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

cnt.set.sendRawTransaction(serializedTx.toString('hex'), function(err, hash) {
  if (!err)
    console.log(hash);
});

//cnt = eth.contract([{"constant":true,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"get","outputs":[{"name":"data","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"domain","type":"bytes32"},{"name":"name","type":"bytes32"}],"name":"set","outputs":[{"name":"result","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"pages","outputs":[{"name":"owner","type":"address"},{"name":"data","type":"bytes"}],"payable":false,"type":"function"}]).at('0x71c8ed57fa080a00cb470e452fa995b902e83020');
// cnt.set.sendTransaction("test.com","index",{data:"0xdaaf",from:eth.accounts[0]})
