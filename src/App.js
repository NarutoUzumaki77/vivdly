import React from "react";
import Movies from "./components/movies";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NavBar from "./components/common/navbar";
import MovieDetails from "./components/movieDetails";
import NotFound from "./components/notFound";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <main role="main" className="container">
      <NavBar />
      <div style={{ padding: "0 0 15px 0" }}></div>
      <Switch>
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/movies" component={Movies} />
        <Route exact path="/">
          <Redirect to="movies" />
        </Route>
        <Route path="/customers" component={Customer} />
        <Route path="/rentals" component={Rental} />
        <Route path="/404-not-found" component={NotFound} />
        <Redirect to="/404-not-found" />
      </Switch>
    </main>
  );
}

export default App;
