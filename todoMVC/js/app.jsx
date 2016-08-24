var app=app||{};
(function () {
  'use strict'

  var ENTER_KEY=13;

  app.ALL_TODOS='all';
  app.ACTIVE_TODOS="active";
  app.COMPLETED_TODOS="completed";

  var TodoItem=app.TodoItem;
  var TodoFooter=app.TodoFooter;

  var TodoApp = React.createClass({
    getInitialState: function() {
      return {
        newTodo: '',
        nowShowing:app.ALL_TODOS,
        editing:null
      };
    },

    handleChange:function (event) {
      this.setState({
        newTodo: event.target.value.trim()
      });
    },

    handleNewTodoKeyDown:function (event) {
      if(event.keyCode === ENTER_KEY){
        event.preventDefault();
        var val=this.state.newTodo;
        if(val){
          this.props.model.addTodo(val);
          this.setState({
            newTodo:''
          });
        }
      }
      return;
    },

    toggleAll:function (event) {
      var checked=event.target.checked;
      this.props.model.toggleAll(checked);
    },

    toggle: function (todoToToggle) {
      this.props.model.toggle(todoToToggle);
    },

    edit:function (todo) {
      this.setState({
        editing: todo.id
      });
    },

    cancel:function () {
      this.setState({
        editing: null
      });
    },

    destroy:function (todo) {
      this.props.model.destroy(todo);
    },

    save:function (todo,val) {
      this.props.model.save(todo,val);
      this.setState({
        editing: null,
      });
    },

    componentDidMount: function() {
      var setState=this.setState;
      var router=Router({
        '/' : setState.bind(this,{nowShowing:app.ALL_TODOS}),
        '/active' : setState.bind(this,{nowShowing:app.ACTIVE_TODOS}),
        '/completed': setState.bind(this,{nowShowing:app.COMPLETED_TODOS}),
      });
      router.init('/');
    },

    clearCompleted:function () {
      this.props.model.clearCompleted();
    },

    render: function() {
      var main;
      var footer;

      var todos=this.props.model.todos;
      var completedTodoCount=todos.reduce(function(accum,todo){
        return todo.completed?accum+1:accum;
      },0);
      var activeTodoCount=todos.length-completedTodoCount;

      var showTodos=todos.filter(function  (todo) {
        switch(this.state.nowShowing){
          case app.COMPLETED_TODOS:
            return todo.completed;
          case app.ACTIVE_TODOS:
            return !todo.completed;
          default:
            return true;
        }
      },this)

      var todoItems=showTodos.map(function(todo) {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            //第一个this指定了调用哪个方法，虽然react自动帮我们指定了正确的this，但是传递参数的时候还是要我们自己指定
            onToggle={this.toggle.bind(this,todo)}
            onEdit={this.edit.bind(this,todo)}
            editing={this.state.editing === todo.id}
            onCancel={this.cancel}
            onDestroy={this.destroy.bind(this,todo)}
            onSave={this.save.bind(this,todo)}
          />
        )
      },this);

      var todoList=(
          <ul className="todo-list">
            {todoItems}
          </ul>
      )

      if(todos.length){
        main=(
          <section className="main">
            <input
              className="toggle-all"
              type="checkbox"
              onChange={this.toggleAll}
              checked={activeTodoCount===0}
            />
            {todoList}
          </section>
        );
      }
      if(activeTodoCount||completedTodoCount){
        footer=(
          <TodoFooter
            count={activeTodoCount}
            nowShowing={this.state.nowShowing}
            completedCount={completedTodoCount}
            clearCompleted={this.clearCompleted}
          />
        )
      }

      return (
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="what needs to be done?"
              value={this.state.newTodo}
              onChange={this.handleChange}
              onKeyDown={this.handleNewTodoKeyDown}
              autoFocus={true}
            />
          </header>
          {main}
          {footer}
        </div>
      );
    }

  });

  var model = new app.TodoModel('react-mytodo');
  function render () {
    React.render(
      <TodoApp model={model} />,
      document.getElementsByClassName('todoapp')[0]
    );
  }


  model.subscribe(render);
  render();

})();
