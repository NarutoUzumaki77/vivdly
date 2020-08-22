import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Filter from "./common/filter";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      currentFilter: "All Genre",
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ name: "All Genre", _id: "0000" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres: genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies: movies,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilter = (value) => {
    this.setState({
      currentFilter: value,
      currentPage: 1,
    });
  };

  doFilter(currentFilter) {
    let filtered_movies = this.state.movies;
    if (currentFilter !== "All Genre") {
      filtered_movies = this.state.movies.filter(
        (m) => m.genre.name === currentFilter
      );
    }
    return filtered_movies;
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { currentFilter, genres, sortColumn } = this.state;

    const filtered_movies = this.doFilter(currentFilter);

    const sorted = _.orderBy(
      filtered_movies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Filter
              genres={genres}
              onFilter={this.handleFilter}
              currentFilter={currentFilter}
            />
          </div>
          <div className="col-10">
            <Link type="button" className="btn btn-primary" to="/movies" style={{marginBottom: "15px"}}>
              New Movie
            </Link>
            <h5>Showing {filtered_movies.length} movies from the Database</h5>
            <MoviesTable
              movies={movies}
              doDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={filtered_movies.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
