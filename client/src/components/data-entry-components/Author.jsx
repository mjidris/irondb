import React, { useState } from "react";

const Author = ({ index, handleChange, authorCount, formErrors }) => {
  const [active, setActive] = useState(true);

  const primaryNameID = `primaryName${index}`;
  const firstNameID = `firstName${index}`;
  const middleNameID = `middleName${index}`;
  return (
    active && (
      <div className="form-row">
        <div className="col-md-1">
          {index !== 0 && (
            <i
              className="far fa-times-circle fa-lg remove remove-inline pt-4 text-danger"
              title="Press to remove author."
              onClick={() => {
                if (index != 0) setActive(false);
              }}
            ></i>
          )}
        </div>
        <div className="form-group col-md-4">
          <label htmlFor={primaryNameID}>Last Name</label>
          <input
            type="text"
            className={`form-control ${
              formErrors.lastName ? "is-invalid" : ""
            }`}
            id={primaryNameID}
            name={primaryNameID}
            required="true"
            placeholder="required"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor={firstNameID}>First Name</label>
          <input
            type="text"
            className={`form-control ${
              formErrors.firstName ? "is-invalid" : ""
            }`}
            id={firstNameID}
            name={firstNameID}
            required="true"
            placeholder="required"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-3">
          <label htmlFor={middleNameID}>Middle Initial</label>
          <input
            type="text"
            className={`form-control ${
              formErrors.middleInitial ? "is-invalid" : ""
            }`}
            id={middleNameID}
            name={middleNameID}
            placeholder="optional"
            onChange={handleChange}
          />
        </div>
      </div>
    )
  );
};

export default Author;
