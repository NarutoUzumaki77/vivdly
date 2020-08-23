import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
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
    };
  }

  componentDidMount() {
    const movie_id = this.props.match.params.id;
    const movie_details = getMovie(movie_id);

    const genres = getGenres();
    const options = genres.map((genre) => {
      return genre;
    });

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
    rate: Joi.number().required().label("Rate"),
  };

  doSubmit = () => {
    const { data, options, selectedOption } = this.state;
    const genre = options.find((g) => g.name === selectedOption);

    const movie_id = this.props.match.params.id;
    const movie = {
      _id: movie_id,
      title: data.title,
      genreId: genre._id,
      numberInStock: data.numberstock,
      dailyRentalRate: data.rate,
    };

    saveMovie(movie);
  };

  render() {
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
          Register
        </button>
      </form>
    );
  }
}

export default MovieDetails;
