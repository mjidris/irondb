import React, { useState } from "react";
import BasicAttributesFormGroup from "./BasicAttributesFormGroup";
import MeteoriteFormGroup from "./MeteoriteFormGroup";
import NotesFormGroup from "./NotesFormGroup";

const DataEntryForm = ({ elements, techniques }) => {
  // Basic attributes group
  const [paperTitle, setPaperTitle] = useState();
  const [doi, setDoi] = useState();
  const [journalName, setJournalName] = useState();
  const [yearPublished, setYearPublished] = useState();
  const [volume, setVolume] = useState();
  const [issue, setIssue] = useState();
  const [issn, setIssn] = useState();
  const [author, setAuthor] = useState();
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

  const validateForm = async (e) => {
    // const postData = {};
    // for (let i = 0; i < formData.length; i++) {
    //   if (
    //     !formData[i].name.includes("convertedDeviation") &&
    //     !formData[i].name.includes("convertedMeasurement") &&
    //     !formData[i].name.includes("sigfig")
    //   ) {
    //     if (
    //       formData[i].name.includes("primaryName") ||
    //       formData[i].name.includes("firstName") ||
    //       formData[i].name.includes("middleName") ||
    //       formData[i].name.includes("bodyName")
    //     ) {
    //       const input = $('input[name="' + formData[i].name + '"]');
    //       input.val(input.val().charAt(0).toUpperCase() + input.val().slice(1));
    //       postData[formData[i].name.toString()] = input.val();
    //     } else {
    //       postData[formData[i].name.toString()] = formData[i].value;
    //     }
    //   }
    // }

    // Call Post Request for validation with all data
    let payload = {
      paperTitle: paperTitle,
      doi: doi,
      journalName: journalName,
      yearPublished: yearPublished,
      volume: volume,
      issue: issue,
      issn: issn,
      author: author,
      lastName: lastName,
      firstName: firstName,
      middleInitial: middleInitial,
      meteorite: meteorite,
      group: group,
      element: element,
      measurement: measurement,
      lessThan: lessThan,
      deviation: deviation,
      units: units,
      technique: technique,
      page: page,
      notes: notes,
    };
    const rawResponse = await fetch("/api/data-entry/tool/validate", {
      method: "POST",
      headers: {
        "content-type": "Application/JSON",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(payload),
    });
    console.log(rawResponse[0]);
    // const response = await rawResponse.json();
    // response.map((entry) => {
    //   console.log(entry);
    // });
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
        disabled="true"
        title="Validate or override to enable"
        id="submit-btn"
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
