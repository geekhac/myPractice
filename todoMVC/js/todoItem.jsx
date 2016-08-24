var app=app||{};
(function  () {
  'use strict'

  var ENTER_KEY=13;
  var ESCAPE_KEY=27;

  app.TodoItem=React.createClass({
    handleSubmit:function (event) {
      var val=this.state.editText;
      if(val){
        this.props.onSave(val);
        this.setState({
          editText: val
        });
      }else{
        this.props.onDestroy();
      }
    },

    handleEdit:function () {
      this.props.onEdit();
      this.setState({
        editText:this.props.todo.title
      });
    },

    handleChange:function (event) {
      this.setState({
        editText: event.target.value.trim(),
      });
    },

    getInitialState: function() {
      return {
        editText:this.props.todo.title
      };
    },

    handleKeyDown:function (event) {
      if(event.which===ESCAPE_KEY){
        this.setState({
          editText: this.props.todo.title,
        });
        this.props.onCancel();
      }else if(event.which===ENTER_KEY){
        this.handleSubmit(event);
      }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      return (
        nextProps.todo !== this.props.todo ||
        nextProps.editing !== this.props.editing ||
        nextState.editText !== this.state.editText
      );
    },

    componentDidUpdate: function(prevProps, prevState) {
      if(!prevProps.editing && this.props.editing){
        var node=React.findDOMNode(this.refs.editField);
        node.focus();
        node.setSelectionRange(node.value.length, node.value.length);
      }
    },

    render: function() {
      return (
          <li className={classNames({
          completed: this.props.todo.completed,
          editing:this.props.editing
        })}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={this.props.todo.completed}
              onChange={this.props.onToggle}
            />
            <label onDoubleClick={this.handleEdit}>
              {this.props.todo.title}
            </label>
            <button className="destroy" onClick={this.props.onDestroy}/>
          </div>
          <input
            ref="editField"
            className="edit"
            value={this.state.editText}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleSubmit}
          />
        </li>
      );
    }
  });
})();