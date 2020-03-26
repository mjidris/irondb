import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const DataEntryPDF = ({ setAlert }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("/api/data-entry", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if ("Alert" in data) {
          setAlert(data);
        }
        <Redirect
          to={{
            pathname: "/data-entry/tool",
            state: { entryResult: data }
          }}
        />;
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  return (
    <div class="d-flex flex-row align-items-center justify-content-center pt-3">
      <form
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
        class="border border-dark align-top mx-auto bg p-3"
        id="pdf-form"
      >
        <div class="form-group">
          <label for="filetoupload">Choose file to upload</label>
          <input type="file" id="pdf" name="filetoupload" accept=".pdf" />
        </div>
        <button type="submit" class="btn btn-secondary float-right">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataEntryPDF;
