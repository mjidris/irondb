import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import DataEntryAlert from "../data-entry-components/DataEntryAlert";
import DataEntryEditor from "../data-entry-components/DataEntryEditor";
import DataEntryPDF from "../data-entry-components/DataEntryPDF";
import DataEntryTool from "../data-entry-components/DataEntryTool";
import "../styles/DataEntry.scss";

const DataEntry = () => {
  let { path, url } = useRouteMatch();

  const [[alert, alertType], setAlert] = useState([null, null]);
  const [meteoriteData, setData] = useState({});
  const [mode, setMode] = useState();

  useEffect(() => {
    console.log("Calling editor endpoint...");
    fetch("/api/data-entry/editor")
      .then((res) => res.json())
      .then((resData) => {
        setData({
          data: resData.data,
          elements: resData.Elements,
          techniques: resData.Technique,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    let buttonMode = e.target.getAttribute("id");
    if (buttonMode === "tool") {
      setMode("PDF");
    } else if (buttonMode === "editor") {
      setMode("manual");
    }
  };

  return (
    <div className="data-entry">
      {alert !== null && <DataEntryAlert alert={alert} alertType={alertType} />}
      <div class="container-fluid pt-3" id="content"></div>
      <div class="d-flex flex-row align-items-center justify-content-center mt-5 mb-2">
        <h3>Select a data entry approach below:</h3>
      </div>

      <div class="d-flex flex-row align-items-center justify-content-center pt-3">
        <button
          class="btn btn-danger btn-lg text-light"
          id="tool"
          onClick={handleClick}
        >
          With PDF
        </button>
        <h3 class="mx-4 mb-2"> - or - </h3>
        <button class="btn btn-danger btn-lg" id="editor" onClick={handleClick}>
          Without PDF
        </button>
      </div>

      {mode === "PDF" && <DataEntryPDF />}
      {mode === "manual" && (
        <DataEntryEditor meteoriteData={meteoriteData} setAlert={setAlert} />
      )}
    </div>
  );
};

export default DataEntry;
