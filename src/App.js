import React from "react";
import Movies from "./components/movies";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NavBar from "./components/common/navbar";
import MovieDetails from "./components/movieDetails";
import NotFound from "./components/notFound";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <main role="main" className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
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
    </div>
  );
}

export default App;
