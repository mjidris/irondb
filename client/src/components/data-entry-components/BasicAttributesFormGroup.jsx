import React, { useState } from "react";
import Author from "./Author";

//Component of basic attribute form elements for editor
const BasicAttributesFormGroup = ({ handleChange, formErrors }) => {
  const [authorCount, setAuthorCount] = useState(0);
  let authors = [];

  const addAuthor = () => setAuthorCount((prevCount) => prevCount + 1);

  for (let i = 0; i <= authorCount; i++) {
    authors.push(
      <Author
        index={i}
        handleChange={handleChange}
        authorCount={authorCount}
        formErrors={formErrors}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="main-alert-target"></div>
      <h5 className="pt-1 pr-1 mr-2">
        <strong>Basic Information</strong>
      </h5>
      <div className="form-row">
        <div className="form-group col-md-8">
          <label htmlFor="paperTitle">Paper Title</label>
          <input
            type="text"
            className={`form-control ${
              formErrors.paperTitle ? "is-invalid" : ""
            }`}
            id="paperTitle"
            name="paperTitle"
            required="true"
            placeholder="required"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="doi">DOI</label>
          <input
            type="text"
            className={`form-control ${formErrors.doi ? "is-invalid" : ""}`}
            id="doi"
            name="doi"
            placeholder="optional"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-7">
          <label htmlFor="journalName">Journal Name</label>
          <input
            type="text"
            className={`form-control ${
              formErrors.journalName ? "is-invalid" : ""
            }`}
            id="journalName"
            name="journalName"
            required="true"
            placeholder="required"
            onChange={handleChange}
          />
        </div>
        <div className="form-group offset-md-1 col-md-4">
          <label htmlFor="pub_year">Year Published</label>
          <input
            type="number"
            className={`form-control ${
              formErrors.yearPublished ? "is-invalid" : ""
            }`}
            id="pubYear"
            name="pubYear"
            required="true"
            min="1900"
            Max="2100"
            step="1"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-3">
          <label htmlFor="volume">Volume</label>
          <input
            type="text"
            className={`form-control ${formErrors.volume ? "is-invalid" : ""}`}
            id="volume"
            name="volume"
            required="true"
            placeholder="required"
            onChange={handleChange}
          />
        </div>
        <div className="form-group offset-md-1 col-md-3">
          <label htmlFor="issue">Issue</label>
          <input
            type="text"
            className={`form-control ${formErrors.issue ? "is-invalid" : ""}`}
            id="issue"
            name="issue"
            placeholder="optional"
            onChange={handleChange}
          />
        </div>
        <div className="form-group offset-md-1 col-md-3">
          <label htmlFor="series">ISSN</label>
          <input
            type="text"
            className={`form-control ${formErrors.issn ? "is-invalid" : ""}`}
            id="series"
            name="series"
            placeholder="optional"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row author-header">
        <h6 className="pt-1 mr-2">Author(s)</h6>
        <i
          className="fas fa-plus-circle fa-lg add-author mt-2 text-danger"
          onClick={addAuthor}
        ></i>
      </div>

      {authors}

      <div className="authors-end"></div>
    </React.Fragment>
  );
};

export default BasicAttributesFormGroup;
