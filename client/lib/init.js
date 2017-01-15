//Web3インスタンスの生成
web3 = new Web3();

addr = "0xefbaa5228e7c7a2e91c6664e755433998701bf0a";
abi = '[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"pages","outputs":[{"name":"owner","type":"address"},{"name":"data","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"}],"name":"get","outputs":[{"name":"data","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"source","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"result","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"data","type":"string"}],"name":"set","outputs":[],"payable":false,"type":"function"}]';
abi_json = JSON.parse(abi);
cnt = web3.eth.contract(abi_json).at(addr);
homepage = "index";

//RPCプロバイダを設定
//URLの部分は読者の環境に合わせてください。（localhostの部分はIPアドレスにて指定してもかまいません。）
if(!web3.currentProvider)
  web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));

// EthAccounts初期化
EthAccounts.init();

//EthBlocksの初期化
EthBlocks.init();
