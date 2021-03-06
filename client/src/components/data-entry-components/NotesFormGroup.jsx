import React from 'react';

const NotesFormGroup = () => (
    <React.Fragment>
        <div className="form-row notes-header">
            <h5 className="pt-1 mr-2"><strong>Notes</strong></h5>
            <i className="fas fa-plus-circle fa-lg mt-2 text-danger add-note"></i>
        </div>

        <div className="form-row pt-1">
            <label for="note0">Note:
        <i className="far fa-times-circle fa-lg remove remove-note pl-5 text-danger" title="Press to remove note."></i>
            </label>
            <textarea className="form-control" id="note0" name="note0" rows="5"></textarea>
        </div>
    </React.Fragment>
);

export default NotesFormGroup;