import React from "react";

const Measurement = ({
  elementID,
  elements,
  lessThanID,
  measurementID,
  deviationID,
  unitsID,
  techniqueID,
  techniques,
  pageID,
  sigfigID,
  convertedMeasurementID,
  convertedDeviationID,
  formErrors,
}) => (
  <div class="form-row">
    <div class="col-md-1">
      <i
        class="far fa-times-circle fa-lg remove remove-inline pt-4 text-danger"
        title="Press to remove measurement."
      ></i>
    </div>
    <div class="form-group col-md-1 mr-3">
      <label for={elementID}>Element</label>
      <select
        class="form-control p-1"
        id={elementID}
        name={elementID}
        required="true"
      >
        {elements.map((element) => {
          <option value={element.toLowerCase()}>{element}</option>;
        })}
      </select>
    </div>
    <div class="form-check-inline col-md-1">
      <input
        class="form-check-input"
        type="checkbox"
        id={lessThanID}
        name={lessThanID}
      />
      <label class="form-check-label" for={lessThanID}>
        &lt;
      </label>
    </div>
    <div class="form-group col-md-2">
      <label for={measurementID}>Measurement</label>
      <input
        type="text"
        class="form-control"
        id={measurementID}
        name={measurementID}
        required="true"
        min="0"
      />
    </div>
    <div class="form-group col-md-1">
      <label for={deviationID}>(&plusmn;)</label>
      <input
        type="number"
        class="form-control"
        id={deviationID}
        name={deviationID}
        value="0"
        min="0"
      />
    </div>
    <div class="form-group col-md-2">
      <label for={unitsID}>units</label>
      <select class="form-control" id={unitsID} name={unitsID} required="true">
        <option value="wt_percent">wt%</option>
        <option value="ppm">ppm</option>
        <option value="ppb">ppb</option>
        <option value="mg_g">mg/g</option>
        <option value="ug_g">&micro;g/g</option>
        <option value="ng_g">ng/g</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for={techniqueID}>Technique</label>
      <select
        class="form-control p-1"
        id={techniqueID}
        name={techniqueID}
        required="true"
      >
        {techniques.map((technique) => {
          <option value={technique}>{technique}</option>;
        })}
      </select>
    </div>
    <div class="form-group col-md-1">
      <label for={pageID}>Page</label>
      <input
        type="number"
        class="form-control p-1"
        id={pageID}
        name={pageID}
        min="1"
        required
      />
    </div>
    <div class="form-group">
      <input type="hidden" id={sigfigID} name={sigfigID} value="0" />
      <input
        type="hidden"
        id={convertedMeasurementID}
        name={convertedMeasurementID}
        value="0"
      />
      <input
        type="hidden"
        id={convertedDeviationID}
        name={convertedDeviationID}
        value="0"
      />
    </div>
  </div>
);

export default Measurement;
