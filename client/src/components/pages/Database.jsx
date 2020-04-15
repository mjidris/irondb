import React from "react";
import {
  Redirect
} from "react-router-dom";



class Database extends React.Component {
  state = {
    message: null,
    edit: false,
    apiResponse: null,
    error: null,
    user_id: null
  };


  loadDatabase(event) {
    var payload = {
      username: this.state.username
    };

    fetch("/api/database", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ apiResponse: res });
        console.log("TEST");
        if (res !== undefined) {
          console.log("account request success");
          console.log(res);
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
    this.grabUserInfo();
  }

  render() {

    if (this.state.username === "") {
        return (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      }


    return (
      <div class="container-fluid mt-5 col-8 pb-4">
        <div class="card mt-5">
          <div class="container-fluid">
            <div class="pt-3 h1">
              <label>User: {this.state.username}</label>
            </div>

            {
              (this.state.passCheck === false) ? 
                  <div className="alert alert-danger alert-dismissible show"  id="reqs" role="alert">
                    <strong>Error:</strong> Password does not contain all necessary characters or length requirements!
                  </div>
              : (this.state.passCheck2 === false) ? 
                  <div className="alert alert-danger alert-dismissible show"  id="reqs" role="alert">
                      <strong>Error:</strong> Your passwords do not match!
                  </div>
             :""
            }

            { (this.state.error !== null && this.state.error !== "") 
                    ? <div className="alert alert-danger" role="alert" id="updateFail">
                            {this.state.error}
                        </div>
                    : null
                    }

            { (this.state.success === true) 
                    ? <div className="alert alert-success" role="alert" id="updateSuccess">
                            Changes successfully saved!
                        </div>
                    :  (this.state.success === false) ?
                       <div className="alert alert-danger" role="alert" id="updateFail">
                        An error occured!
                    </div>
                    : null
                    }

            {/* TODO: add action and method */}
            <form id="user-update-form">
              <div class="form-group">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  value={this.state.username}
                  readOnly
                />
              </div>
              <div class="form-row form-group">
                <div class="col">
                  <label>First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    placeholder={this.state.fname}
                    className={
                      (this.state.fnameCheck === null) ? "form-control" 
                      :(this.state.fnameCheck === true) ? "form-control border border-success"
                      :(this.state.fnameCheck === false) ? "form-control border border-danger"
                      : "form-control"
                    }
                    onChange = {(event) => this.changeName(event.target.value, "updated-fname")}
                    onBlur = {(event) => this.changeName(event.target.value, "fname")} 
                    readOnly={!this.state.edit}
                    required
                  />
                </div>
                <div class="col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    className={
                      (this.state.lnameCheck === null) ? "form-control" 
                      :(this.state.lnameCheck === true) ? "form-control border border-success"
                      :(this.state.lnameCheck === false) ? "form-control border border-danger"
                      : "form-control"
                    }
                    placeholder={this.state.lname}
                    onChange = {(event) => this.changeName(event.target.value, "updated-lname")}
                    onBlur = {(event) => this.changeName(event.target.value, "lname")} 
                    readOnly={!this.state.edit}
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className={
                    (this.state.emailCheck === null) ? "form-control" 
                    :(this.state.emailCheck === true) ? "form-control border border-success"
                    :(this.state.emailCheck === false) ? "form-control border border-danger"
                    : "form-control"
                  }
                  id="email"
                  placeholder={this.state.email}
                  onChange = {(event) => this.validateEmail(event.target.value, false)} 
                  onBlur = {(event) => this.validateEmail(event.target.value, true)} 
                  readOnly={!this.state.edit}
                />
              </div>
              <div class="form-group">
                <label>Role</label>
                <input
                  type="text"
                  class="form-control"
                  id="role"
                  value={this.state.role}
                  readOnly
                />
              </div>

              <div class="form-group">
                <label id="passwordLabel">Password</label>
                <input
                  type="password"
                  className={
                    (this.state.passCheck === null) ? "form-control" 
                    :(this.state.passCheck === true) ? "form-control border border-success"
                    :(this.state.passCheck === false) ? "form-control border border-danger"
                    : "form-control"
                  }
                  id="password"
                  placeholder="************"
                  onChange={(event) => this.validatePassword(event.target.value,false)}
                  onBlur={(event) => this.validatePassword(event.target.value,true)}
                  readOnly={!this.state.edit}
                />
              </div>
              {this.state.editingPassword ? (
                <div class="form-group">
                <label id="passwordLabel">Confirm Password</label>
                <input
                  type="password"
                  className={
                    (this.state.passCheck2 === null) ? "form-control" 
                    :(this.state.passCheck2 === true) ? "form-control border border-success"
                    :(this.state.passCheck2 === false) ? "form-control border border-danger"
                    : "form-control"
                  }
                  id="passwordConfirm"
                  onBlur={(event) => this.confirmPassword(event.target.value)}
                  
                />
              </div>                

              )
              :null}

              {!this.state.edit ? (
                <div class="text-right form-group pb-2">
                  <button
                    class="btn btn-warning"
                    type="button"
                    id="update-btn"
                    onClick={() => this.edit()}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="text-right form-group pb-2">
                  <button
                    className="btn btn-danger mr-1"
                    type="reset"
                    id="cancel-btn"

                    onClick={() => this.cancel()}
                  >
                    Cancel
                  </button>

                  <button
                    class="btn btn-warning"
                    type="button"
                    id="update-btn"

                    disabled= { (this.state.error !== null && this.state.error !== "") 
                    ? true: false
                    }

                    onClick={() => this.save()}
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Database;
