import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Display from "./pages/Display";
import Form from "./pages/Form";

function App(props) {
  const url = "https://places-api-081621.herokuapp.com/places";

  const [places, setPlaces] = useState([]);

  const emptyPlace = {
    img: "",
    name: "",
    description: "",
  };

  const [selectedPlace, setSelectedPlace] = useState(emptyPlace);

  const getPlaces = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPlaces(data);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const createPlace = async (newPlace) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlace),
    });
    getPlaces();
  };

  const updatePlace = async (updatePlace) => {
    await fetch(url + `/${updatePlace._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePlace),
    });
    getPlaces();
  };

  const deletePlace = async (deletePlace) => {
    await fetch(url + `/${deletePlace._id}`, {
      method: "delete",
    });
    getPlaces();
  };

  const selectPlace = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="main-title">My Favorite Places</h1>
        <Link to="/create">
          <button className="fav-btn">Add a Fav</button>
        </Link>
      </div>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display {...rp} places={places} selectPlace={selectPlace} />
            )}
          ></Route>
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="Create"
                place={emptyPlace}
                submitFunc={createPlace}
              />
            )}
          ></Route>
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form
                {...rp}
                label="Update"
                place={selectedPlace}
                submitFunc={updatePlace}
                deletePlace={deletePlace}
              />
            )}
          ></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
