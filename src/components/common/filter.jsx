import React, { Component } from "react";

class Filter extends Component {
  render() {
    const { genres, currentFilter } = this.props;

    return (
      <ul className="list-group">
        {genres.map((genre) => (
          <li
            key={genre._id}
            className={genre.name === currentFilter ? "list-group-item active" : "list-group-item" }
            style={{ cursor: "pointer" }}
            onClick={() => this.props.onFilter(genre.name)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Filter;
