import React, { useState } from "react";

const Measurement = ({
  meteoriteIndex,
  measurementIndex,
  elements,
  techniques,
  handleChange,
  formErrors,
}) => {
  const [active, setActive] = useState(true);

  const elementID = `element${meteoriteIndex}_${measurementIndex}`;
  const lessThanID = `lessThan${meteoriteIndex}_${measurementIndex}`;
  const measurementID = `measurement${meteoriteIndex}_${measurementIndex}`;
  const deviationID = `deviation${meteoriteIndex}_${measurementIndex}`;
  const unitsID = `units${meteoriteIndex}_${measurementIndex}`;
  const techniqueID = `technique${meteoriteIndex}_${measurementIndex}`;
  const pageID = `page${meteoriteIndex}_${measurementIndex}`;
  const sigfigID = `sigfig${meteoriteIndex}_${measurementIndex}`;
  const convertedMeasurementID = `convertedMeasurement${meteoriteIndex}_${measurementIndex}`;
  const convertedDeviationID = `convertedDeviation${meteoriteIndex}_${measurementIndex}`;

  return (
    active && (
      <div className="form-row">
        <div className="col-md-1">
          <i
            className="far fa-times-circle fa-lg remove remove-inline pt-4 text-danger"
            title="Press to remove measurement."
            onClick={() => {
              if (measurementIndex !== 0) setActive(false);
            }}
          ></i>
        </div>
        <div className="form-group col-md-1 mr-3">
          <label htmlFor={elementID}>Element</label>
          <select
            className={`form-control p-1 ${
              formErrors.element ? "is-invalid" : ""
            }`}
            id={elementID}
            name={elementID}
            onChange={handleChange}
            required="true"
          >
            {elements.map((element) => (
              <option defaultValue={element.symbol.toLowerCase()}>
                {element.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="form-check-inline col-md-1">
          <input
            className="form-check-input"
            type="checkbox"
            id={lessThanID}
            name={lessThanID}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={lessThanID}>
            &lt;
          </label>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor={measurementID}>Measurement</label>
          <input
            type="text"
            className={`form-control ${
              formErrors.measurement ? "is-invalid" : ""
            }`}
            id={measurementID}
            name={measurementID}
            onChange={handleChange}
            required="true"
            min="0"
          />
        </div>
        <div className="form-group col-md-1">
          <label htmlFor={deviationID}>(&plusmn;)</label>
          <input
            type="number"
            className={`form-control ${
              formErrors.deviation ? "is-invalid" : ""
            }`}
            id={deviationID}
            name={deviationID}
            onChange={handleChange}
            defaultValue="0"
            min="0"
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor={unitsID}>units</label>
          <select
            className="form-control"
            id={unitsID}
            name={unitsID}
            onChange={handleChange}
            required="true"
          >
            <option defaultValue="wt_percent">wt%</option>
            <option defaultValue="ppm">ppm</option>
            <option defaultValue="ppb">ppb</option>
            <option defaultValue="mg_g">mg/g</option>
            <option defaultValue="ug_g">&micro;g/g</option>
            <option defaultValue="ng_g">ng/g</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor={techniqueID}>Technique</label>
          <select
            className="form-control p-1"
            id={techniqueID}
            name={techniqueID}
            onChange={handleChange}
            required="true"
          >
            {techniques.map((technique) => (
              <option defaultValue={technique.abbreviation}>
                {technique.abbreviation}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-1">
          <label htmlFor={pageID}>Page</label>
          <input
            type="number"
            className={`form-control p-1 ${
              formErrors.page ? "is-invalid" : ""
            }`}
            id={pageID}
            name={pageID}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <input type="hidden" id={sigfigID} name={sigfigID} defaultValue="0" />
          <input
            type="hidden"
            id={convertedMeasurementID}
            name={convertedMeasurementID}
            defaultValue="0"
          />
          <input
            type="hidden"
            id={convertedDeviationID}
            name={convertedDeviationID}
            defaultValue="0"
          />
        </div>
      </div>
    )
  );
};

export default Measurement;
