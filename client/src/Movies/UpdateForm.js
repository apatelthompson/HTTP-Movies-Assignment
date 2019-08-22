import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = props => {
  console.log(props);

  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const id = props.match.params.id;
    const movieInArr = props.savedList.find(movie => `${movie.id}` === id);
    if (movieInArr) setMovie(movieInArr);
  }, [props.savedList, props.match.params.id]);

  const changeHandler = event => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === "id") {
    }

    setMovie({
      ...movie,
      [event.target.name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(initialMovie);
        props.addToSavedList(res.data);
        props.history.push("/movies");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Moive</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />
        <input
          type="text"
          name="Stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateForm;
