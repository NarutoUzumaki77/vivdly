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
      search: "",
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

  handleChange = (e) => {
    this.setState({ search: e.target.value });
    if (e.target.value.length === 1) {
      this.handleFilter("All Genre");
    }
  };

  searchMovies = (arr, query) => {
    return arr.filter(
      (el) => el.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };

  render() {
    const { currentFilter, genres, sortColumn, search } = this.state;

    let filtered_movies = this.doFilter(currentFilter);

    if (search) {
      filtered_movies = this.searchMovies(this.state.movies, search);
    }

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
            <Link
              type="button"
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: "15px" }}
            >
              New Movie
            </Link>
            <h5>Showing {filtered_movies.length} movies from the Database</h5>
            <input
              type="text"
              className="form-control"
              id="search"
              name="search"
              placeholder="Search..."
              onChange={this.handleChange}
              value={this.state.search}
              style={{ marginBottom: "2px" }}
            ></input>
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
