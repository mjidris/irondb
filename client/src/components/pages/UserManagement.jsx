import React from "react";
import '../styles/User-Management.scss';
import { Link } from "react-router-dom";

class UserManagement extends React.Component {
  state = {
    message: null,
    username: "Username",
    user_id: null,
    data: null
  };

  /* eslint-disable no-invalid-this */

/**
 * @description search functionality
 */
$(document).ready(function() {
  $('#search').on('keyup', function() {
    const value = $(this).val().toLowerCase();
    $('#tbl tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

/**
 * @description toggle on and off confirm changes button
 */
$(document).on('change', function() {
  if (data.length > 0) {
    $('#confirm').prop('disabled', false);
  } else {
    $('#confirm').prop('disabled', true);
  }
});

const data = [];

/**
 * @description get the ID of the user and new role for any changed dropdowns.
 * Display alert if new role is not equal to previous role and add to data that
 * will be sent to server.
 */
$(document).ready(function() {
  $('td').change(function() {
    const userID = $(this).closest('tr').find('td:first').text().trim();
    // eslint-disable-next-line max-len
    const newRole = $(this).closest('tr').find('#user-role :selected').text().trim();
    // eslint-disable-next-line max-len
    const currentRole = $(this).closest('tr').find('#current-role').text().trim();
    console.log(userID);
    console.log(newRole);

    let pos = 0;
    // Check that role doesn't equal previous role and it's not empty
    if (newRole != '') {
      let exists = false;
      let count = 0;

      // iterate through all existing objects
      for (let i = 0; i < data.length; i++) {
        if (data[i].user == userID) {
          exists = true;
          count = i;
          pos = count;
          break;
        }
      } if (!exists) {
        if (currentRole != newRole) {
          // push to array only if it doesn't exist
          data.push({'user': userID, 'current': currentRole, 'role': newRole});
        }
      } else {
        if (currentRole != newRole) {
          // if it exists then update the newRole and do not push
          data[count].role = newRole;
        } else {
          // if current is new role then remove from array
          data.splice(count, 1);
        }
      }
    } else {
      data.splice(pos, 1);
    }
  });
});

/**
 * Send stuff
 * @param {*} jsonString
 */
async function postData(jsonString) {
  await $.ajax({
    url: '/users/update',
    type: 'POST',
    data: jsonString,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    success: function(data, status, jqXHR) {
      console.log();
      return true;
    },
    error: function(jqXHR, status) {
      return false;
    },
  });
}

/**
 * @description submit form
 */
$(document).ready(async function() {
  $('#user-update-form').submit(async function(event) {
    event.preventDefault();
    let str = 'Making the following changes: \n';
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line max-len
      str += `user ${data[i].user} from ${data[i].current} to ${data[i].role} \n`;
    }
    alert(str);
    const jsonData = JSON.stringify(data);
    await postData(jsonData);
    window.location.reload();
  });
});



  getData() {
    var payload = {
      username: this.state.username,
      first_name: this.state.fname,
      last_name: this.state.lname,
      password: this.state.password,
      email: this.state.email,
      user_id: this.state.user_id
    };

    fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res });

        if (res !== undefined) {
          console.log("user data success");
          console.log(this.state.data);
        } else {
          console.log("user data failed");
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
    this.getData();
  }

  render() {

    let userItems =  [];

    if (this.state.data != null) {
      for (const [index, value] of this.state.data.Users.entries()) {
        if (this.state.data.Users[index].username !== "dummy")
        userItems.push(

          <tr>

            <td>
              {this.state.data.Users[index].user_id}
            </td>

            <td>
              {this.state.data.Users[index].username}
            </td>

            <td>
              {this.state.data.Users[index].first_name}
            </td>

            <td>
              {this.state.data.Users[index].last_name}
            </td>

            <td>
              {this.state.data.Users[index].email_address}
            </td>

            <td id='current-role'>
              {this.state.data.Users[index].role_of}
            </td>


          <td id='user-role'>
            <div class="form-group">
              <label class="sr-only" for="role">Role</label>
              <select class="form-control" name="role" id="role">
                <option selected></option>
                <option value="admin">admin</option>
                <option value="data-entry">data-entry</option>
                <option value="user">user</option>
              </select>
            </div>
          </td>
        </tr>   
        
        )
      }
    }

        

    return (

    <div class='container-fluid'>
      <div class="row col-12">

        <div class=''>
          <h2> <i class="fas fa-sliders-h"></i> User Management{(this.state.data != null)?<span class="h1 badge badge-light btn-badge"> {this.state.data.userCount-1} <i class="fas fa-users"> </i></span>:<span class="h1 badge badge-light"> loading</span>} </h2>
        </div>  

      </div>
        <div class="card col-md mr-2 mt-2 pt-2">
          <div>
          <div class='float-right input-group searchBox'>
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-search"> </i></span>
                </div>
                <input type="text" class="form-control" id="search" placeholder="Search for user" />
          </div>
        <div>
        <table class="table table-stripd table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change To:</th>
            </tr>
          </thead>
          <tbody class='table-light' id='tbl'>
          {(userItems != null)?userItems:null}
          </tbody>
        </table>
        </div>

        </div>
      </div>
      <Link class="btn btn-project btn-sm p-2 text-warning mt-3" to="/panel">
      <i class="fas fa-arrow-circle-left"></i>  Back
      </Link>
    </div>

      
    
    );
  }
}

export default UserManagement;
