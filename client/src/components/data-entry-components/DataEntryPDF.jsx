import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const DataEntryPDF = ({ setAlert }) => {
  const [responseData, setResponseData] = useState();
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const jsonResponse = await fetch("/api/data-entry", {
        method: "POST",
        body: formData
      });
      const parsedResponse = await jsonResponse.json();
      setResponseData(parsedResponse);
      if ("Alert" in parsedResponse) {
        setAlert([parsedResponse["Alert"], parsedResponse["AlertType"]]);
      } else {
        setRedirect(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/data-entry/tool",
          state: { entryResult: responseData }
        }}
      />
    );
  } else {
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
  }
};

export default DataEntryPDF;
