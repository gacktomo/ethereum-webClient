//テンプレート「nodeStatusComponent」のテンプレートヘルパー
//web3オブジェクトのプロパティを取得する各種メソッドを定義。
Template.nodeStatusComponent.helpers({

  //ページ名の取得
  pagename: function(){
    return homepage;
  },

  //コンテンツの取得
  htmlContent: function(){
    var abi_json = JSON.parse(abi);
    var cnt = web3.eth.contract(abi_json).at(addr);
    return cnt.get(homepage);
    //return "<h1>title</h1><p>test</p>";
  }
});
