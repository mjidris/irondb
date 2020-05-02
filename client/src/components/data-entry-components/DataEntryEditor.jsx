import React, { useState, useEffect } from "react";
import DataEntryForm from "./DataEntryForm";
import { Redirect } from "react-router-dom";

const DataEntryEditor = ({ meteoriteData, setAlert }) => {
  const [redirect, setRedirect] = useState();
  const [responseData, setResponseData] = useState();

  const handleSubmission = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("/api/data-entry/insert", {
      method: "POST",
      data: formData,
    });
    const responseDataPromise = await response.json();
    setResponseData(responseDataPromise);
    setRedirect(true);
    console.log(responseData);
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          path: "/panel",
          state: { inputData: responseData },
        }}
      />
    );
  } else {
    return (
      <div className="container-fluid pt-1 pb-4" id="event-div">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <div className="card text-center border-dark">
            <div className="card-header bg-danger">
              <h3 className="card-title text-warning">Editor</h3>
            </div>

            <div className="card-body tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="insert"
                role="tabpanel"
                aria-labelledby="insert-tab"
              >
                <DataEntryForm
                  elements={meteoriteData.elements}
                  techniques={meteoriteData.techniques}
                  setAlert={setAlert}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DataEntryEditor;
