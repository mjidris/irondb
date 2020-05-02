import React, { useState } from "react";

const Notes = ({ noteID, handleChange }) => {
  const [active, setActive] = useState(true);

  return (
    active && (
      <div className="form-row mt-2">
        <label htmlFor={noteID}>
          Note:
          <i
            className="far fa-times-circle fa-lg remove remove-note pl-5 text-danger"
            title="Press to remove note."
            onClick={() => setActive(false)}
          ></i>
        </label>
        <textarea
          className="form-control"
          id={noteID}
          name={noteID}
          rows="5"
          onChange={handleChange}
        ></textarea>
      </div>
    )
  );
};

export default Notes;
