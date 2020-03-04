import React, { useState } from 'react';

const DataEntryPDF = () => {
    const [ entryResult, setEntryResult ] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('/data-entry', {
            method: 'POST',
            body: data,
        })
            .then(res => {
                setEntryResult(res.data);
                console.table(res.data);
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    return (
        <div class="d-flex flex-row align-items-center justify-content-center pt-3">
            <form onSubmit={handleSubmit} enctype="multipart/form-data" class="border border-dark align-top mx-auto bg p-3" id="pdf-form">
                <div class="form-group">
                    <label for="filetoupload">Choose file to upload</label>
                    <input type="file" id="pdf" name="filetoupload"
                        accept=".pdf" />
                </div>
                <button type="submit" class="btn btn-secondary float-right">Submit</button>
            </form>
        </div>
    );
}

export default DataEntryPDF;