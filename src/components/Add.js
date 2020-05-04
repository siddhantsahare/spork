import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    height: "50vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    width: "100%",
    height: "50px",
    margin: "15px 0px ",
    borderRadius: "5px",
    border: "1px solid black",
    fontSize: "15px",
    fontWeight: "600",
    padding: "0px 20px",
  },
  errorText: {
    color: "red",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};
export class Add extends Component {
  state = initialState;

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.name.length < 5) {
      nameError = "Name cannot be less that 5 characters";
    }

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid email";
    }

    if (emailError || nameError) {
      this.setState({ emailError, nameError });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      alert("success");
      // clear form
      this.setState(initialState);
    } else {
      console.log("error");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <div>
                <input
                  className={classes.input}
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div className={classes.errorText}>{this.state.nameError}</div>
              </div>
              <div>
                <input
                  className={classes.input}
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div className={classes.errorText}>{this.state.emailError}</div>
              </div>
              <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                Add
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Add);
