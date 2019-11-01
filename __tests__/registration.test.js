const request = require('supertest');
const app = require('../controller/app');
const db = require('../controller/db');


const user = {
    'first_name': 'test',
    'last_name': 'test',
    'username': 'test',
    'email': 'test@test.com',
    'password': 'test',
    'user_id': '99999',
  };


describe('Testing user registration', function() {
    it('creates a test user',  () =>  {

         request(app)
        .post('/register/new-user')
        .set('Accept', 'application/json')
        .send(user)
        .expect(200);

        
        try {
    
             db.aQuery('DELETE FROM users WHERE username = $1',["test"]);
          
          } catch (e) {
             db.aQuery('ROLLBACK');
             console.log(e);
            next(createError(500));
          } try {
             
             db.aQuery('DELETE FROM user_info WHERE first_name = $1',["test"]);
          
          } catch (e) {
             db.aQuery('ROLLBACK');
            next(createError(500));
          } 

    });
  });


