import React, { Component } from "react";

export class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: Math.random(),
        id: Math.random(),
        title: this.state.task,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => this.setState({ task: json }))
      .then(this.props.createTodo({ ...this.state }));
    this.setState({ task: "" });
  };
  render() {
    return (
      <form className="NewTodoForm" onSubmit={this.handleSubmit}>
        <label htmlFor="task">New Todo</label>
        <input
          type="text"
          placeholder="New Todo"
          id="task"
          name="task"
          value={this.state.task}
          onChange={this.handleChange}
        />
        <button>Add Todo</button>
      </form>
    );
  }
}

export default NewTodo;
