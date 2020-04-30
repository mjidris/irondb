import React from "react";

const Notes = ({ noteID, handleChange, handleClick }) => (
  <div class="form-row mt-2">
    <label for={noteID}>
      Note:
      <i
        class="far fa-times-circle fa-lg remove remove-note pl-5 text-danger"
        title="Press to remove note."
        onClick={handleClick}
      ></i>
    </label>
    <textarea
      class="form-control"
      id={noteID}
      name={noteID}
      rows="5"
      onChange={handleChange}
    ></textarea>
  </div>
);
