import React from "react";

const MovieDetails = (props) => {
  return (
    <div>
      <h2>{props.match.params.id}</h2>
      <p>
        <button type="button" className="btn btn-primary">
          Save
        </button>
      </p>
    </div>
  );
};

export default MovieDetails;
