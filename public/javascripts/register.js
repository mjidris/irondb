// Data struct for user
const data = {
  'first_name': '',
  'last_name': '',
  'username': '',
  'email': '',
  'password': '',
};


// eslint-disable-next-line max-len
// Delay ajax calls for ms until user stops typing to prevent spamming of requests
function delay(callback, ms) {
  var timer = 0;
  return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
          callback.apply(context, args);
      }, ms || 0);
  };
}



$(document).ready(function() {
    // Live check for duplicate username after 500ms
    $('#username').on('keyup',delay(function(){
      if ($('#username').val().length >= 6) {
      $('#name').hide();
      checkUser().then(async (usernameExists) => {
          if (usernameExists) {
            $('#exists').show();
          }
          else {
            $('#exists').hide();
          }
        })
      } else {
        $('#exists').hide();
      }
    },500));

  // Live check for duplicate email after 500ms
  $('#email-address').on('keydown',delay(function(){
    if ($('#email-address').val().length >= 7) {
      $('#name').hide();
      getEmails().then(async (emailExists) => {
        if (emailExists) {
          $('#emails').show();
        }
        else {
          $('#emails').hide();
        }
      })
    } else {
    $('#emails').hide();
    }
  },500));
});

/**
 * @description Validate password and enable save button
 * @return {boolean}
 */
function validatePassword() {
  $(':password').on('keyup', function() {
    const pwd = $('#pwd').val();
    const cnfm = $('#confirm').val();

    // eslint-disable-next-line max-len
    // validate passwords match and have at least 1 lowercase, 1 uppercase and 1 number
    if (pwd == cnfm) {
      if (pwd.length >= 8) {
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasLowerCase = /[a-z]/.test(pwd);
        const hasNumbers = /\d/.test(pwd);

        if (hasUpperCase && hasLowerCase && hasNumbers) {
          console.log('GOOD PASSWORDS');
          return true;
        }
      }
    }
  });
  return false;
}

$(document).ready(function() {
  validatePassword();
});

/**
 * @description submit information
 */
$(document).ready(async function() {
  $('#register-form').submit(async function(event) {
    event.preventDefault();
    console.log(validatePassword());
    console.log(alreadyExists());
    const username = $('#username').val();
    getEmails().then(async (emailExists) => {
      checkUser().then(async (usernameExists) => {
        console.log('email exists?', emailExists);
        if (emailExists === false && usernameExists === false) {
          if (!alreadyExists(username)) {
            const pwd = $('#pwd').val();
            const cnfm = $('#confirm').val();

            // eslint-disable-next-line max-len
            // validate passwords match and have at least 1 lowercase, 1 uppercase and 1 number
            if (pwd == cnfm) {
              if (pwd.length >= 8) {
                const hasUpperCase = /[A-Z]/.test(pwd);
                const hasLowerCase = /[a-z]/.test(pwd);
                const hasNumbers = /\d/.test(pwd);

                if (hasUpperCase && hasLowerCase && hasNumbers) {
                  console.log('GOOD PASSWORDS');
                  data.first_name = $('#fname').val();
                  data.last_name = $('#lname').val();
                  data.username = $('#username').val();
                  data.email = $('#email-address').val();
                  data.password = $('#pwd').val();
                  await postData(JSON.stringify(data));
                  window.location.replace('/login');
                } else {
                  $('#length').attr('hidden', true);
                  $('#reqs').attr('hidden', false);
                  $('#mismatch').attr('hidden', true);
                }
              } else {
                $('#length').attr('hidden', false);
                $('#reqs').attr('hidden', true);
                $('#mismatch').attr('hidden', true);
              }
            } else {
              $('#length').attr('hidden', true);
              $('#reqs').attr('hidden', true);
              $('#mismatch').attr('hidden', false);
            }
          } else {
            $('#name').attr('hidden', false);
            $('#exists').attr('hidden', true);
          }
        } else if (emailExists === 'error') {
          console.log('error retrieving emailExists');
        } else {
          $('#emails').attr('hidden', false);
        }
      });
    });
  });
});


/**
 * @description ask the server if email already exists
 * @param  {any} callback
 * @return {any} returns boolean if success, and 'error' if fail
 */
async function getEmails(callback) {
  const email = $('#email-address').val();
  let ret;
  await $.ajax({
    url: `/register/${email}`,
    type: 'GET',
    async: true,
    success: function(data, status, jqXHR) {
      // console.log('the data.result is ', data.result);
      ret = data.result;
      // return data.result;
    },
    error: function() {
      // ret = 'error';
      return 'error';
    },
  });
  return ret;
}

/**
 * @description ask the server if username already exists
 * @param  {any} callback
 * @return {any} returns boolean if success
 */
async function checkUser(callback) {
  const user = $('#username').val();
  let ret;
  await $.ajax({
    url: `/register/user/${user}`,
    type: 'GET',
    async: true,
    success: function(data, status, jqXHR) {
      // console.log('the data.result is ', data.result);
      ret = data.result;
      // return data.result;
    },
    error: function() {
      // ret = 'error';
      return 'error';
    },
  });
  return ret;
}



/**
 * Send data to server
 * @param {*} jsonString
 */
async function postData(jsonString) {
  await $.ajax({
    url: '/register/new-user',
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
