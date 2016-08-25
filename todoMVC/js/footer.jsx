/*global React, Router, classNames*/
var app = app||{};

(function () {

  app.TodoFooter=React.createClass({

    render: function() {
      var activeTodoWord = app.Utils.pluralize(this.props.count,'item');
      var clearButton=null;
      if(this.props.completedCount){
        clearButton = (
          <button
            className="clear-completed"
            onClick={this.props.clearCompleted}
          >
            Clear completed
          </button>
        );
      }
      return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.props.count}</strong> {activeTodoWord} left
          </span>
          <ul className="filters">
            <li>
              <a
                href="#/"
                 className={classNames({
                  selected:this.props.nowShowing===app.ALL_TODOS
                })}
                >
                  All
              </a>
            </li>
            {' '}
            <li>
              <a
                href="#/active"
                className={classNames({
                  selected:this.props.nowShowing===app.ACTIVE_TODOS
                })}
               >
                  Active
              </a>
            </li>
            {' '}
            <li>
              <a
                href="#/completed"
                 className={classNames({
                  selected:this.props.nowShowing===app.COMPLETED_TODOS
                })}
               >
                  Completed
              </a>
            </li>
          </ul>
          {clearButton}
        </footer>
      );
    }
  });
})();