import { ReactiveVar } from 'meteor/reactive-var';

Template.nodeStatusComponent.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.content = new ReactiveVar(cnt.get(homepage));
  // this.content = cnt.get(homepage);
});

Template.nodeStatusComponent.helpers({

  //ページ名の取得
  pagename: function(){
    return homepage;
  },

  //コンテンツの取得
  htmlContent: function(){
    return Template.instance().content.get();
    //return cnt.get(homepage);
  }
});

Template.nodeStatusComponent.events({
  "submit .pageform": function (event,instance) {
    event.preventDefault();
    homepage = event.target.text.value;
    console.log(homepage);

    var res = cnt.get(homepage);
    if(res == ''){
      instance.content.set("<h1>Not found!</h1>");
    }else{
      instance.content.set(res);
    }
  }
});
