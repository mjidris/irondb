// const createError = require('http-errors');
// const pg = require('../../db');
const parser = require('../../db/entry-parser');
const inserter = require('../../db/insert-entry');
const Router = require('express-promise-router');
const router = new Router();

router.post('/', async (req, res, next) => {
  const reqBody = req.body;
  const username = req.user.username;

  /* Get Keys */
  // Get an array of the keys, needed for filtering
  const keys = parser.getKeys(reqBody);

  // Singular objects
  const journal = parser.getJournal(reqBody);
  const paper = parser.getPaper(reqBody);
  // Arrays of objects
  const authors = parser.getAuthors(reqBody, keys);
  const bodies = parser.getBodies(reqBody, keys);
  const notes = parser.getNotes(reqBody, keys);

  // Insert the entry as pending
  await inserter.insertEntry(
      journal, paper, authors, bodies, notes, username, 'pending'
  );

  // Redirect to panel when done
  res.redirect('/panel');
});

module.exports = router;