import React from "react";
import '../styles/Panel.scss';
import { Link } from "react-router-dom";

class Panel extends React.Component {
  state = {
    message: null,
    username: "Username",
    user_id: null,
    data: null
  };

  updateData() {
    var payload = {
      username: this.state.username,
      first_name: this.state.fname,
      last_name: this.state.lname,
      password: this.state.password,
      email: this.state.email,
      user_id: this.state.user_id
    };

    fetch("/api/panel/request", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res });

        if (res !== undefined) {
          console.log("info update success");
          console.log(this.state.data);
        } else {
          console.log("info update failed");
          console.log(this.state.data);
        }
      });
  }

  grabUserInfo(event) {
    var payload = {
      username: this.state.username
    };

    fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ apiResponse: res });
        console.log("TEST");
        if (res !== undefined) {
          console.log("account request success");
          console.log(this.state.apiResponse);
          //Let's set the user data now
          this.setState({ username: res.User.username });
          this.setState({ fname: res.User.first_name });
          this.setState({ lname: res.User.last_name });
          this.setState({ email: res.User.email_address });
          this.setState({ role: res.User.role_of });
          this.setState({ user_id: res.User.user_id });
        } else {
          console.log("account request failed");
          console.log(this.state.apiResponse);
        }
      });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {

    let userItems =  [];

    if (this.state.data != null && this.state.data.isAdmin === true) {
      for (const [index, value] of this.state.data.Users.entries()) {
        if (this.state.data.Users[index].username !== "dummy")
        userItems.push(
          <tr>
          <th>
            {this.state.data.Users[index].user_id}
          </th>
          <th>
          {this.state.data.Users[index].username}
          </th>
          <th>
          {this.state.data.Users[index].role_of}
          </th>
         </tr>        
        
        )
      }
    }

    let paperItems =  [];

    if (this.state.data != null && this.state.data.Database!=null) {
      for (const [index, value] of this.state.data.Database.entries()) {
        paperItems.push(
          <tr>
          <th>
            {this.state.data.Database[index].paper_id}
          </th>
          <th>
          {this.state.data.Database[index].title}
          </th>
          <th>
          {this.state.data.Database[index].published_year}
          </th>
          <th>
          {this.state.data.Database[index].authors}
          </th>
         </tr>        
        
        )
      }
    }
    

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

    let ownItems =  [];

    if (this.state.data != null && this.state.data.OwnEntries!=null) {
      for (const [index, value] of this.state.data.OwnEntries.entries()) {
        ownItems.push(
          <tr>
          <th>
            {this.state.data.OwnEntries[index].paper_id}
          </th>
          <th>
          {this.state.data.OwnEntries[index].title}
          </th>
          <th>
          {this.state.data.OwnEntries[index].submission_date}
          </th>
          <th>
          {this.state.data.OwnEntries[index].submitted_by}
          </th>
         </tr>        
        
        )
      }
    }
          


    return (



  <div class='container-fluid'>
    <div class="row col-12">
    <div class=' mb-2 col-9'>
    <h2> <i class="fas fa-sliders-h"></i> {(this.state.data!=null && this.state.data.isAdmin)?<span>Admin</span>:<span>User</span>} Panel</h2>
    </div>  

    <div class=" mb-2 col-3">
      {(this.state.data!=null && this.state.data.isAdmin)?
          <Link to="/panel/analysis-technique/" class="btn btn-warning btn-sm" id="new-at"><i class="fas fa-cogs"></i> Add Analysis Technique</Link>
      :null}
      </div>

    </div>
    

    <div class='container-fluid pt-3'>

   
      <div class="row">
        
        <div class="card col-md mr-2 pt-2">
          <div>
            <Link class="btn btn-project btn-sm p-2 text-warning " to="../database/all" role="button"><i class="far fa-copy"></i> Database
                Entries
              
              

                {(this.state.data != null)? <span class="h1 badge badge-light btn-badge">{this.state.data.databaseCount}</span>
                : null
                }
                 
                
           
            </Link>
          </div>
          <div>
            <table class="table table-stripd table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>Paper Id</th>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Authors</th>
                </tr>
              </thead>
              <tbody class='table-light'>

              {(paperItems != null && paperItems.length>0) ?paperItems:
              
              <tr class="blank-spacer">
             
              <td colspan="4" class="text-center"><i class="far fa-times-circle"></i> No Papers</td>
       
            </tr>
              
              }
                
                

                {
                  
                /*
                <% let db = (Database.length < 3 ? Database.length : 3) %>
                <% for(var i=0; i < db; i++) { %>

                <tr>
                  <th>
                    <%= Database[i].paper_id %>
                  </th>
                  <th>
                    <%= Database[i].title %>
                  </th>
                  <th>
                    <%= Database[i].published_year %>
                  </th>
                  <th>
                    <%= Database[i].authors %>
                  </th>
                </tr>
                <% } %>

                */}

              </tbody>
            </table>
          </div>

        {/*}
          <% if (databaseCount > 3) { %>
          <div class="text-right mt-auto">
            <a class="btn btn-danger btn-sm p-2 text-warning " href="../database/all" role="button"> <u>More Entries
              </u>
            </a>
          </div>
          <% } %>
        */}       

        </div>

        {(this.state.data!=null && this.state.data.isAdmin)?
        <div class="card col-md ml-md-2  mt-3 mt-md-0 pt-2">
          <div>
            <Link class="btn btn-project btn-sm p-2 text-warning " to="../users"><i class="fas fa-users"></i> Manage
                Users
            
              {(this.state.data != null)? <span class="h1 badge badge-light btn-badge">{this.state.data.userCount-1}</span>
                : null
                }
    
            </Link>
          </div>
          <div>
            <table class="table table-stripd table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>User Id</th>
                  <th>Username</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody class='table-light'>
                {(userItems != null)?userItems:null}
                
                {
                
                
                
                /*


                <% let user = (Users.length < 3 ? Users.length : 3) %>
                <% for(var i=0; i < user; i++) { %>
                <tr>
                  <th>
                    <%= Users[i].user_id %>
                  </th>
                  <th>
                    <%= Users[i].username %>
                  </th>
                  <th>
                    <%= Users[i].role_of %>
                  </th>
                </tr>
                <% } %>
                */}

              </tbody>
            </table>
          </div>

          {/*
          <% if (userCount > 3) { %>
          <div class="text-right mt-auto">
            <a class="btn btn-danger btn-sm p-2 text-warning " href="../users" role="button"> <u>More Users
              </u>
            </a>
          </div>
          <% } %>

          */}
        </div>
      :null}


      </div>




      <div class="row mt-2">

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

          {/*
          <% if (pendingCount > 3) { %>
          <div class="text-right mt-auto">
            <a class="btn btn-danger btn-sm p-2 text-warning " href="../database/unapproved" role="button"> <u>View
                More
                Entries
              </u>
            </a>
          </div>
          <% } %>
          */}


      </div>
    </div>


    <div class="row mt-2 mb-4 pb-4">

        <div class="card col-md mr-2 mt-2 pt-2">
          <div>
            <Link class="btn btn-project btn-sm p-2 text-warning " to="../own"><i class="far fa-check-circle"></i> Your Entries
         
              {(this.state.data != null)? <span class="h1 badge badge-light btn-badge">{this.state.data.ownCount}</span>
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
             
                <td colspan="4" class="text-center mt-3"><i class="fas fa-check"></i> You have no Entries</td>
         
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

          {/*
          <% if (pendingCount > 3) { %>
          <div class="text-right mt-auto">
            <a class="btn btn-danger btn-sm p-2 text-warning " href="../database/unapproved" role="button"> <u>View
                More
                Entries
              </u>
            </a>
          </div>
          <% } %>
          */}


      </div>
    </div>
  






  </div>
  </div>
    );
  }
}

export default Panel;
