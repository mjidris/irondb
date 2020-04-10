import React from "react";


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
        console.log("TEST");
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

    if (this.state.data != null) {
      for (const [index, value] of this.state.data.Users.entries()) {
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
          


    return (



  <div class='container-fluid'>
    <div class='container-fluid mt-4 mb-2'>
      <h1> Admin Panel</h1>
    </div>
    <div>
      <a href="/panel/analysis-technique/" class="badge badge-warning" id="new-at">Add New Analysis Technique</a>
    </div>

    <div class='container-fluid pt-3'>

   
      <div class="row">
        
        <div class="card col-md mr-2 pt-2">
          <div>
            <a class="btn btn-danger btn-large p-2 text-warning " href="../database/all" role="button"> <u>Database
                Entries
              </u>
              

                {(this.state.data != null)? <span class="h1 badge badge-light">{this.state.data.databaseCount}</span>
                : <span class="h1 badge badge-light">0</span>
                }
                 
                
           
            </a>
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

              {(paperItems != null)?paperItems:null}
                
                

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

                MORE ENTRIES BUTTON
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

       
        <div class="card col-md ml-md-2  mt-3 mt-md-0 pt-2">
          <div>
            <a class="btn btn-danger btn-large p-2 text-warning " href="../users" role="button"> <u>Manage
                Users</u>
            
              {(this.state.data != null)? <span class="h1 badge badge-light">{this.state.data.userCount}</span>
                : <span class="h1 badge badge-light">0</span>
                }
    
            </a>
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
      </div>


      <div class="row mt-2 mb-4 pb-4">
=
        <div class="card col-md mr-2 mt-2 pt-2">
          <div>
            <a class="btn btn-danger btn-large p-2 text-warning " href="../database/unapproved" role="button"> <u>Approval
                Needed</u>
              <span class="h1 badge badge-light">

              {(this.state.data != null)? <span class="h1 badge badge-light">{this.state.data.pendingCount}</span>
                : <span class="h1 badge badge-light">0</span>
                }
                
                </span>
            </a>
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

              {(pendingItems != null)?pendingItems:null}


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


          {/*
        <!-- </div> -->

        <!--Col 2-->
        <!--  Unimplemented due to timeline limitation -->
        <!-- <div class="card col-md ml-2 mt-2 pt-2">
          <div>
            <a class="btn btn-danger btn-large p-2 text-warning " href="../database/reported" role="button"><u>Reported
                Entries</u>
              <span class="badge badge-light">
                <% let fCount = flaggedCount <= 3 ? flaggedCount : "3+" %>
                <%= fCount %></span>
            </a>
          </div>
          <div>
            <table class="table table-stripd table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>Body</th>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Author(s)</th>
                </tr>
              </thead>
              <tbody class='table-light'>
                <% let flagged = (Flagged.length < 3 ? Flagged.length : 3) %>
                <% for(var i=0; i < flagged; i++) { %>
                <tr>
                  <th>
                    <%= Flagged[i].nomenclature %>
                  </th>
                  <th>
                    <%= Flagged[i].title %>
                  </th>
                  <th>
                    <%= Flagged[i].published_year %>
                  </th>
                  <th>
                    <%= Flagged[i].authors %>
                  </th>
                </tr>
                <% } %>
              </tbody>
            </table>
          </div>
          <% if (flaggedCount > 3) { %>
          <div class="text-right mt-auto">
            <a class="btn btn-danger btn-sm p-2 text-warning " href="../database/reported" role="button"> <u>View More
                Entries
              </u>
            </a>
          </div>
          <% } %>
        </div> -->

          */}
      </div>
    </div>
  </div>
  </div>
    );
  }
}

export default Panel;
