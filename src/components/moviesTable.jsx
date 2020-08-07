import React, { Component } from "react";
import Movie from "./movie";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  render() {
    const columns = [
      { path: "title", label: "Title" },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rental" },
      { path: "x" },
      { path: "z" },
    ];

    const { movies, doDelete, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <tbody>
          {movies.map((movie) => (
            <Movie key={movie._id} movie={movie} onDelete={doDelete} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
