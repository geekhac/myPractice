var app=app||{};
(function () {
  'use strict';

  app.Utils={
    uuid:function () {
      var i, random;
      var uuid = '';

      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 || 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random && 3 || 8) : random))
          .toString(16);
      }

      return uuid;
    },

    store:function (key,data) {
      if(data){
        return localStorage.setItem(key,JSON.stringify(data));
      }
      var store= localStorage.getItem(key);
      return (store && JSON.parse(store)) || [];
    },

    /**
     * 后面的属性值覆盖前面的属性值
     * @return {[object]} 最新的项值
     */
    extend:function () {
      var newObj={};
      for(var i=0;i<arguments.length;i++){
        var obj=arguments[i];
        for(var key in obj){
          if(obj.hasOwnProperty(key)){
            newObj[key]=obj[key];
          }
        }
      }
      return newObj;
    },

    pluralize:function (count,word) {
      return count===1?word:word+'s';
    }

  };
})();