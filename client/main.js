//テンプレート「nodeStatusComponent」のテンプレートヘルパー
//web3オブジェクトのプロパティを取得する各種メソッドを定義。
Template.nodeStatusComponent.helpers({

  //接続先ノードの取得
  currentProvider: function(){
    return web3.currentProvider.host;
  },

  //接続先ノードのマイニング状態の取得
  //マイニング中であればtrue、そうでなければfalse
  isMining: function(){
    return web3.eth.mining;
  },

  //接続先ノードのマイニングのハッシュレートを取得
  currentHashrate: function(){
    return web3.eth.hashrate;
  },

  //接続先ノードのピア数の取得
  htmlContent: function(){
    var addr = "0x79e61820d8c75648ee17a38c43ae8c17d46a5369";
    var abi = '[{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"data","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"data","type":"string"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"data","type":"string"}],"name":"RegisterEvent","type":"event"}]';
    var abi_json = JSON.parse(abi);
    var cnt = web3.eth.contract(abi_json).at(addr);
    return cnt.get();
  }
});
