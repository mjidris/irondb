import React, { useState } from "react";
import BasicAttributesFormGroup from "./BasicAttributesFormGroup";
import MeteoriteFormGroup from "./MeteoriteFormGroup";
import NotesFormGroup from "./NotesFormGroup";

const alphabeticalRegex = /^[a-zA-Z ]*$/;
const doiRegex = /10.[0-9]{4}/;
const publicationYearRegex = /[1-3][0-9]{3}$/;
const seriesRegex = /[0-9]{4}-[0-9]{3}[0-9xX]/;
const decimalRegex = /\d+(\.\d+)?$/;

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

const DataEntryForm = ({ elements, techniques }) => {
  // Basic attributes group
  const [paperTitle, setPaperTitle] = useState();
  const [doi, setDoi] = useState();
  const [journalName, setJournalName] = useState();
  const [yearPublished, setYearPublished] = useState();
  const [volume, setVolume] = useState();
  const [issue, setIssue] = useState();
  const [issn, setIssn] = useState();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [middleInitial, setMiddleInitial] = useState();

  // Meteorite form group
  const [meteorite, setMeteorite] = useState();
  const [group, setGroup] = useState();
  const [element, setElement] = useState("H");
  const [measurement, setMeasurement] = useState();
  const [lessThan, setLessThan] = useState(false);
  const [deviation, setDeviation] = useState("0");
  const [units, setUnits] = useState("wt%");
  const [technique, setTechnique] = useState("INAA");
  const [page, setPage] = useState();

  // Notes group
  const [notes, setNotes] = useState();

  // Error states
  const [formErrors, setFormErrors] = useState({
    paperTitle: "",
    doi: "",
    journalName: "",
    yearPublished: "",
    volume: "",
    issue: "",
    issn: "",
    lastName: "",
    firstName: "",
    middleInitial: "",
    meteorite: "",
    group: "",
    element: "",
    measurement: "",
    lessThan: "",
    deviation: "",
    units: "",
    technique: "",
    page: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(formErrors)) {
      console.log("Submitting");
    } else {
      console.log("Validation errors occurred");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "paperTitle":
        formErrors.paperTitle = !alphabeticalRegex.test(value)
          ? "The paper title must consist of alphabetical characters"
          : "";
        break;
      case "doi":
        formErrors.doi = !(
          (doiRegex.test(value) && value.includes("/")) ||
          value === ""
        )
          ? "The DOI must be in proper Digital Object Identifier format (https://bowvalleycollege.libguides.com/apa-style/article-doi)"
          : "";
        break;
      case "journalName":
        formErrors.journalName = !alphabeticalRegex.test(value)
          ? "The journal name must consist of alphabetical characters only"
          : "";
        break;
      case "pubYear":
        formErrors.yearPublished = !publicationYearRegex.test(value)
          ? "Choose a valid publication year"
          : "";
        break;
      case "volume":
        formErrors.volume = !Number.isInteger(value)
          ? "The volume must be an integer"
          : "";
    }
  };

  return (
    <React.Fragment>
      <BasicAttributesFormGroup
        setPaperTitle={setPaperTitle}
        setDoi={setDoi}
        setJournalName={setJournalName}
        setYearPublished={setYearPublished}
        setVolume={setVolume}
        setIssue={setIssue}
        setIssn={setIssn}
        setLastName={setLastName}
        setFirstName={setFirstName}
        setMiddleInitial={setMiddleInitial}
      />
      <MeteoriteFormGroup
        elements={elements}
        techniques={techniques}
        setMeteorite={setMeteorite}
        setGroup={setGroup}
        setElement={setElement}
        setMeasurement={setMeasurement}
        setLessThan={setLessThan}
        setDeviation={setDeviation}
        setUnits={setUnits}
        setTechnique={setTechnique}
        setPage={setPage}
      />
      <NotesFormGroup setNotes={setNotes} />
      <button
        type="submit"
        className="btn btn-warning mt-2 float-right"
        title="Validate or override to enable"
        id="submit-btn"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        type="button"
        className="btn btn-danger mt-2 mr-3 float-right"
        id="validate-btn"
        onClick={validateForm}
      >
        Validate
      </button>
      <button
        type="button"
        className="btn btn-danger mt-2 mr-3 float-right"
        id="override-btn"
      >
        Override Validation
      </button>
      <button
        type="button"
        className="btn btn-secondary mt-2 mr-2 float-left"
        id="save-btn"
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default DataEntryForm;
