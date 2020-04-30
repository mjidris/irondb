import React from "react";
import Measurement from "./Measurement";

const Meteorite = ({
  meteoriteID,
  bodyNameID,
  groupID,
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
  <>
    <div class="form-row meteorite-header" id={meteoriteID}>
      <h5 class="pt-1 mr-2">
        <strong>Meteorite</strong>
      </h5>
      <i class="fas fa-plus-circle fa-lg add-meteorite mt-2 text-danger"></i>
    </div>
    <div class="form-row">
      <div class="col-md-1">
        <i
          class="far fa-times-circle fa-lg remove remove-meteorite pt-4 text-danger"
          title="Press to remove meteorite and all associated measurements."
        ></i>
      </div>
      <div class="form-group col-md-6">
        <label for={bodyNameID}>Meteorite</label>
        <input
          type="text"
          class="form-control"
          id={bodyNameID}
          name={bodyNameID}
          required
        />
      </div>
      <div class="form-group col-md-4">
        <label for={groupID}>Group</label>
        <input
          type="text"
          class="form-control"
          id={groupID}
          name={groupID}
          required
        />
      </div>
    </div>
    <div class="form-row">
      <h5 class="pt-1 mr-2 pl-3">
        <strong>Measurements</strong>
      </h5>
      <i class="fas fa-plus-circle fa-lg add-measurement mt-2 text-danger"></i>
    </div>
    <Measurement
      elementID={elementID}
      elements={elements}
      lessThanID={lessThanID}
      measurementID={measurementID}
      deviationID={deviationID}
      unitsID={unitsID}
      techniqueID={techniqueID}
      techniques={techniques}
      pageID={pageID}
      sigfigID={sigfigID}
      convertedMeasurementID={convertedMeasurementID}
      convertedDeviationID={convertedDeviationID}
    />
  </>
);

export default Meteorite;
