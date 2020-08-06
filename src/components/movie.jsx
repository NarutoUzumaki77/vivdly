import React, { Component } from "react";
import Like from "./common/like";

class Movie extends Component {
  state = {
    like: this.props.movie.liked,
  };

  toggleLike = () => {
    let { like } = this.state;
    this.setState({
      like: !like,
    });
  };

  render() {
    const { movie, onDelete } = this.props;
    return (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <span onClick={this.toggleLike}>
            <Like liked={this.state.like} />
          </span>
        </td>
        <td>
          <button
            onClick={() => onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
