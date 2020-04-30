import React, { useState } from "react";
import BasicAttributesFormGroup from "./BasicAttributesFormGroup";
import MeteoriteFormGroup from "./MeteoriteFormGroup";
import NotesFormGroup from "./NotesFormGroup";

const alphabeticalRegex = /^[a-zA-Z ]*$/;
const doiRegex = /10.[0-9]{4}/;
const publicationYearRegex = /[1-3][0-9]{3}$/;
const issnRegex = /[0-9]{4}-[0-9]{3}[0-9xX]/;
const decimalRegex = /\d+(\.\d+)?$/;

const validateForm = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

const validateIssn = (issn) => {
  if (!issn.length === 0) return true;

  if (issnRegex.test(issn) === true) {
    const sevenDigits = issn.replace("-", "");
    let index = 8;
    let weightedSum = 0;
    for (let i = 0; i < sevenDigits; i++) {
      if (sevenDigits[i].toUpperCase() === "X") {
        weightedSum += 10 * index;
      } else {
        weightedSum += parseInt(sevenDigits[i]) * index;
      }

      index--;
    }

    if (weightedSum % 11 === 0) {
      return true;
    } else {
      return false;
    }
  }

  return false;
};

const DataEntryForm = ({ elements, techniques, setAlert }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    switch (name) {
      case "paperTitle":
        setPaperTitle(value);
        errorMessage = !alphabeticalRegex.test(value)
          ? "The paper title must consist of alphabetical characters"
          : "";
        setFormErrors((prevState) => {
          if (errorMessage.length > 0) {
            setAlert([formErrors.paperTitle, "error"]);
          }
          return { ...prevState, paperTitle: errorMessage };
        });

        break;
      case "doi":
        setDoi(value);
        errorMessage = !(
          doiRegex.test(value) &&
          value.includes("/") &&
          value !== ""
        )
          ? "The DOI must be in proper Digital Object Identifier format (https://bowvalleycollege.libguides.com/apa-style/article-doi)"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, doi: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.doi, "error"]);
        }
        break;
      case "journalName":
        setJournalName(value);
        errorMessage = !alphabeticalRegex.test(value)
          ? "The journal name must consist of alphabetical characters only"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, journalName: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.journalName, "error"]);
        }
        break;
      case "pubYear":
        setYearPublished(value);
        errorMessage = !publicationYearRegex.test(value)
          ? "Choose a valid publication year"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, yearPublished: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.yearPublished, "error"]);
        }
        break;
      case "volume":
        setVolume(value);
        errorMessage = !Number.isInteger(value)
          ? "The volume must be an integer"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, volume: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.volume, "error"]);
        }
        break;
      case "issue":
        setIssue(value);
        errorMessage =
          !Number.isInteger(value) && value !== ""
            ? "The issue must be an integer"
            : "";
        setFormErrors((prevState) => {
          return { ...prevState, issue: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.issue, "error"]);
        }
        break;
      case "series":
        setIssn(value);
        errorMessage = !validateIssn(value)
          ? "Enter a valid ISSN (https://en.wikipedia.org/wiki/International_Standard_Serial_Number)"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, issn: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.issn, "error"]);
        }
        break;
      case "firstName0":
        setFirstName(value);
        errorMessage = !alphabeticalRegex(value)
          ? "The first name must consist of alphabetical characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, firstName: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.firstName, "error"]);
        }
        break;
      case "primaryName0":
        setLastName(value);
        errorMessage = !alphabeticalRegex(value)
          ? "The last name must consist of alphabetical characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, lastName: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.lastName, "error"]);
        }
        break;
      case "middleName0":
        setMiddleInitial(value);
        errorMessage =
          !(alphabeticalRegex(value) && value.length === 1) && value !== ""
            ? "The middle initial must be a single alphabetical character"
            : "";
        setFormErrors((prevState) => {
          return { ...prevState, middleInitial: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.middleInitial, "error"]);
        }
        break;
      case "bodyName0":
        setMeteorite(value);
        errorMessage = !alphabeticalRegex(value)
          ? "The meteorite name must consist of alphabetical characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, meteorite: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.meteorite, "error"]);
        }
        break;
      case "group0":
        setGroup(value);
        errorMessage = !alphabeticalRegex(value)
          ? "The meteorite group name must consist of alphabetical characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, group: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.group, "error"]);
        }
        break;
      case "element0_0":
        setElement(value);
        break;
      case "lessThan0_0":
        setLessThan(value);
        break;
      case "measurement0_0":
        setMeasurement(value);
        errorMessage = !decimalRegex(value)
          ? "The measurement must be a decmial number"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, measurement: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.measurement, "error"]);
        }
        break;
      case "deviation0_0":
        setDeviation(value);
        errorMessage = !(decimalRegex(value) || value !== "")
          ? "The deviation must be a decimal number"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, deviation: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.deviation, "error"]);
        }
        break;
      case "units0_0":
        setUnits(value);
        break;
      case "technique0_0":
        setTechnique(value);
        break;
      case "page0_0":
        setPage(value);
        errorMessage = !Number.isInteger(value)
          ? "The page number must be an integer"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, page: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.page, "error"]);
        }
        break;
      case "note0":
        setNotes(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(formErrors)) {
      e.target.submit();
    } else {
      alert("Validation errors");
    }
  };

  return (
    <form
      method="POST"
      action="/api/data-entry/insert"
      class="align-top mx-auto text-left"
      id="insert-form"
    >
      <BasicAttributesFormGroup
        handleChange={handleChange}
        formErrors={formErrors}
      />
      <MeteoriteFormGroup
        handleChange={handleChange}
        elements={elements}
        techniques={techniques}
        formErrors={formErrors}
      />
      <NotesFormGroup handleChange={handleChange} formErrors={formErrors} />
      <button
        type="submit"
        className="btn btn-warning mt-2 float-right"
        title="Validate or override to enable"
        id="submit-btn"
      >
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary mt-2 mr-2 float-left"
        id="save-btn"
      >
        Save
      </button>
    </form>
  );
};

export default DataEntryForm;
