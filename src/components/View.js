import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { TableHead } from "@material-ui/core";

const useStyles = {
  todo: {
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "600",
  },
  paper: {
    padding: "10px 20px",
  },
};

export class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      apiUrl: "https://jsonplaceholder.typicode.com/todos/",
    };
  }

  componentDidMount() {
    fetch(`${this.state.apiUrl}`)
      .then((response) => response.json())
      .then((data) => this.setState({ todos: data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="todoList">
        <TableContainer component={Paper} className={classes.paper}>
          <Table aria-label="simple table" className={classes.todo}>
            <TableHead>
              <TableCell>
                <h1>Todos</h1>
              </TableCell>
              <TableCell></TableCell>
            </TableHead>
            <TableBody>
              {this.state.todos.map((todo) => {
                return (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>
                      {todo.completed && <span>Completed</span>}
                      {!todo.completed && <span>Pending</span>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(useStyles)(View);
