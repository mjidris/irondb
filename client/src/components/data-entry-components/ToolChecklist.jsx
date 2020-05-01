import React from "react";

const ToolChecklist = ({ numOfPages = 1 }) => {
  return (
    <form
      method="POST"
      action="/data-entry/tool"
      className="border border-dark bg mx-auto p-5 mt-5 mb-5"
      id="checklist-form"
    >
      <h3 className="pb-1 align-items-center">Options</h3>
      <div id="alert-target"></div>
      {numOfPages !== -1 && (
        <>
          <div className="form-group">
            <input
              className="form-check-input"
              type="checkbox"
              name="attributes"
              id="attributes"
            />
            <label className="form-check-label" for="attributes">
              Extract Attributes{" "}
              <small>
                (Paper title, journal name, author(s), and year published)
              </small>
            </label>
          </div>
          <div className="form-group">
            <input
              className="form-check-input"
              type="checkbox"
              name="allTables"
              id="allTables"
            />
            <label className="form-check-label" for="allTables">
              Extract All Tables
            </label>
          </div>
          <div className="form-group">
            <label className="form-check-label" for="singleTable">
              <input
                className="form-check-input"
                type="checkbox"
                name="singleTable"
                id="singleTable"
                data-toggle="collapse"
                data-target="#collapse"
                aria-expanded="false"
                aria-controls="collapse"
              />{" "}
              Extract Tables by Page
            </label>
          </div>
          <div id="collapse" aria-expanded="false" className="collapse">
            <div className="well">
              <small>
                Select page number of the pdf to extract tables from.
              </small>
              {/*This will remain hidden*/}
              <div className="form-group">
                <label for="fileName" className="sr-only">
                  filenam
                </label>
                <input
                  id="fileName-checklist"
                  name="fileName"
                  type="hidden"
                  value=""
                />
              </div>

              {/*This will be a drop down, I'll need some way of grabing the number of pages before rendering this*/}
              {/*currently giving you 1-20*/}
              <div className="form-group pl-3">
                <label for="pageNum">
                  Page Number{" "}
                  <small>
                    <em>
                      <sup>*</sup>required
                    </em>
                  </small>
                </label>
                <select className="form-control" name="pageNum" id="pageNum">
                  {numOfPages.map((page, i) => (
                    <option value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              {/* Some form of directional input, probably just number -360 to 360 */}
              <div className="form-group pl-3">
                <div>
                  {" "}
                  <label for="flipDir">Flip Direction </label>{" "}
                  <i
                    className="fas fa-info-circle"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="If a table on a particular page is presented sideways instead of horizontally, the “Extract all Tables” tool will have a difficult time extracting it. You can fix this by using the tool to rotate the table in degrees (clockwise)."
                  ></i>{" "}
                </div>
                <select
                  className="form-control"
                  style="display: inline-block;"
                  id="flipDir"
                  name="flipDir"
                >
                  <option value="0">0</option>
                  <option value="90">90</option>
                  <option value="180">180</option>
                  <option value="270">270</option>
                </select>
                <small>(Degrees rotating clockwise)</small>
              </div>

              {/* will discuss further when/if we get to it */}
              <h5>
                <strong>Coordinates:</strong>{" "}
                <i
                  className="fas fa-info-circle"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="To find the coordinates using MacOs, you can use the Preview application. Open the PDF in Preview, then scroll to the page of the table you are trying to extract. Under the 'Tools' menu option, select 'Show Inspector'"
                ></i>{" "}
              </h5>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="coordsLeft">Left Coordinate:</label>
                    <input
                      className="pl-2"
                      id="coordsLeft"
                      name="coordsLeft"
                      type="number"
                      value="0"
                    />
                  </div>
                  <div className="form-group">
                    <label for="coordsTop">Top Coordinate:</label>
                    <input
                      className="pl-2"
                      id="coordsTop"
                      name="coordsTop"
                      type="number"
                      value="0"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label for="coordsWidth">Width Coordinate:</label>
                    <input
                      className="pl-2"
                      id="coordsWidth"
                      name="coordsWidth"
                      type="number"
                      value="0"
                    />
                  </div>
                  <div className="form-group">
                    <label for="coordsHeight">Height Coordinate:</label>
                    <input
                      className="pl-2"
                      id="coordsHeight"
                      name="coordsHeight"
                      type="number"
                      value="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}{" "}
      else{" "}
      {
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Error: </strong>
          The pdf you uploaded is unable to be processed. Please continue
          manually or try uploading another pdf.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      }
      <hr className="text-danger mt-1" />
      <div className="form-group">
        <input
          className="form-check-input"
          type="checkbox"
          name="manual"
          id="manual"
          checked={numOfPages === -1 ? "true" : "false"}
        />
        <label className="form-check-label" for="manual">
          No Automatic Data Extraction
        </label>
      </div>
      <button type="submit" className="btn btn-secondary float-right">
        Submit
      </button>
    </form>
  );
};

export default ToolChecklist;
