import React from "react";
import '../styles/User-Management.scss';
import { Link } from "react-router-dom";

class UserManagement extends React.Component {

  state = {
    message: null,
    username: "Username",
    user_id: null,
    data: null,
    apiResponse: null
  };

  constructor(props) {
    super(props)

  }


  getUnapprovedEntries() {

    fetch("/api/database/own", {
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

    //Create an array of items for the tables based on json return
    let ownItems =  [];
    if (this.state.data != null && this.state.data.Entries!=null) {
      for (const [index, value] of this.state.data.Entries.entries()) {
        ownItems.push(
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
         </tr>        
        
        )
      }
    }

      

    return (

        <div class="row mt-2 col-12 mb-4 pb-4">
            <div class="row col-12">

            <div>
              <h2> <i class="fas fa-sliders-h"></i> Your Entries</h2>
            </div>  

            </div>
 
        <div class="card col-md mr-2 mt-2 pt-2">
          <div>
            <Link class="btn btn-project btn-sm p-2 text-warning " to="../own"><i class="far fa-check-circle"></i> Your
                Entries
         
              {(this.state.data != null)? <span class="h1 badge badge-light btn-badge">{ownItems.length}</span>
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
                </tr>
              </thead>
              <tbody class='table-light'>

              {(ownItems != null && ownItems.length>0)?ownItems:
              
              <tr class="blank-spacer">
             
                <td colspan="4" class="text-center mt-3"><i class="fas fa-check"></i> You have no entries</td>
         
              </tr>
              
              }


                {/*
                <% let pending = (Pending.length < 3 ? Pending.length : 3) %>
                <% for(var i=0; i < pending; i++) { %>
                <tr>
                  <th>
                    <%= Pending[i].paper_id %>
                  </th>
                  <th>
                    <%= Pending[i].title %>
                  </th>
                  <th>
                    <%= Pending[i].submission_date %>
                  </th>
                  <th>
                    <%= Pending[i].submitted_by %>
                  </th>
                </tr>
                <% } %>
                */}
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
}

export default UserManagement;
