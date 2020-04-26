import React from "react";
import '../styles/User-Management.scss';
import { Link } from "react-router-dom";

const data = [];

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

    if (this.state.data != null && this.state.data.Pending!=null) {
      for (const [index, value] of this.state.data.Pending.entries()) {
        pendingItems.push(
          <tr>
          <th>
            {this.state.data.Pending[index].paper_id}
          </th>
          <th>
          {this.state.data.Pending[index].title}
          </th>
          <th>
          {this.state.data.Pending[index].submission_date}
          </th>
          <th>
          {this.state.data.Pending[index].submitted_by}
          </th>
         </tr>        
        
        )
      }
    }

      

    return (

        <div class="row mt-2 col-12 mb-4 pb-4">

        <div class="card col-md mr-2 mt-2 pt-2">
          <div>
            <Link class="btn btn-project btn-sm p-2 text-warning " to="../database/unapproved"><i class="far fa-check-circle"></i> Approval
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
                </tr>
              </thead>
              <tbody class='table-light'>

              {(pendingItems != null && pendingItems.length>0)?pendingItems:
              
              <tr class="blank-spacer">
             
                <td colspan="4" class="text-center mt-3"><i class="fas fa-check"></i> No Pending Entries</td>
         
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
          </div>

      
    
    );
  }
}

export default UserManagement;
