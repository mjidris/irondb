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
  const [measurements, setMeasurements] = useState();
  const [element, setElement] = useState("H");
  const [measurement, setMeasurement] = useState();
  const [lessThan, setLessThan] = useState(false);
  const [deviation, setDeviation] = useState("0");
  const [units, setUnits] = useState("wt%");
  const [technique, setTechnique] = useState("INAA");
  const [page, setPage] = useState();

  // Notes group
  const [notes, setNotes] = useState();
  //   const validateForm = e => {
  //     //const formData = ;
  //     const postData = {};
  //     for (let i = 0; i < formData.length; i++) {
  //       if (
  //         !formData[i].name.includes("convertedDeviation") &&
  //         !formData[i].name.includes("convertedMeasurement") &&
  //         !formData[i].name.includes("sigfig")
  //       ) {
  //         if (
  //           formData[i].name.includes("primaryName") ||
  //           formData[i].name.includes("firstName") ||
  //           formData[i].name.includes("middleName") ||
  //           formData[i].name.includes("bodyName")
  //         ) {
  //           const input = $('input[name="' + formData[i].name + '"]');
  //           input.val(
  //             input
  //               .val()
  //               .charAt(0)
  //               .toUpperCase() + input.val().slice(1)
  //           );
  //           postData[formData[i].name.toString()] = input.val();
  //         } else {
  //           postData[formData[i].name.toString()] = formData[i].value;
  //         }
  //       }
  //     }

  //     // Call Post Request for validation with all data
  //     $.post("/data-entry/tool/validate", postData, function(data) {
  //       // $('#event-div').append('<p>' + JSON.stringify(data) + '</p>');
  //       const parsedData = JSON.parse(data[0]);
  //       // Set classes on all attributes
  //       Object.entries(parsedData).map(function(entry) {
  //         const selector = "#" + entry[0];
  //         const object = $(selector);
  //         // Parse Attributes
  //         if (entry[1] === "invalid") {
  //           object
  //             .removeClass("is-valid")
  //             .removeClass("is-invalid")
  //             .addClass("is-invalid");
  //         } else if (entry[1] === "success") {
  //           object
  //             .removeClass("is-valid")
  //             .removeClass("is-invalid")
  //             .addClass("is-valid");
  //         } else {
  //           object
  //             .removeClass("is-valid")
  //             .removeClass("is-invalid")
  //             .addClass("is-valid");
  //         }
  //       });

  //       // Check if all valid
  //       const allInputs = $("input,textarea,select");
  //       let allValid = true;
  //       allInputs.each(function() {
  //         if ($(this).hasClass("is-invalid")) {
  //           allValid = false;
  //         }
  //       });

  //       if (allValid) {
  //         // If all valid enable submit
  //         $("#submit-btn").prop("disabled", false);
  //         // Alert all valid
  //         // eslint-disable-next-line no-undef
  //         const alert = ejs.render(validationWarningAlertTemplate, {
  //           type: "success",
  //           messageTitle: "Success:",
  //           message: "All inputs valid. Submission enabled."
  //         });
  //         $("div.main-alert-target").html(alert);
  //       } else {
  //         // Alert in valid
  //         // eslint-disable-next-line no-undef
  //         const alert = ejs.render(validationWarningAlertTemplate, {
  //           type: "danger",
  //           messageTitle: "Warning:",
  //           message: "Invalid inputs present. Please fix and revalidate."
  //         });
  //         $("div.main-alert-target").html(alert);
  //       }
  //     }); // End validation post
  //   };

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
        setMeasurements={setMeasurements}
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
