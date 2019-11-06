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
  it('creates a test user', async (done) => {
    console.log(JSON.stringify(user));
    await request(app)
        .post('/register/new-user')
        .send(user)
        .set('Accept', 'application/json; charset=utf-8')
        .expect(200);
        done()
  });
});


describe('Grab a login token', function() {
  it('logs in as test user', () => {
    request(app)
        .post('/login')
        .send({
          username: user.username,
          password: user.password
        })

        .expect(200)
        .then(res => {
          console.log(res.header);
            cookie = res
            .headers['set-cookie'];
            console.log(cookie);
            expect(res.status).toEqual(200);
        });
  });
});

    try {
      db.aQuery('DELETE FROM users WHERE username = $1', ['test']);
    } catch (e) {
      db.aQuery('ROLLBACK');
      console.log(e);
    } try {
      db.aQuery('DELETE FROM user_info WHERE first_name = $1', ['test']);
    } catch (e) {
      db.aQuery('ROLLBACK');
    }
   


