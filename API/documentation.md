# **API Reference**
***********************
## Part 1: Endpoints
## All endpoints:
- `/api/`
- `/api/database`
- `/api/database/unapproved`
- `/api/database/all`
- `/api/database/own`
- `/api/help`
- `/api/register`
- `/api/register/new-user`
- `/api/login`
- `api/logout`
*** DataEntry endpoints not included
#
### Index
##### Returns the homepage.
- *Method:* `GET`
- *Complete URL:* `/api/`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/ HTTP/1.1
Host: <hostname>
`
- *Example Response:*
`
<!DOCTYPE html>
<html> ... </html>
`
- *Error Codes:* **500**
#
### Database
##### Returns a JSON object of all approved entries in the database. 
- *Method:* `GET`
- *Complete URL:* `/api/database`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/database/ HTTP/1.1
Host: <hostname>
`
- *Example Response:*
`
{ "Entries": [ {<entryObj>},{<entryObj>} ] }
`
 **<entryObj>** is explained in Part 2.
- *Error Codes:* **500**
#
### Unapproved
##### Returns a page with all unapproved database entries.
- *Method:* `GET`
- *Complete URL:* `/api/database/unapproved`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/database/unapproved HTTP/1.1
Host: <hostname>
`
- *Example Response:*
`
<!DOCTYPE html>
<html> ... </html>
`
- *Error Codes:* **500**
#
### All
##### Returns a page with all of the database entries.
- *Method:* `GET`
- *Complete URL:* `/api/database/all`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/database/all HTTP/1.1
Host: <hostname>
`
- *Example Response:*
`
<!DOCTYPE html>
<html> ... </html>
`
- *Error Codes:* **500**
#
### Own
##### Returns a page with all of the database entries submitted by the user.
- *Method:* `GET`
- *Complete URL:* `/api/database/own`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/database/own HTTP/1.1
Host: <hostname>
`
- *Example Response:*
`
<!DOCTYPE html>
<html> ... </html>
`
- *Error Codes:* **500**
 #
### Help
##### GET help page
- *Method:* `GET`
- *Complete URL:* `/api/help`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/help HTTP/1.1
Host: <hostname>
`
- *Example Response:* 
`
<!DOCTYPE html>
<html> ... </html>
`
- *Error Codes:* **500**
#
### Register
##### GET register page.
- *Method:* `GET`
- *Complete URL:* `/api/register`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/register? HTTP/1.1
Host: localhost:8001
`
- *Example Response:*
`<!DOCTYPE html>
<html> ... </html>`
- *Error Codes:* **400 - Bad request**, **500**
#
##### Register a new user
- *Method:* `POST`
- *Complete URL:* `/api/register`
- *Parameters:* **None**
- *Example Request:*
```
POST /api/register? HTTP/1.1
Host: localhost:8001`
Content-Type: application/json
{   "username": "user", 
    "password": "pass", 
    "fname": "First", 
    "lname":"Last, 
    "email": "email@email.com"  }
```
- *Example Response:*
```
{   "isRegistered": true, 
    "message": 'User Registration Successful!'  }
```
or
```
{   isRegistered: false, 
    message: "Username is already in use!"  }
```
- *Error Codes:* **401 - Unauthorized**, **500**
#
### Login
##### Returns a JSON object with the user's login status. 
- *Method:* `GET`
- *Complete URL:* `/api/login`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/login HTTP/1.1
Host: <hostname>
`
- *Example Response:*
```
{   "isSignedIn":false,
    "Alert":"",
    "AlertType":""  }
```
- *Error Codes:* **500**
#
### Logout
##### Returns an html page with logout confirmation. 
- *Method:* `GET`
- *Complete URL:* `/api/logout`
- *Parameters:* **None**
- *Example Request:*
`
GET /api/logout HTTP/1.1
Host: <hostname>
`
- *Example Response:*
`
<!DOCTYPE html>
<html> ... </html>
`
- *Error Codes:* **500**
#

## Part 2: Objects
### <entryObj>
1. **Required**
-- name
-- title
-- author
-- group
2. **Optional**
-- journal_name
-- volume
-- page_number
-- pub_year
-- pub_yr_sign
-- element0
-- element1
-- element2
-- range0
-- range1
-- range2
