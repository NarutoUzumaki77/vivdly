import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieDetails extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        genre: "",
        numberstock: "",
        rate: "",
      },
      errors: {},
      options: [],
      selectedOption: "",
      create_movie: false,
      redirect: false,
    };
  }

  componentDidMount() {
    const movie_id = this.props.match.params.id;

    const genres = getGenres();
    const options = genres.map((genre) => {
      return genre;
    });

    // Create new Movie record
    if (movie_id === "new") {
      this.setState({
        data: {
          title: "",
          numberstock: "",
          rate: "",
          genre: options[0].name,
        },
        options,
        selectedOption: options[0].name,
        create_movie: true,
      });
      return;
    }

    // Movie does not exist
    const movie_details = getMovie(movie_id);
    if (!movie_details) {
      this.props.history.replace("/404-not-found");
      this.setState({
        redirect: true,
      });
      return;
    }

    // Existing Movie In DB
    const { title, dailyRentalRate, genre, numberInStock } = movie_details;
    this.setState({
      data: {
        title: title,
        numberstock: numberInStock,
        rate: dailyRentalRate,
        genre: genre.name,
      },
      options,
      selectedOption: genre.name,
    });
  }

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberstock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Number in Stock"),
    rate: Joi.number().max(5).required().label("Rate"),
  };

  doSubmit = () => {
    const { data, options, selectedOption } = this.state;
    let genre = options.find((g) => g.name === selectedOption);

    const movie_id = this.props.match.params.id;
    const movie = {
      _id: movie_id,
      title: data.title,
      genreId: genre._id,
      numberInStock: data.numberstock,
      dailyRentalRate: data.rate,
    };

    saveMovie(movie);

    // Redirect to /movies
    this.props.history.push("/movies")
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/404-not-found" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genre", "Genre")}
        {this.renderInput("numberstock", "Number in Stock")}
        {this.renderInput("rate", "Rate")}
        <button
          disabled={this.validate()}
          type="Save"
          className="btn btn-primary"
        >
          {this.state.create_movie ? "Save" : "Modify"}
        </button>
      </form>
    );
  }
}

export default MovieDetails;
