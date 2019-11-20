import React from 'react';
import '../css/tutorial.css';
import simpleSearch from '../assets/help/Search/simple_search.png';
import expandSource from '../assets/help/Search/source_expand.png';
import expandDate from '../assets/help/Search/date_expand.png';
import expandComposition from '../assets/help/Search/composition_expand.png';
import resetSearch from '../assets/help/Search/reset_search.png';
import exportPage from '../assets/help/Export/export_page.png';
import dataToExport from '../assets/help/Export/data.png';
import analysisTechnique from '../assets/help/Export/analysis_vs_row.png';

class Tutorial extends React.Component {
  render() {
    return (
        <body>
          <div className="container-fluid pt-3 pb-5" id="top-container">
            <div className="d-flex flex-row align-items-center justify-content-center mt-5 mb-2">
                <h1>Documentation</h1>
            </div>
          </div>

          <div className="container-fluid pt-3 pb-4" id="bottom-container">
            <div className="row justify-content-center">
              <div className="col-sm-10 ">
                <h5 className="pb-5">
                    Welcome to the Iron Meteorite Database, created as a componenet
                    of <a href="https://psyche.asu.edu/">NASA's Psyche Mission</a> and aiming
                    to benefit the entire scientific community. As the premiere database
                    for curated information on iron meteorites, we strive to provide the
                    most complete and most accurate collection of meteorite data by using
                    a mixture of natural language processing algorithms and human-guided
                    data entry. Learn
                    more <a href="https://psyche.asu.edu/get-involved/capstone-projects/capstone-projects-iron-className/iron-meteorite-database/">here</a>.
                </h5>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-sm-10">
                <center>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/p0ywMqjEHpQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </center>
              </div>
            </div>

            <br/><br/>

            <div className="Tutorial-Search">
              <div className="row justify-content-center">
                <div className="col-sm-10">
                  <h3 className="section-head">Search</h3>
                  <p className="pt-3">
                      If you know the <strong>meteorite name</strong> you are searching for,
                      or the name of the <strong>paper</strong> or <strong>author</strong>,
                      you can search for this on the <a href="/">landing page</a>.
                  </p>
                  <img src={simpleSearch} className="tutorial-image" alt="simple search"/>
                	<p>
                		For advanced searches, navigate to the <a href="/database">database page</a>
                    (or click <a href="/database">"Enter the Database"</a>.)
                	</p>
                	<h5 className="pt-4">
                		<u>Search by <strong>source</strong> of meteorite study:</u>
                	</h5>
                	<p>
                		Click on the plus + or minus - square button on the left to expand or
                    minimize search fields for <strong>journal name, volume, or page
                    number</strong> of the research paper in which the meteorite appears:
                	</p>
                  <img src={expandSource} className="tutorial-image" alt="expand source"/>
                  <p>
                  	Click on the plus + or minus - square button on the right to expand
                    or minimize search fields for <strong>date of publication</strong>
                    of the research paper in which the meteorite appears:
                  </p>
                  <p>
                  <img src={expandDate} className="tutorial-image" alt="expand date"/>
                  </p>
                  <h5>
                  	<u>Search by meteorite <strong>composition</strong>:</u>
                  </h5>
                  <p>
                  	Click the plus + or minus - signs next to "Composition" to expand or
                    minimize search fields for the <strong>chemical composition</strong>
                    of the meteorite:
                  </p>
                  <img src={expandComposition} className="tutorial-image" alt="expand composition"/>
                  <p className="pt-3">
                      You can then click "Search" to submit your query, or click "Reset"
                      to clear all fields.
                  </p>
                  <img src={resetSearch} className="tutorial-image" alt="reset search"/>
                </div>
              </div>
            </div>

            <div className="Tutorial-Export">
              <div class="row justify-content-center">
                <div class="col-sm-10">
                  <h3 class="section-head">Export Data</h3>
                  <p class="pt-3">
                    If you would like to export a CSV of your search results, submit a
                    query in the <a href="/database">database page</a>, then click the
                    "Export" button.
                  </p>
                  <img src={exportPage} className="tutorial-image" alt="export page"/>
                  <p>
                    You will be redirected to the "Export Data" page. Verify that the
                    listed data is what you wish to export and delete any unwanted
                    entries. You can choose to export this data separated by the analysis
                    techniques used for each meteorite (this can result in multiple
                    rows for a single meteorite that has multiple analysis techniques),
                    or you can choose to discard the analysis techniques and export
                    each meteorite in a single row of the CSV.
                  </p>
                    <img src={dataToExport} className="tutorial-inline" alt="data to export"/>
                    <img src={analysisTechnique} className="tutorial-inline" alt="export by analysis technique vs single row"/>
                  <p class="pt-5">
                    Once you are done customizing your export, you can click "Export
                    Data" to download the CSV file on your local machine.
                  </p>
                </div>
              </div>
            </div>

            <div className="Tutorial-DataEntry">
            </div>
          </div>
        </body>


    );
  }
}

export default Tutorial;
