import React from "react";
import Nav from "./components/Nav";
import CoverPicture from "./components/CoverPicture";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import { ContextProvider } from "./components/Context";
import { CssBaseline } from "@material-ui/core";
import Login from "./components/Login";
import Users from "./components/Users";
import Add from "./components/Add";
import View from "./components/View";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ContextProvider>
        <div className="App">
          <Nav />
          <CoverPicture />
          <main>
            <Switch>
              <Route exact path="/users" component={Users} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Main} />
              {/* Internship task */}
              <Route exact path="/add" component={Add} />
              <Route exact path="/view" component={View} />
            </Switch>
          </main>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
