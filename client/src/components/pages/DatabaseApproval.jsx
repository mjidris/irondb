import React from "react";
import '../styles/User-Management.scss';
import { Link } from "react-router-dom";
import {ppbToPercent,ppbToPPM, ppmToPPB,ppbToMilligramsPerGram, ppbToMicrogramsPerGram} from "../utils/unit-conversion";

const data = [];

class DatabaseApproval extends React.Component {

  state = {
    message: null,
    username: "Username",
    user_id: null,
    data: null,
    apiResponse: null,
    error: null,
    approval: null,

  };

  constructor(props) {
    super(props)

  }

/**
 * @description Process Approval request. Grabs the selected paper ID
 */
loadApproval(e) {

  const selectElement = e.target;
  const paperID = selectElement.closest('tr').firstChild.innerHTML.trim();
  console.log("Processing paper: "+paperID);
  this.approve(paperID);
  }


/**
 * Make Approvals
 * @param {*} jsonString
 */
async approve(paperID) {

  var payload = {
    paperID: paperID
  };

  await fetch("/api/data-entry/approve", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  })      
  .then(res => res.json())
  .then(res => {
    this.setState({ approval: res });

    if (res !== undefined) {
        if (this.state.approval.error != null)
        {
          console.log("Approval Error");
          this.setState({error: this.state.approval.error});
        }
        else
        {
          console.log("Approval Success");
        }
      
    } else {
      console.log("Connection Failed");
      this.setState({error: "Connection Failed"});
    }
  });

}


  getUnapprovedEntries() {
    fetch("/api/database/unapproved", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res });

        if (res !== undefined) {
          console.log("Data recieved successfully");
          console.log(this.state.data);
        } else {
          console.log("Data request failed");
          console.log(this.state.data);
        }
      });
  }

  
  componentDidMount() {
    this.getUnapprovedEntries();
  }


  render() {

    let pendingItems =  [];

    if (this.state.data != null && this.state.data.Entries!=null) {
      for (const [index, value] of this.state.data.Entries.entries()) {
        pendingItems.push(
          <tr>
          <th>
            {this.state.data.Entries[index].paper_id}
          </th>
          <th>
          {this.state.data.Entries[index].title}
          </th>
          <th>
          {this.state.data.Entries[index].submission_date}
          </th>
          <th>
          {this.state.data.Entries[index].submitted_by}
          </th>
          <th>
              
                <label class="sr-only" for="paperID">entry ids of currently viewed entries</label>
                <input type="hidden" name="paperID" value={this.state.data.Entries[index].paper_id} />
                <button class="btn btn-warning" onClick={(e) => {this.loadApproval(e)}}>Load Approval</button>
            
            </th>
         </tr>        
        
        )
      }
    }

    //Render default state: no approval selected OR there was an error
    if (this.state.approval == null || this.state.approval.error != null) {
      return (
          <div class="row mt-2 col-12 mb-4 pb-4">
          <div class="row col-12">

              <div>
              <h2> <i class="fas fa-sliders-h"></i> Approval Needed</h2>
              </div>  

              { //Check to see if we have an error to display
            (this.state.approval != null && this.state.approval.error != null) 
                    ? <div class="row col-12">
                        <div className="alert alert-danger mx-auto text-center" role="alert" id="">
                            <i class="far fa-times-circle"></i> <strong>Error:</strong> {this.state.approval.error}
                        </div></div>
                    : null
          }

          </div>





          <div class="card col-md mr-2 mt-2 pt-2">
            <div>
              <Link class="btn btn-project btn-sm p-2 text-warning " to="../unapproved"><i class="far fa-check-circle"></i> Approval
                  Needed
          
                {(this.state.data != null)? <span class="h1 badge badge-light btn-badge">{this.state.data.pendingCount}</span>
                  : null
                  }
                  
              </Link>
            </div>
            <div>
              <table class="table table-stripd table-bordered">
                <thead class="thead-dark">
                  <tr>
                    <th>Paper ID</th>
                    <th>Paper Title</th>
                    <th>Date Imported</th>
                    <th>Imported by</th>
                    <th>Approval</th>
                  </tr>
                </thead>
                <tbody class='table-light'>

                {(pendingItems != null && pendingItems.length>0)?pendingItems:
                
                <tr class="blank-spacer">
              
                  <td colspan="5" class="text-center mt-3"><i class="fas fa-check"></i> No Pending Entries</td>
          
                </tr>
                
                }
                </tbody>
              </table>
            </div>
            </div>

          <div class="col-12">
              <Link class="btn btn-project btn-sm p-2 text-warning mt-3" to="/panel">
              <i class="fas fa-arrow-circle-left"></i>  Back
              </Link>
          </div>

          </div>




        
      
      );
    }
    //paper was selected for approval process AND there was no errors
    else if (this.state.approval != null && this.state.approval.error == null) {
      
      if (this.state.approval.pdfPath !== null && this.state.approval.pdfPath.slice(this.state.approval.pdfPath.length - 4) === '.pdf') 
      {
          var hasPDF = true;
      }
      else 
      {
          var hasPDF = false;
      }

     let paper = this.state.approval;

    //Create an array of attributions
    let attribItems =  [];
    if (this.state.approval.AuthorsWithAttribution != null) {
      for (const [index, value] of this.state.approval.AuthorsWithAttribution.entries()) {
        attribItems.push(
          <div>
            <div class="form-row author-header">
              <form class="form-inline" action="/data-entry/approve/update" method="POST">
                  <p class="pt-1 mr-2">Author({index+1} of {this.state.approval.AuthorsWithAttribution.length})</p>
                  <label class="sr-only" for="type">request type</label>
                  <input type="hidden" name="type" value="author" />

                  <label class="sr-only" for="submissionID">ID of submission</label>
                  <input type="hidden" name="submissionID" value={this.state.approval.SubmissionID} />

                  <label class="sr-only" for="authorID">ID of current author</label>
                  <input type="hidden" name="authorID" value={this.state.approval.AuthorsWithAttribution[index].author_id} />

                  <label class="sr-only" for="authorStatus">ID of status entry for author</label>
                  <input type="hidden" name="authorStatus" value={this.state.approval.AuthorsWithAttribution[index].status_id} />

                  <label class="sr-only" for="attributionID">ID of current attribution</label>
                  <input type="hidden" name="attributionID" value={this.state.approval.AuthorsWithAttribution[index].attribution_id} />

                  <label class="sr-only" for="attributionStatus">ID of status entry for attribution</label>
                  <input type="hidden" name="attributionStatus" value={this.state.approval.AuthorsWithAttribution[index].attribution_status_id} />

                  <label class="sr-only" for="paperStatus">ID of status entry for paper</label>
                  <input type="hidden" name="paperStatus" value={this.state.approval.Paper.status_id} />

                  <button class="btn btn-primary btn-sm ml-1" type="submit">Approve</button>
              </form>
            </div>

            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="primaryName">Last Name</label>
                <input type="text" class="form-control" name="primaryName" readonly value={this.state.approval.AuthorsWithAttribution[index].primary_name} /> 
              </div>
              <div class="form-group col-md-4">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" name="firstName" required="true" readonly value={this.state.approval.AuthorsWithAttribution[index].first_name} /> 
              </div>
              <div class="form-group col-md-3">
                <label for="middleName" >Middle Name</label>
                <input type="text" class="form-control" name="middleName" readonly value={this.state.approval.AuthorsWithAttribution[index].middle_name} /> 
              </div>
            </div>
          </div>
        )
      }
    }

    //Create an array of bodies
    let bodyItems =  [];
    let groupItems = [];
    let elementItems = [];
    let elementUnit = [];
    let unattachedItems = [];

    if (this.state.approval.Bodies != null) {
      for (const [index, value] of this.state.approval.Bodies.entries()) {

        //Reset groupItems per iteration
        let groupItems = [];

        //Set index of current body
        let bodyIndex = index;
        
        //Populate groups
        if (this.state.approval.Groups != null) {
          for (const [index, value] of this.state.approval.Groups.entries()) {
            if (this.state.approval.Groups[index].body_id === this.state.Bodies[bodyIndex].body_id) {
              groupItems.push(
                <div class="form-group col-md-2">
                  <label for="group">Group</label>
                  <input type="text" class="form-control" name="group" readonly value={this.state.approval.Groups[index].the_group} />
              </div>
              )
            }

          }
        }

        //Unattached Elements
        let currentName = '';
        let unattachedItems = [];
        if (this.state.approval.UnattachedElementEntries != null) {
          for (const [index, value] of this.state.approval.UnattachedElementEntries.entries()) {

            let unattachedElementUnit = [];


            if (this.state.approval.UnattachedElementEntries[index].original_unit === "wt_percent") {
              unattachedElementUnit.push(
                <div>
                  <div class="form-group col-md-2">
                    <label for="measurement">Measurement</label>
                    <input type="number" class="form-control"  name="measurement" readonly value={ppbToPercent(this.state.approval.UnattachedElementEntries[index].ppb_mean, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>  
                  <div class="form-group col-md-1">
                    <label for="deviation">(&plusmn;)</label>
                    <input type="number" class="form-control" name="deviation" readonly value={ppbToPercent(this.state.approval.UnattachedElementEntries[index].deviation, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>
                  <div class="form-group col-md-2">
                      <label for="units">Units</label>
                      <input type="text" class="form-control"  name="units" readonly value="wt%" />
                  </div>
                </div>
              )
            } else if (this.state.approval.UnattachedElementEntries[index].original_unit === "ppm") {
              unattachedElementUnit.push(
                <div>
                  <div class="form-group col-md-2">
                      <label for="measurement">Measurement</label>
                      <input type="number" class="form-control"  name="measurement" readonly value={ppbToPPM(this.state.approval.UnattachedElementEntries[index].ppb_mean, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>
                  <div class="form-group col-md-1">
                      <label for="deviation">(&plusmn;)</label>
                      <input type="number" class="form-control" name="deviation" readonly value={ppbToPPM(this.state.approval.UnattachedElementEntries[index].deviation, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>
                  <div class="form-group col-md-2">
                      <label for="units">Units</label>
                      <input type="text" class="form-control"  name="units" readonly value="ppm" />
                  </div>
                </div>
                )
            } else if (this.state.approval.UnattachedElementEntries[index].original_unit === "ppb") {
              unattachedElementUnit.push(
                <div>
                  <div class="form-group col-md-2">
                      <label for="measurement">Measurement</label>
                      <input type="number" class="form-control"  name="measurement" readonly value={this.state.approval.UnattachedElementEntries[index].ppb_mean} />
                  </div>
                  <div class="form-group col-md-1">
                      <label for="deviation">(&plusmn;)</label>
                      <input type="number" class="form-control" name="deviation" readonly value={this.state.approval.UnattachedElementEntries[index].deviation} />
                  </div>
                  <div class="form-group col-md-2">
                      <label for="units">Units</label>
                      <input type="text" class="form-control"  name="units" readonly value="ppb" />
                  </div>
                </div>
              )
            } else if (this.state.approval.UnattachedElementEntries[index].original_unit === "mg_g") {
              unattachedElementUnit.push(
                <div>
                  <div class="form-group col-md-2">
                      <label for="measurement">Measurement</label>
                      <input type="number" class="form-control"  name="measurement" readonly value={ppbToMilligramsPerGram(this.state.approval.UnattachedElementEntries[index].ppb_mean, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>
                  <div class="form-group col-md-1">
                      <label for="deviation">(&plusmn;)</label>
                      <input type="number" class="form-control" name="deviation" readonly value={ppbToMilligramsPerGram(this.state.approval.UnattachedElementEntries[index].deviation, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>
                  <div class="form-group col-md-2">
                      <label for="units">Units</label>
                      <input type="text" class="form-control"  name="units" readonly value="mg/g" />
                  </div>
                </div>
              )
            } else if (this.state.approval.UnattachedElementEntries[index].original_unit === "ug_g") {
              unattachedElementUnit.push(
                <div>
                  <div class="form-group col-md-2">
                      <label for="measurement">Measurement</label>
                      <input type="number" class="form-control"  name="measurement" readonly value={ppbToMicrogramsPerGram(this.state.approval.UnattachedElementEntries[index].ppb_mean, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>
                  <div class="form-group col-md-1">
                      <label for="deviation">(&plusmn;)</label>
                      <input type="number" class="form-control" name="deviation" readonly value={ppbToMicrogramsPerGram(this.state.approval.UnattachedElementEntries[index].deviation, this.state.approval.UnattachedElementEntries[index].sigfig)} />
                  </div>
                  <div class="form-group col-md-2">
                      <label for="units">Units</label>
                      <input type="text" class="form-control"  name="units" readonly value="&micro;g/g" />
                  </div>
                </div>
              )
            } else if (this.state.approval.UnattachedElementEntries[index].original_unit === "ng_g") {
              unattachedElementUnit.push(
                <div>
                  <div class="form-group col-md-2">
                      <label for="measurement">Measurement</label>
                      <input type="number" class="form-control"  name="measurement" readonly value={this.state.approval.UnattachedElementEntries[index].ppb_mean} />
                  </div>
                  <div class="form-group col-md-1">
                      <label for="deviation">(&plusmn;)</label>
                      <input type="number" class="form-control" name="deviation" readonly value={this.state.approval.UnattachedElementEntries[index].deviation} />
                  </div>
                  <div class="form-group col-md-2">
                      <label for="units">Units</label>
                      <input type="text" class="form-control"  name="units" readonly value="ng/g" />
                  </div>
                </div>
              )
            }


            if (this.state.approval.UnattachedElementEntries[index].nomanclature !== currentName)
            {
              unattachedItems.push(
                <h3>
                  Measurements for {this.state.approval.UnattachedElementEntries[index].nomanclature}
                </h3>
              )
              currentName = this.state.approval.UnattachedElementEntries[index].nomencalture;
            }
            if (this.state.approval.UnattachedElementEntries[index].less_than == 'true') {
              var disabled = false;
              var checked = true;
            }
            else {
              var checked = false;
              var disabled = true;
            }
              unattachedItems.push(
                <div>

                  <div class="form-row">
                      <div class="col-md-2">
                          <form class="form-inline pt-4 pr-2" action="/data-entry/approve/update" method="POST">
                              <label class="sr-only" for="type">request type</label>
                              <input type="hidden" name="type" value="element" />

                              <label class="sr-only" for="submissionID">ID of submission</label>
                              <input type="hidden" name="submissionID" value={this.state.approval.SubmissionID} />

                              <label class="sr-only" for="elementID">ID of current element</label>
                              <input type="hidden" name="elementID" value={this.state.approval.UnattachedElementEntries[index].element_id} />

                              <label class="sr-only" for="elementStatus">ID of status entry for element</label>
                              <input type="hidden" name="elementStatus" value={this.state.approval.UnattachedElementEntries[index].status_id} />

                              <button class="btn btn-primary btn-sm ml-1" type="submit">Approve</button>
                          </form>
                      </div>
                      <div class="form-group col-md-1 mr-3">
                          <label for="element">Element</label>
                          <input type="text" class="form-control" name="element" readonly value={this.state.approval.UnattachedElementEntries[index].element_symbol.charAt(0).toUpperCase() + this.state.approval.UnattachedElementEntries[index].element_symbol.slice(1)} />
                      </div>
                      <div class="form-check-inline col-auto">
                          <input class="form-check-input" type="checkbox"  disabled={disabled} checked={checked} />
                          <label class="form-check-label" for="lessThan">&lt;</label>
                      </div>


                    {(unattachedElementUnit != null && unattachedElementUnit.length>0)?unattachedElementUnit:null}
                  
                    <div class="form-group col-md-2">
                    <label for="technique">Technique</label>
                    <input type="text" class="form-control"  name="technique" readonly value="<%= UnattachedElementEntries[k].technique %>" />
                </div>
                <div class="form-group col-md-1">
                    <label for="page">Page</label>
                    <input type="number" class="form-control p-1" name="page" readonly value="<%= UnattachedElementEntries[k].page_number %>" />
                </div>
              </div>
              </div>
              )
          }
        }


        //Populate Elements
        if (this.state.approval.ElementEntries != null) {
          for (const [index, value] of this.state.approval.ElementEntries.entries()) {
            if (this.state.approval.ElementEntries[index].body_id === this.state.Bodies[bodyIndex].body_id) {
              if (this.state.approval.ElementEntries[index].less_than == 'true') {
                disabled = false;
                checked = true;
              }
              else {
                checked = false;
                disabled = true;
              }

              elementUnit = [];

              if (this.state.approval.ElementEntries[index].original_unit === "wt_percent") {
                elementUnit.push(
                  <div>
                    <div class="form-group col-md-2">
                      <label for="measurement">Measurement</label>
                      <input type="number" class="form-control"  name="measurement" readonly value="<%= _.ppbToPercent(ElementEntries[k].ppb_mean, ElementEntries[k].sigfig) %>" />
                    </div>  
                    <div class="form-group col-md-1">
                      <label for="deviation">(&plusmn;)</label>
                      <input type="number" class="form-control" name="deviation" readonly value="<%= _.ppbToPercent(ElementEntries[k].deviation, ElementEntries[k].sigfig) %>" />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="units">Units</label>
                        <input type="text" class="form-control"  name="units" readonly value="wt%" />
                    </div>
                  </div>
                )
              } else if (this.state.approval.ElementEntries[index].original_unit === "ppm") {
                elementUnit.push(
                  <div>
                    <div class="form-group col-md-2">
                        <label for="measurement">Measurement</label>
                        <input type="number" class="form-control"  name="measurement" readonly value="<%= _.ppbToPPM(ElementEntries[k].ppb_mean, ElementEntries[k].sigfig) %>" />
                    </div>
                    <div class="form-group col-md-1">
                        <label for="deviation">(&plusmn;)</label>
                        <input type="number" class="form-control" name="deviation" readonly value="<%= _.ppbToPPM(ElementEntries[k].deviation, ElementEntries[k].sigfig) %>" />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="units">Units</label>
                        <input type="text" class="form-control"  name="units" readonly value="ppm" />
                    </div>
                  </div>
                  )
              } else if (this.state.approval.ElementEntries[index].original_unit === "ppb") {
                elementUnit.push(
                  <div>
                    <div class="form-group col-md-2">
                        <label for="measurement">Measurement</label>
                        <input type="number" class="form-control"  name="measurement" readonly value="<%= ElementEntries[k].ppb_mean %>" />
                    </div>
                    <div class="form-group col-md-1">
                        <label for="deviation">(&plusmn;)</label>
                        <input type="number" class="form-control" name="deviation" readonly value="<%= ElementEntries[k].deviation %>" />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="units">Units</label>
                        <input type="text" class="form-control"  name="units" readonly value="ppb" />
                    </div>
                  </div>
                )
              } else if (this.state.approval.ElementEntries[index].original_unit === "mg_g") {
                elementUnit.push(
                  <div>
                    <div class="form-group col-md-2">
                        <label for="measurement">Measurement</label>
                        <input type="number" class="form-control"  name="measurement" readonly value="<%= _.ppbToMilligramsPerGram(ElementEntries[k].ppb_mean, ElementEntries[k].sigfig) %>" />
                    </div>
                    <div class="form-group col-md-1">
                        <label for="deviation">(&plusmn;)</label>
                        <input type="number" class="form-control" name="deviation" readonly value="<%= _.ppbToMilligramsPerGram(ElementEntries[k].deviation, ElementEntries[k].sigfig) %>" />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="units">Units</label>
                        <input type="text" class="form-control"  name="units" readonly value="mg/g" />
                    </div>
                  </div>
                )
              } else if (this.state.approval.ElementEntries[index].original_unit === "ug_g") {
                elementUnit.push(
                  <div>
                    <div class="form-group col-md-2">
                        <label for="measurement">Measurement</label>
                        <input type="number" class="form-control"  name="measurement" readonly value="<%= _.ppbToMicrogramsPerGram(ElementEntries[k].ppb_mean, ElementEntries[k].sigfig) %>" />
                    </div>
                    <div class="form-group col-md-1">
                        <label for="deviation">(&plusmn;)</label>
                        <input type="number" class="form-control" name="deviation" readonly value="<%= _.ppbToMicrogramsPerGram(ElementEntries[k].deviation, ElementEntries[k].sigfig) %>" />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="units">Units</label>
                        <input type="text" class="form-control"  name="units" readonly value="&micro;g/g" />
                    </div>
                  </div>
                )
              } else if (this.state.approval.ElementEntries[index].original_unit === "ng_g") {
                elementUnit.push(
                  <div>
                    <div class="form-group col-md-2">
                        <label for="measurement">Measurement</label>
                        <input type="number" class="form-control"  name="measurement" readonly value="<%= ElementEntries[k].ppb_mean %>" />
                    </div>
                    <div class="form-group col-md-1">
                        <label for="deviation">(&plusmn;)</label>
                        <input type="number" class="form-control" name="deviation" readonly value="<%= ElementEntries[k].deviation %>" />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="units">Units</label>
                        <input type="text" class="form-control"  name="units" readonly value="ng/g" />
                    </div>
                  </div>
                )
              }


              elementItems.push(
                <div class="form-row">
                  <div class="col-md-2">
                      <form class="form-inline pt-4 pr-2" action="/data-entry/approve/update" method="POST">
                          <label class="sr-only" for="type">request type</label>
                          <input type="hidden" name="type" value="element" />

                          <label class="sr-only" for="submissionID">ID of submission</label>
                          <input type="hidden" name="submissionID" value={this.state.approval.SubmissionID} />

                          <label class="sr-only" for="elementID">ID of current element</label>
                          <input type="hidden" name="elementID" value={this.state.approval.ElementEntries[index].element_id} />

                          <label class="sr-only" for="elementStatus">ID of status entry for element</label>
                          <input type="hidden" name="elementStatus" value={this.state.approval.ElementEntries[index].status_id} />

                          <button class="btn btn-primary btn-sm ml-1" type="submit">Approve</button>
                      </form>
                  </div>

                  <div class="form-group col-md-1 mr-3">
                      <label for="element">Element</label>
                      <input type="text" class="form-control" name="element" readonly value={this.state.approval.ElementEntries[index].element_symbol.charAt(0).toUpperCase() + this.state.approval.ElementEntries[index].element_symbol.slice(1)} />
                  </div>

                  <div class="form-check-inline col-auto">      
                      <input class="form-check-input" type="checkbox" disabled={disabled} checked={checked} />
                      <label class="form-check-label" for="lessThan">&lt;</label>
                  </div>


                  {(elementUnit != null && elementUnit.length>0)?elementUnit:null}

                  <div class="form-group col-md-2">
                    <label for="technique">Technique</label>
                    <input type="text" class="form-control"  name="technique" readonly value={this.state.approval.ElementEntries[index].technique} />
                  </div>
                  <div class="form-group col-md-1">
                    <label for="page">Page</label>
                    <input type="number" class="form-control p-1" name="page" readonly value={this.state.approval.ElementEntries[index].page_number} />
                  </div>
                </div>
              )
            }
          }
        }




        bodyItems.push(
          <div>
              <div class="form-row meteorite-header">
                <h5 class="pt-1 mr-2"><strong>Meteorite</strong></h5>
              </div>
                            
              <div class="form-row">
                <div class="col-md-2 pt-4">
                  <form class="form-inline" action="/data-entry/approve/update" method="POST">
                      <label class="sr-only" for="type">request type</label>
                      <input type="hidden" name="type" value="meteorite" />

                      <label class="sr-only" for="submissionID">ID of submission</label>
                      <input type="hidden" name="submissionID" value={this.state.approval.SubmissionID} />

                      <label class="sr-only" for="bodyID">ID of current body</label>
                      <input type="hidden" name="bodyID" value={this.state.approval.Bodies[index].body_id} />

                      <label class="sr-only" for="bodyStatus">ID of status entry for body</label>
                      <input type="hidden" name="bodyStatus" value={this.state.approval.Bodies[index].status_id} />

                      <label class="sr-only" for="groupID">ID of current group</label>
                      <input type="hidden" name="groupID" value={this.state.approval.Groups[index].group_id} />

                      <label class="sr-only" for="groupStatus">ID of status entry for group</label>
                      <input type="hidden" name="groupStatus" value={this.state.approval.Groups[index].status_id} />

                      <button class="btn btn-primary btn-sm ml-1" type="submit">Approve</button>
                  </form>
              </div>
              <div class="form-group col-md-6 ml-2">
                  <label for="bodyName">Meteorite</label>
                  <input type="text" class="form-control" name="bodyName" readonly value={this.state.approval.Bodies[index].nomenclature} />
              </div>

              {(groupItems != null && groupItems.length>0)?groupItems:null}
              {(elementItems != null && elementItems.length>0)?elementItems:null}
              {(unattachedItems != null && unattachedItems.length>0)?unattachedItems:null}

          </div>
          </div>
        )
      }
    }



      
      return (

        <div class="container-fluid mt-5">
            <div class="row p-2" id="alert-target">


            <div id="event-div" class={(hasPDF) ?
              "col-sm-11 col-md-7 border border-dark rounded pb-2"
              :"container-fluid border border-dark rounded ml-md-5 mr-md-5 mb-3 pb-2"}>
                    
                    <div class="d-flex flex-row align-items-center justify-content-center mt-2 mb-2">
                        <h1>Approval</h1>
                    </div>
                    {
                      (!hasPDF) ?
                        <p>No pdf found for this submission.</p>
                      : null
                    }

              <h5 class="pt-1 pr-1 mr-2">     
                    {//Paper status is pending...
                      (paper.current_status === 'pending')?
                      <div>
                                <strong>Basic Information</strong>

                                <label class="sr-only" for="type">request type</label>
                                <input type="hidden" name="type" value="basic" />

                                <label class="sr-only" for="submissionID">ID of submission</label>
                                <input type="hidden" name="submissionID" value={paper.SubmissionID} />

                                <label class="sr-only" for="paperID">ID of current paper</label>
                                <input type="hidden" name="paperID" value={paper.paper_id} />

                                <label class="sr-only" for="paperStatus">ID of status entry for paper</label>
                                <input type="hidden" name="paperStatus" value={paper.status_id} />

                                <label class="sr-only" for="journalID">ID of current journal</label>
                                <input type="hidden" name="journalID" value={paper.journal_id} />

                                <label class="sr-only" for="journalStatus">ID of status entry for journal</label>
                                <input type="hidden" name="journalStatus" value={paper.status_id} />

                                <button class="btn btn-primary btn-sm ml-1" type="submit" id="basic-approve">Approve</button>


                      </div>
                      :
                      <div>
                        <strong>Basic Information</strong>
                        <em>(Basic information already approved, but shown for reference)</em>
                      </div>
                    }
              </h5>

              <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="paperTitle">Paper Title</label>
                    <input type="text" class="form-control" name="paperTitle" id="paperTitle" readonly value={paper.Paper.title} />
                </div>
                <div class="form-group col-md-4">
                    <label for="doi">DOI</label>
                    <input type="text" class="form-control" id="doi" name="doi" readonly value={paper.Paper.doi} />
                </div>
              </div>

              <div class="form-row">
                  <div class="form-group col-md-7">
                      <label for="journalName">Journal Name</label>
                      <input type="text" class="form-control" id="journalName" name="journalName" readonly value={paper.Journal.journal_name} />
                  </div>
                  <div class="form-group offset-md-1 col-md-4">
                      <label for="pub_year">Year Published</label>
                      <input type="number" class="form-control" id="pubYear" name="pubYear" readonly value={paper.Journal.published_year} />
                  </div>
              </div>

              <div class="form-row">
                  <div class="form-group col-md-3">
                      <label for="volume">Volume</label>
                      <input type="text" class="form-control" id="volume" name="volume" readonly value={paper.Journal.volume} />
                  </div>
                  <div class="form-group offset-md-1 col-md-3">
                      <label for="issue">Issue</label>
                      <input type="text" class="form-control" id="issue" name="issue" readonly value={paper.Journal.issue} />
                  </div>
                  <div class="form-group offset-md-1 col-md-3">
                      <label for="series">ISSN</label>
                      <input type="text" class="form-control" id="series" name="series" readonly value={paper.Journal.series} />
                  </div>
              </div>


              {(attribItems != null && attribItems.length>0)?attribItems:null}
              {(bodyItems != null && bodyItems.length>0)?bodyItems:null}

              </div>
            </div>          
      </div>

      );
    }


    }
  }


export default DatabaseApproval;
