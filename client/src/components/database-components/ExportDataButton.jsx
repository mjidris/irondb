import React from "react";
import '../styles/Database.scss'

const ExportDataButton = props => {
    
    function handleExport() {
        if (props.isExporting) {
            props.setExporting(false);
        } else {
            props.setExporting(true);
        }
    }

    return (
        <div className="col-sm-2 align-self-end">
            <div className="d-flex flex-row">
                <div className="d-flex flex-row">
                    {props.isExporting === true ? 
                        <div className="d-flex flex-row" id="export-buttons">
                            <button className="btn btn-success btn-block mt-2 move-right" >Confirm Export</button> 
                            <button className="btn btn-danger btn-block mt-2" onClick={handleExport} >Cancel Export</button>
                        </div>
                        : 
                        <button className="btn btn-outline-light btn-block mt-2" onClick={handleExport} >Export Data</button>}
                </div>
            </div>
        </div>      
    );
}

export default ExportDataButton;