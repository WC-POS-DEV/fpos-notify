import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import IngredientList from "./views/IngredientList";
import Notifications from "./views/Notifications";
import Sales from "./views/Sales";

function App() {
  return (
    <Router>
      <div className="flex items-start h-screen overflow-y-hidden bg-gray-700 text-white">
        <Navbar />
        <Switch>
          <Route exact path="/">
            Home Page
          </Route>
          <Route exact path="/sales">
            <Sales />
          </Route>
          <Route exact path="/inventory">
            <IngredientList />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
