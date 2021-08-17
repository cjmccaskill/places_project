import React from "react";

const Display = (props) => {
  const { places } = props;

  const loaded = () => (
    <div>
      {places.map((place) => (
        <article key={place._id}>
          <img src={place.img} alt={place.name} />
          <h2>{place.name}</h2>
          <p>{place.description}</p>
          <button
            onClick={() => {
              props.selectPlace(place);
              props.history.push("/edit");
            }}
          >
            Edit
          </button>
        </article>
      ))}
    </div>
  );

  const loading = <h1>Loading...</h1>;

  return places.length > 0 ? loaded() : loading;
};

export default Display;
