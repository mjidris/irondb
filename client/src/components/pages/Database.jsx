import React from "react";
import {ppbToPercent} from "../utils/unit-conversion.js"

import '../styles/Database.scss';



class Database extends React.Component {
  state = {
    message: null,
    username: "Username",
    user_id: null,
    data: null
  };

  grabDatabase(event) {

    fetch("/api/database", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res });
        console.log("TEST");
        if (res !== undefined) {
          console.log("database request success");
          console.log(this.state.data);

        } else {
          console.log("database request failed");
          console.log(this.state.data);
        }
      });
  }

  componentDidMount() {
    this.grabDatabase();
  }

  render() {

    // Prepare entries 

    let entryItems =  [];
    let majorElementItems =  [];
    let minorElementItems =  [];
    let traceElementItems =  [];
    let symbol = null;
    let devSymbol = null;
    
    if (this.state.data != null) {
      console.log("TESTadasdadsd::" +this.state.data.Entries.length)
      for (const [index, value] of this.state.data.Entries.entries()) {

        //Clear element lists for this entry
        majorElementItems = [];
        minorElementItems = [];
        traceElementItems = [];

        // Create list of major elements
        if (this.state.data.Entries[index].major_elements != null) {
          
          for(var j = 0; j < this.state.data.Entries[index].major_elements.length; j++) {

                var temp = this.state.data.Entries[index].major_elements[j].split(',')
                var element_symbol = temp[0]
                var ppb_mean = temp[1]
                var deviation = temp[2]
                var less_than = temp[3]
                var sigfig = temp[4]   

                if (less_than === 'true') { 
                  symbol = "&lt; " + ppbToPercent(ppb_mean, sigfig);
                } 
                else
                {
                  symbol = " "+ ppbToPercent(ppb_mean, sigfig);
                }
                

                if (deviation !== '0') { 
                  devSymbol = "&plusmn; " + ppbToPercent(deviation, sigfig);
                } 
                else 
                {
                  devSymbol = "";
                }

                majorElementItems.push(
                  <p>
                    <strong>{element_symbol.charAt(0).toUpperCase() + element_symbol.slice(1)}:</strong>
                  {symbol}{devSymbol}
                  </p> 
                )
            }
     
        }

        // Create list of minor elements
        if (this.state.data.Entries[index].minor_elements != null) {
  
          for(var j = 0; j < this.state.data.Entries[index].minor_elements.length; j++) {

                var temp = this.state.data.Entries[index].minor_elements[j].split(',')
                var element_symbol = temp[0]
                var ppb_mean = temp[1]
                var deviation = temp[2]
                var less_than = temp[3]
                var sigfig = temp[4]   

                if (less_than === 'true') { 
                  symbol = "&lt; " + ppbToPercent(ppb_mean, sigfig);
                } 
                else
                {
                  symbol = " "+ ppbToPercent(ppb_mean, sigfig);
                }
                
                if (deviation !== '0') { 
                  devSymbol = "&plusmn; " + ppbToPercent(deviation, sigfig);
                } 
                else 
                {
                  devSymbol = "";
                }

                minorElementItems.push(
                  <p>
                    <strong>{element_symbol.charAt(0).toUpperCase() + element_symbol.slice(1)}:</strong>
                  {symbol}{devSymbol}
                  </p> 
                )
            }
        }

        // Create list of trace elements
        if (this.state.data.Entries[index].trace_elements != null) {
  
          for(var j = 0; j < this.state.data.Entries[index].trace_elements.length; j++) {

                var temp = this.state.data.Entries[index].trace_elements[j].split(',')
                var element_symbol = temp[0]
                var ppb_mean = temp[1]
                var deviation = temp[2]
                var less_than = temp[3]
                var sigfig = temp[4]   

                if (less_than === 'true') { 
                  symbol = "&lt; " + ppbToPercent(ppb_mean, sigfig);
                } 
                else
                {
                  symbol = " "+ ppbToPercent(ppb_mean, sigfig);
                }
                
                if (deviation !== '0') { 
                  devSymbol = "&plusmn; " + ppbToPercent(deviation, sigfig);
                } 
                else 
                {
                  devSymbol = "";
                }

                traceElementItems.push(
                  <p>
                    <strong>{element_symbol.charAt(0).toUpperCase() + element_symbol.slice(1)}:</strong>
                  {symbol}{devSymbol}
                  </p> 
                )
            }
      
        }

   
        entryItems.push(
          <tr>
            <th>
                  <a href={"/database/meteorite/"+this.state.data.Entries[index].entry_id+"?paper="+this.state.data.Entries[index].paper_id}>
                    {this.state.data.Entries[index].meteorite_name}
                  </a>
            </th>

            <th>{this.state.data.Entries[index].classification_group}</th>
            <th>{this.state.data.Entries[index].technique}</th>

            <th>
              {(majorElementItems != null && majorElementItems.length>0) ?majorElementItems:null}
            </th>

            <th>
              {(minorElementItems != null && minorElementItems.length>0) ?minorElementItems:null}
            </th>

            <th>
              {(traceElementItems != null && traceElementItems.length>0) ?traceElementItems:null}
            </th>


            <th>
              {this.state.data.Entries[index].title}
            </th>
            <th>
              {this.state.data.Entries[index].authors}
            </th>
            <th>
              {this.state.data.Entries[index].page_number}
            </th>
            <th>
              {this.state.data.Entries[index].journal_name}
            </th>
            <th>
              {this.state.data.Entries[index].volume}
            </th>
            <th>
              {this.state.data.Entries[index].published_year}
            </th>



         </tr>        
        
        )
      
    }
  }



    return (
      <div class='container-fluid'>

          <div class="container-fluid fixed-top p-2 border-bottom border-dark" id="search-panel">
      <div class="row ml-2 mt-2">
        <div class="col-sm-2 align-self-end">
          <div class="d-flex flex-row">
            <form action="/database/export" method="POST" id="export-form">
              <label class="sr-only" for="entries">entry ids of currently viewed entries</label>
              <div id="entry-ids">

                {/*
                <% for(var i=0; i < Entries.length; i++) { %>
                  <input type="hidden" name="entries" value=<%= Entries[i].entry_id %>>
                <% } %>
                */}

              </div>
              <button class="btn btn-outline-light btn-block mt-2" type="submit">Export Data</button>
            </form>
          </div>
        </div>
        <div class="col-sm-10">
          <form action="/database" method="POST" id="search-form">
            <div class="form-row mb-2">
              <div class="col-md-3 offset-md-1">
                <label class="sr-only" for="name"></label>
                <input type="text" name="name" id="name" class="form-control" placeholder="meteorite name" />
              </div>
              <div class="col-md-2">
                <label class="sr-only" for="title"></label>
                <input type="text" name="title" id="title" class="form-control" placeholder="paper title" />
              </div>
              <div class="col-md-2">
                <label class="sr-only" for="author"></label>
                <input type="text" name="author" id="author" class="form-control" placeholder="author" />
              </div>
              <div class="col-md-2">
                <label class="sr-only" for="group">group</label>
                <select class="form-control" name="group">
                  <option value="group">group</option>
                {/*
                  <% for(var i=0; i < Groups.length; i++) { %>
                    <option value="<%= Groups[i].classification_group %>"><%= Groups[i].classification_group %></option>
                  <% } %>  
                  */}

                </select>  
              </div>

              <span class="expandSearch">
                <i id="additional" class="far fa-minus-square fa-lg hide-journal text-warning" title="Hide additional options" hidden=""></i>
                <i id="additional" class="far fa-plus-square fa-lg show-journal text-warning" title="Show additional options"></i>
              </span>

            </div>

        
            
            <div class="form-row journal" hidden="true">
              <div class="form-group col-md-3 offset-md-1">
                <label class="sr-only" for="journal_name"></label>
                <input type="text" name="journal_name" id="journal_name" class="form-control" placeholder="journal name" disabled="true" />
              </div>
              <div class="form-group col-md-2">
                <label class="sr-only" for="volume"></label>
                <input type="number" name="volume" id="volume" class="form-control" placeholder="volume" step="1" disabled="true" />
              </div>
              <div class="form-group col-md-1">
                <label class="sr-only" for="page_number"></label>
                <input type="text" name="page_number" id="page_number" class="form-control" placeholder="pg" disabled="true" />
              </div>
              <div class="form-group col-md-1 year">
                <label class="sr-only" for="pub_yr_sign">published year modifier sign</label>
                <select class="form-control" name="pub_yr_sign" >
                  <option value="equal" default>=</option>
                  <option value="less">&lt;</option>
                  <option value="greater">&gt;</option>
                </select>
              </div>
              <div class="form-group col-md-2 year" >
                <label class="sr-only" for="pub_year">published year</label>
                <input type="number" class="form-control" name="pub_year" id="pub_year" min="1900" Max="2019" step="1" placeholder="year" disabled="true" />
              </div>
            </div>
            
            <div class="form-row mt-3" id="composition0">
              <div class="col-md-2">
                <h4 class="text-light">Composition:</h4>
              </div>
              <div class="col-md-1 mt-1">
                  <i class="fas fa-plus-circle fa-lg text-warning show-element" title="Add element constraint"></i>
                  <i class="fas fa-minus-circle fa-lg text-warning hide-element" title="Remove element constraint"></i>
              </div>
              <div class="form-group col-md-1 hide-target" hidden="true">
                <label class="sr-only" for="element0_mod">Element modifier</label>
                <select class="form-control" name="element0_mod" title="Select whether to search for an element that appears in the data or not" disabled="true">
                  <option value="IN" default>IN</option>
                  <option value="NOT">NOT</option>
                </select>
              </div>
              <div class="form-group col-sm-3 element hide-target" hidden="true">
                <label class="sr-only" for="element0">element</label>
                <select class="form-control custom-select element" name="element0" multiple disabled="true" id="element0">
                  <option disabled>Element</option>


                  {/*
                  <% for(var i=0; i < Elements.length; i++) { %>
                    <option value="<%= Elements[i].symbol.toLowerCase()%>"><%= Elements[i].symbol %></option> 
                  <% } %>       
                  */}


                </select>
              </div>
              <div class="form-group col-sm-3 hide-target" hidden="true">
                <label class="sr-only" for="range0">Range</label>
                <select class="form-control" name="range0" disabled="true">
                  <option>Range</option>
                  <option value="major">Major</option>
                  <option value="minor">Minor</option>
                  <option value="trace">Trace</option>
                </select>
              </div>
            </div>
            <div class="form-row mt-2" id="composition1" hidden="true">
              <div class="form-group col-md-1 offset-md-3">
                <label class="sr-only" for="element1_mod">Element modifier</label>
                <select class="form-control" name="element1_mod" title="Select whether to search for an element that appears in the data or not" disabled="true">
                  <option value="IN" default>IN</option>
                  <option value="NOT">NOT</option>
                </select>
              </div>
              <div class="form-group col-sm-3 element">
                <label class="sr-only" for="element1">element</label>
                <select class="form-control custom-select element" name="element1" multiple disabled="true">
                  <option disabled>Element</option>

                {/*
                  <% for(var i=0; i < Elements.length; i++) { %>
                    <option value="<%= Elements[i].symbol.toLowerCase()%>"><%= Elements[i].symbol %></option> 
                  <% } %> 
                  
                  */
                  
                  }


                </select>
              </div>
              <div class="form-group col-sm-3">
                <label class="sr-only" for="range1">Range</label>
                <select class="form-control" name="range1" disabled="true">
                  <option>Range</option>
                  <option value="major">Major</option>
                  <option value="minor">Minor</option>
                  <option value="trace">Trace</option>
                </select>
              </div>
            </div>
            <div class="form-row mt-2" id="composition2" hidden="true">
              <div class="form-group col-md-1 offset-md-3">
                <label class="sr-only" for="element2_mod">Element modifier</label>
                <select class="form-control" name="element2_mod" title="Select whether to search for an element that appears in the data or not" disabled="true">
                  <option value="IN" default>IN</option>
                  <option value="NOT">NOT</option>
                </select>
              </div>
              <div class="form-group col-sm-3 element">
                <label class="sr-only" for="element2">element</label>
                <select class="form-control custom-select element" name="element2" multiple disabled="true">
                  <option disabled>Element</option>

                  {/*
                  <% for(var i=0; i < Elements.length; i++) { %>
                    <option value="<%= Elements[i].symbol.toLowerCase()%>"><%= Elements[i].symbol %></option> 
                  <% } %>
                  */}        
                  

                </select>
              </div>
              <div class="form-group col-sm-3">
                <label class="sr-only" for="range2">Range</label>
                <select class="form-control" name="range2" disabled="true">
                  <option>Range</option>
                  <option value="major">Major</option>
                  <option value="minor">Minor</option>
                  <option value="trace">Trace</option>
                </select>
              </div>
            </div>

            <div class="row mt-1">

              <div class=" col-md-2 offset-md-6 col-sm-3 offset-sm-6">
                <a class="btn btn-outline-light btn-block mt-2" id="reset-btn">Reset</a>
              </div>
              <div class="col-md-2 col-sm-3">
                <button class="btn btn-outline-warning btn-block mt-2">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>


          <div class="container-fluid p-0 pb-5" id="results">
      <table class="table table-striped table-bordered table-hover ">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Group</th>
            <th>Measurement Technique</th>
            <th>Major Elements (wt%)</th>
            <th>Minor Elements (ppm)</th>
            <th>Trace Elements (ppb)</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Pg.#</th> 
            <th>Journal</th> 
            <th>Volume</th>
            <th>Year Published</th> 
          </tr>
        </thead>
        <tbody>
          {(entryItems.length > 0) ? entryItems : <span>No entries</span>}
        </tbody>
      </table>
    </div>

      </div>
    );
  }
}

export default Database;
