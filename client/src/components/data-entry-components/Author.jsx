import React from "react";

const Author = ({
  primaryNameID,
  firstNameID,
  middleNameID,
  handleChange,
  handleClick = null,
  formErrors,
}) => (
  <div class="form-row">
    <div class="col-md-1">
      <i
        class="far fa-times-circle fa-lg remove remove-inline pt-4 text-danger"
        title="Press to remove author."
        onClick={handleClick}
      ></i>
    </div>
    <div class="form-group col-md-4">
      <label for={primaryNameID}>Last Name</label>
      <input
        type="text"
        class={`form-control ${formErrors.lastName ? "is-invalid" : ""}`}
        id={primaryNameID}
        name={primaryNameID}
        required="true"
        placeholder="required"
        onChange={handleChange}
      />
    </div>
    <div class="form-group col-md-4">
      <label for={firstNameID}>First Name</label>
      <input
        type="text"
        class={`form-control ${formErrors.firstName ? "is-invalid" : ""}`}
        id={firstNameID}
        name={firstNameID}
        required="true"
        placeholder="required"
        onChange={handleChange}
      />
    </div>
    <div class="form-group col-md-3">
      <label for={middleNameID}>Middle Initial</label>
      <input
        type="text"
        class={`form-control ${formErrors.middleInitial ? "is-invalid" : ""}`}
        id={middleNameID}
        name={middleNameID}
        placeholder="optional"
        onChange={handleChange}
      />
    </div>
  </div>
);

export default Author;
