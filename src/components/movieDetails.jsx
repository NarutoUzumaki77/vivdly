import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Select from "react-select";
import { getMovie } from "../services/fakeMovieService";
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
    // call server
    console.log("Submitted");
  };

  handleSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title")}
        <div className="form-group">
          <label htmlFor="genres">Genre</label>
          <select
            className="form-control"
            id="genres"
            value={this.state.selectedOption}
            onChange={this.handleSelected}
          >
            {this.state.options.map((option) => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
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
