import React, { useState } from "react";

const Form = (props) => {
  const { place, submitFunc = () => {}, history } = props;

  const [formData, setFormData] = useState(place);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunc(formData);
    history.push("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input type="submit" value={props.label} />
      <button
        onClick={() => {
          props.deletePlace(place);
          props.history.push("/edit");
        }}
      >
        Delete
      </button>
    </form>
  );
};

export default Form;
