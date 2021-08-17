import React from "react";

const Display = (props) => {
  const { places } = props;

  const loaded = () => (
    <div>
      {places.map((place) => (
        <article key={place._id}>
          <img src={place.img} alt={place.name} />
          <div className="info">
            <h2>{place.name}</h2>
            <p>{place.description}</p>
            <button
            className="edit-btn"
              onClick={() => {
                props.selectPlace(place);
                props.history.push("/edit");
              }}
            >
              Edit
            </button>
          </div>
        </article>
      ))}
    </div>
  );

  const loading = <h1>Loading...</h1>;

  return places.length > 0 ? loaded() : loading;
};

export default Display;
