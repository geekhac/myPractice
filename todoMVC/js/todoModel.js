var app=app||{};

(function  () {
  'use strict';

  var Utils=app.Utils;

  app.TodoModel=function (key) {
    this.key=key;
    this.todos=Utils.store(key);
    this.changes=[];
  };

  app.TodoModel.prototype.subscribe = function(onChange){
     this.changes.push(onChange);
  };

  app.TodoModel.prototype.inform = function(){
    Utils.store(this.key,this.todos);
    this.changes.forEach( function(cb) {
      cb();
    });
  };

  app.TodoModel.prototype.addTodo = function(title){
    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false
    });
    this.inform();
  };

  app.TodoModel.prototype.toggleAll = function(completed){
      this.todos=this.todos.map( function(todo) {
        return Utils.extend(todo,{completed:completed});
      });
      this.inform();
  };

  app.TodoModel.prototype.toggle = function(todoToToggle){
    this.todos=this.todos.map( function(todo) {
      return todo!==todoToToggle?
        todo: Utils.extend(todo,{completed:!todo.completed});
      });
      this.inform();
  };

  app.TodoModel.prototype.destroy = function(destroyTodo){
     this.todos=this.todos.filter(function (todo) {
       return todo!==destroyTodo;
     });
     this.inform();
  };

  app.TodoModel.prototype.save = function(todoToSave,val){
     this.todos=this.todos.map( function (todo) {
       return todo!==todoToSave?todo:Utils.extend(todo,{title:val});
     });
     this.inform();
  };

  app.TodoModel.prototype.clearCompleted = function(){
     this.todos=this.todos.filter(function (todo) {
       return !todo.completed;
     });
     this.inform();
  };

})();