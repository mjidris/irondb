import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import DataEntryAlert from "../data-entry-components/DataEntryAlert";
import DataEntryEditor from "../data-entry-components/DataEntryEditor";
import DataEntryPDF from "../data-entry-components/DataEntryPDF";
import "../styles/DataEntry.scss";

const DataEntry = () => {
  let { path, url } = useRouteMatch();

  const [[alert, alertType], setAlert] = useState(["Alert", "success"]);

  const [meteoriteData, setData] = useState({});

  useEffect(() => {
    console.log("Calling editor endpoint...");
    fetch("/api/data-entry/editor")
      .then(res => res.json())
      .then(resData => {
        setData({
          data: resData.data,
          elements: resData.Elements,
          techniques: resData.Technique
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="data-entry">
      <DataEntryAlert alert={alert} alertType={alertType} />
      <div class="container-fluid pt-3" id="content"></div>
      <div class="d-flex flex-row align-items-center justify-content-center mt-5 mb-2">
        <h3>Select a data entry approach below:</h3>
      </div>

      <div class="d-flex flex-row align-items-center justify-content-center pt-3">
        <Link
          to={`${url}/pdf`}
          class="btn btn-danger btn-lg text-light"
          id="tool"
        >
          With PDF
        </Link>
        <h3 class="mx-4 mb-2"> - or - </h3>
        <Link to={`${url}/editor`} class="btn btn-danger btn-lg">
          Without PDF
        </Link>
      </div>

      <Switch>
        <Route path={`${path}/editor`}>
          <DataEntryEditor meteoriteData={meteoriteData} />
        </Route>
        <Route path={`${path}/pdf`}>
          <DataEntryPDF setAlert={setAlert} />
        </Route>
      </Switch>
    </div>
  );
};

export default DataEntry;
