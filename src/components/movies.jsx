import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";
import Filter from "./common/filter";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      currentFilter: "All Genre",
    };
  }

  componentDidMount() {
    const genres = [{ name: "All Genre", _id: "0000"}, ...getGenres()]

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

  render() {
    const { currentFilter, genres } = this.state;

    const filtered_movies = this.doFilter(currentFilter);

    const movies = paginate(
      filtered_movies,
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
          <h5>Showing {filtered_movies.length} movies from the Database</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <Movie
                    key={movie._id}
                    movie={movie}
                    onDelete={this.handleDelete}
                  />
                ))}
              </tbody>
            </table>
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
