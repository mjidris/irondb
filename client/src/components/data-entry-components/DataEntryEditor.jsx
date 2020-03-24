import React, { useState, useEffect } from "react";
import DataEntryForm from "./DataEntryForm";

const DataEntryEditor = ({ meteoriteData }) => {
  const handleSubmission = async event => {
    event.preventDefault();
    const data = new FormData(event.target);

    const response = await fetch("/api/data-entry/insert", {
      method: "POST",
      data: data
    });
    const responseData = await response.json();

    console.log(responseData);
  };

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
              <form
                method="POST"
                action="/data-entry/insert"
                class="align-top mx-auto text-left"
                id="insert-form"
              >
                <DataEntryForm
                  elements={meteoriteData.elements}
                  techniques={meteoriteData.techniques}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntryEditor;
