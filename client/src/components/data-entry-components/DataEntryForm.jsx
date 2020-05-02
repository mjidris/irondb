import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import BasicAttributesFormGroup from "./BasicAttributesFormGroup";
import MeteoriteFormGroup from "./MeteoriteFormGroup";
import NotesFormGroup from "./NotesFormGroup";

const alphabeticalRegex = /^[a-zA-Z ]*$/;
const alphanumericRegex = /^[a-zA-Z0-9 ]*$/;
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
    switch (true) {
      case /^paperTitle$/.test(name):
        errorMessage = !alphanumericRegex.test(value)
          ? "The paper title must consist of alphanumeric characters"
          : "";
        setFormErrors((prevState) => {
          if (errorMessage.length > 0) {
            setAlert([formErrors.paperTitle, "error"]);
          }
          return { ...prevState, paperTitle: errorMessage };
        });

        break;
      case /^doi$/.test(name):
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
      case /^journalName$/.test(name):
        errorMessage = !alphanumericRegex.test(value)
          ? "The journal name must consist of alphanumeric characters only"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, journalName: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.journalName, "error"]);
        }
        break;
      case /^pubYear$/.test(name):
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
      case /^volume$/.test(name):
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
      case /^issue$/.test(name):
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
      case /^series$/.test(name):
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
      case /^firstName/.test(name):
        errorMessage = !alphabeticalRegex.test(value)
          ? "The first name must consist of alphabetical characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, firstName: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.firstName, "error"]);
        }
        break;
      case /^primaryName/.test(name):
        errorMessage = !alphabeticalRegex.test(value)
          ? "The last name must consist of alphabetical characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, lastName: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.lastName, "error"]);
        }
        break;
      case /^middleName/.test(name):
        errorMessage =
          !(alphabeticalRegex.test(value) && value.length === 1) && value !== ""
            ? "The middle initial must be a single alphabetical character"
            : "";
        setFormErrors((prevState) => {
          return { ...prevState, middleInitial: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.middleInitial, "error"]);
        }
        break;
      case /^bodyName/.test(name):
        errorMessage = !alphanumericRegex.test(value)
          ? "The meteorite name must consist of alphanumeric characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, meteorite: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.meteorite, "error"]);
        }
        break;
      case /^group/.test(name):
        errorMessage = !alphanumericRegex.test(value)
          ? "The meteorite group name must consist of alphanumeric characters"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, group: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.group, "error"]);
        }
        break;
      case /^element/.test(name):
        break;
      case /^lessThan/.test(name):
        break;
      case /^measurement/.test(name):
        errorMessage = !decimalRegex.test(value)
          ? "The measurement must be a decmial number"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, measurement: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.measurement, "error"]);
        }
        break;
      case /^deviation/.test(name):
        errorMessage = !(decimalRegex.test(value) || value !== "")
          ? "The deviation must be a decimal number"
          : "";
        setFormErrors((prevState) => {
          return { ...prevState, deviation: errorMessage };
        });
        if (errorMessage.length > 0) {
          setAlert([formErrors.deviation, "error"]);
        }
        break;
      case /^units/.test(name):
        break;
      case /^technique/.test(name):
        break;
      case /^page/.test(name):
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
      case /^note/.test(name):
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm(formErrors)) {
      const data = new FormData(e.target);
      const jsonResponse = await fetch("/api/data-entry", {
        method: "POST",
        body: data,
      });
      const response = await jsonResponse.json();
      if (response.message === "success") {
        return <Redirect to="/Panel" />;
      }
    } else {
      alert("Validation errors");
    }
  };

  return (
    <form
      method="POST"
      action="/api/data-entry/insert"
      className="align-top mx-auto text-left"
      id="insert-form"
      onSubmit={handleSubmit}
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
    </form>
  );
};

export default DataEntryForm;
