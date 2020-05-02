import React, { useState } from "react";
import Measurement from "./Measurement";

const Meteorite = ({
  index,
  formErrors,
  elements,
  techniques,
  addMeteorite,
  handleChange,
}) => {
  const [active, setActive] = useState(true);
  const [measurementCount, setMeasurementCount] = useState(0);
  let measurements = [];

  for (let i = 0; i <= measurementCount; i++) {
    measurements.push(
      <Measurement
        meteoriteIndex={index}
        measurementIndex={i}
        elements={elements}
        techniques={techniques}
        handleChange={handleChange}
        formErrors={formErrors}
      />
    );
  }

  const addMeasurement = () =>
    setMeasurementCount((prevCount) => prevCount + 1);

  const meteoriteID = `meteorite${index}`;
  const bodyNameID = `bodyName${index}`;
  const groupID = `group${index}`;

  return (
    active && (
      <>
        <div class="form-row meteorite-header" id={meteoriteID}>
          <h5 class="pt-1 mr-2">
            <strong>Meteorite</strong>
          </h5>
          <i
            class="fas fa-plus-circle fa-lg add-meteorite mt-2 text-danger"
            onClick={addMeteorite}
          ></i>
        </div>
        <div class="form-row">
          <div class="col-md-1">
            <i
              class="far fa-times-circle fa-lg remove remove-meteorite pt-4 text-danger"
              title="Press to remove meteorite and all associated measurements."
              onClick={() => {
                if (index !== 0) setActive(false);
              }}
            ></i>
          </div>
          <div class="form-group col-md-6">
            <label htmlFor={bodyNameID}>Meteorite</label>
            <input
              type="text"
              class={`form-control ${formErrors.meteorite ? "is-invalid" : ""}`}
              id={bodyNameID}
              name={bodyNameID}
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group col-md-4">
            <label htmlFor={groupID}>Group</label>
            <input
              type="text"
              class={`form-control ${formErrors.group ? "is-invalid" : ""}`}
              id={groupID}
              name={groupID}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div class="form-row">
          <h5 class="pt-1 mr-2 pl-3">
            <strong>Measurements</strong>
          </h5>
          <i
            class="fas fa-plus-circle fa-lg add-measurement mt-2 text-danger"
            onClick={addMeasurement}
          ></i>
        </div>
        {measurements}
      </>
    )
  );
};

export default Meteorite;
