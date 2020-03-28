import React from "react";
import ToolChecklist from "./ToolChecklist";

const DataEntryTool = ({ data, elements, technique, numPages }) => (
  <>
    <div className="container-fluid pt-3" id="top-container">
      <div className="d-flex flex-row align-items-center justify-content-center mt-2">
        <h1>Automatic Data Entry</h1>
      </div>
    </div>
    <div className="container-fluid pt-1 pb-1">
      <div className="row">
        <div className="col-sm-12 col-md-6 pl-1 mb-3 mt-5">
          <div className="sticky-top" id="pdf-panel"></div>
        </div>

        <div className="col-sm-11 col-md-6" id="event-div">
          <div id="secondary-panel">
            <ToolChecklist />
          </div>
        </div>

        <div className="col-sm-11 col-md-6  mt-5" id="table-div" hidden="true">
          <div className="container-fluid pt-1 pb-1 px-0">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <div className="card border-dark">
                <div className="card-header bg-danger">
                  <h3 className="card-title text-center text-warning">
                    Single Page Table(s) Getter
                  </h3>
                </div>

                <div className="card-body tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="table-tab"
                    role="tabpanel"
                    aria-labelledby="table-tab"
                  >
                    <form
                      method="POST"
                      action="/data-entry/tool/tables"
                      className=" align-top"
                      id="single-page-form"
                    >
                      <small>
                        Select page number of the pdf to extract tables from.
                      </small>
                      {/* This will remain hidden */}
                      <div className="form-group">
                        <label for="fileName" className="sr-only">
                          filename
                        </label>
                        <input
                          id="fileName"
                          name="fileName"
                          type="hidden"
                          value=""
                        />
                      </div>

                      {/* This will be a drop down, I'll need some way of grabing the number of pages before rendering this */}
                      {/* currently giving you 1-20 */}
                      <div className="form-group">
                        <h5>
                          <strong>
                            <label for="pageNum">
                              Page Number{" "}
                              <small>
                                <em>
                                  <sup>*</sup>required
                                </em>
                              </small>
                            </label>
                          </strong>
                        </h5>
                        <select
                          className="form-control"
                          name="pageNum"
                          id="pageNum"
                        >
                          {numPages.map(pageNum => (
                            <option value={pageNum + 1}>{pageNum + 1}</option>
                          ))}
                        </select>
                      </div>
                      {/* Some form of directional input, probably just number -360 to 360 */}
                      <div className="form-group">
                        <h5>
                          <strong>
                            <label for="flipDir">
                              Flip Direction{" "}
                              <small>(Degrees rotating clockwise)</small>
                            </label>
                          </strong>
                        </h5>
                        <select
                          className="form-control"
                          id="flipDir"
                          name="flipDir"
                        >
                          <option value="0">0</option>
                          <option value="90">90</option>
                          <option value="180">180</option>
                          <option value="270">270</option>
                        </select>
                      </div>

                      {/* will discuss further when/if we get to it */}
                      <h5>
                        <strong>Coordinates:</strong>
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

                      <button
                        type="submit"
                        className="btn btn-danger float-right mt-2 ml-2 pr-4 pl-4"
                        id="get-btn"
                      >
                        Get
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary float-right mt-2"
                        id="cancel-btn"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div hidden="true" id="filepath" value={data}>
      {data}
    </div>
  </>
);

export default DataEntryTool;
