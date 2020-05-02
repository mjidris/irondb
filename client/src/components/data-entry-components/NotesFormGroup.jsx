import React, { useState } from "react";
import Notes from "./Notes";

const NotesFormGroup = ({ handleChange }) => {
  const [notesCount, setNotesCount] = useState(0);
  const notes = [];

  const addNotes = () => {
    setNotesCount((prevCount) => prevCount + 1);
  };

  const deleteNotes = (index) => {
    delete notes[index];
    setNotesCount((prevCount) => prevCount - 1);
  };

  for (let i = 0; i <= notesCount; i++) {
    notes.push(
      <Notes index={i} noteID={`note${i}`} handleChange={handleChange} />
    );
  }

  return (
    <React.Fragment>
      <div className="form-row notes-header">
        <h5 className="pt-1 mr-2">
          <strong>Notes</strong>
        </h5>
        <i
          className="fas fa-plus-circle fa-lg mt-2 text-danger add-note"
          onClick={addNotes}
        ></i>
      </div>
      {notes}
    </React.Fragment>
  );
};

export default NotesFormGroup;
