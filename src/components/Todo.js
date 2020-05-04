import React, { Component } from "react";

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
    };
  }

  render() {
    return (
      <div>
        <li className="Todo-task">{this.props.task}</li>
      </div>
    );
  }
}

export default Todo;
