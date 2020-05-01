import React, { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import '../styles/Database.scss'
const ExportDataButton = props => {

    // Used to hold the data for export
    const [csvData, setCsvData] = useState([null]);
    // Used as the headers of the table of the .csv file
    const headers = [
        { label: "Name", key: "meteorite_name" },
        { label: "Group", key: "classification_group" },
        { label: "Measurement Technique", key: "technique" },
        { label: "Major Elements (wt%)", key: "major" },
        { label: "Minor Elements (ppm)", key: "minor" },
        { label: "Trace Elements (ppb)", key: "trace" },
        { label: "Title", key: "title" },
        { label: "Authors", key: "authors" },
        { label: "Pg.#", key: "page_number" },
        { label: "Journal", key: "journal_name" },
        { label: "Volume", key: "volume" },
        { label: "Year published", key: "published_year" }
    ];

    //  Updates csvData on rerender
    //  Only runs if props.filtered or props.data.Entries is different between rerenders
    useEffect(() => {
        // Create object used to update csvData
        let obj;
        if (props.filtered === null || props.filtered === undefined) {
            obj = props.data.Entries;
        } else {
            obj = props.filtered;
        }
        // Create major, minor, and trace strings for every element in obj
        for (let i = 0; i < obj.length; i++) {
            formElementString(obj[i]);
        }
        // Update csvData
        setCsvData(obj);
    }, [props.filtered, props.data.Entries])

    // Creates major, minor, and trace element string and adds them to the entry parameter
    function formElementString(entry) {
        // Create variables
        let majorStr = "";
        let minorStr = "";
        let traceStr = "";
        // Create strings
        if (entry.major_elements !== null) {
            entry.major_elements.map(major => {
                let value = major.split(",");
                majorStr += capitalize(value) + ", ";
            })
        }
        if (entry.minor_elements !== null) {
            entry.minor_elements.map(minor => {
                let value = minor.split(",");
                minorStr += capitalize(value) + ", ";
            })
        }
        if (entry.trace_elements !== null) {
            entry.trace_elements.map(trace => {
                let value = trace.split(",");
                traceStr += capitalize(value) + ", ";
            })
        }
        // Update entry to hold each string
        // Substring used to remove trailing ', '
        entry.major = majorStr.substring(0, majorStr.length - 2);
        entry.minor = minorStr.substring(0, minorStr.length - 2);
        entry.trace = traceStr.substring(0, traceStr.length - 2);
    }

    // Used to create an element: value pair as a string
    function capitalize(word) {
        // Capitalize first letter
        let element = word[0].charAt(0).toUpperCase() + word[0].substring(1);
        let symbol = ": ";
        if (word[3] === "true") {symbol += "< ";}
        return element + symbol + word[1];
    }

    // Changes boolean value of isExporting whenever 'Cancel Export' or 'Export Data' is clicked
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
                            <div id="export-download" className="btn btn-success btn-block mt-2 move-right" > 
                                <CSVLink  data={csvData} headers={headers} filename={"data.csv" } >Confirm Export</CSVLink>
                            </div>
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