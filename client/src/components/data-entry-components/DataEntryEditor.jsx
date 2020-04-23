import React, { useState, useEffect } from "react";
import DataEntryForm from "./DataEntryForm";
import { Redirect } from "react-router-dom";

const DataEntryEditor = ({ meteoriteData }) => {
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
      <div class="container-fluid pt-1 pb-4" id="event-div">
        <div class="d-flex flex-row align-items-center justify-content-center">
          <div class="card text-center border-dark">
            <div class="card-header bg-danger">
              <h3 class="card-title text-warning">Editor</h3>
            </div>

            <div class="card-body tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="insert"
                role="tabpanel"
                aria-labelledby="insert-tab"
              >
                <DataEntryForm
                  elements={meteoriteData.elements}
                  techniques={meteoriteData.techniques}
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
