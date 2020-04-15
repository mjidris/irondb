# **API Reference**
***********************

## Endpoints
- *Method:*
- *Complete URL:*
- *Parameters:*
- *Example Request:*
- *Example Response:*
- *Error Codes:*

### Index
Returns the homepage.
- *Method:* GET
- *Complete URL:* /
- *Parameters:* None
- *Example Request:*
- *Example Response:*
- *Error Codes:* 500

### Database
Returns a page with the entire meteorite database.
- *Method:* GET
- *Complete URL:* /database
- *Parameters:* None
- *Example Request:*
- *Example Response:*
- *Error Codes:* 500

Returns a page with a subset of the database according to the search parameters
entered on the webpage.
- *Method:* POST
- *Complete URL:* /database
- *Parameters:*
*Required*
1. name
2. title
3. author
4. group
*Optional*
5. journal_name
6. volume
7. page_number
8. pub_year
9. pub_yr_sign
10. element0
11. element1
12. element2
13. range0
14. range1
15. range2
- *Example Request:*
- *Example Response:*
- *Error Codes:* 500

Returns get export

returns post export
