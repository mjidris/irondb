const createError = require('http-errors');
const db = require('../db');
const ejsUnitConversion = require('../utils/ejs-unit-conversion');
const fs = require('fs');
const {isLoggedIn, isAdmin} = require('../middleware/auth');
const json2csv = require('json2csv').parse;
const path = require('path');
const Router = require('express-promise-router');
const router = new Router();


const singleBodyRouter = require('./database/meteorite');
router.use('/meteorite', singleBodyRouter);

/* GET database page. */
router.get('/', async (req, res, next) => {
  let resObj = [];
  try {
    const Entries = db.aQuery('SELECT * FROM complete_table', []);
    resObj = await Promise.all([Entries]);
  } catch (err) {
    next(createError(500));
  } finally {
    res.send({
      Entries: resObj[0].rows,
    });
  }
});

/* GET /database/unapproved */
router.get('/unapproved', isLoggedIn, async function(req, res, next) {
  let resObj = [];
  try {
    const Entries = db.aQuery(
        'SELECT DISTINCT ON (paper_id) * FROM pending_entries_panel',
        []
    );
    resObj = await Promise.all([Entries]);
  } catch (err) {
    next(createError(500));
  } finally {
    res.render('db-unapproved', {
      Entries: resObj[0].rows,
    });
  }
});

/* GET /database/all */
router.get('/all', isAdmin, async (req, res, next) => {
  let resObj = [];
  try {
    const Entries = db.aQuery('SELECT * FROM all_papers_with_authors', []);
    resObj = await Promise.all([Entries]);
  } catch (err) {
    next(createError(500));
  } finally {
    res.render('all-entries', {Entries: resObj[0].rows});
  }
});

/* GET /database/own */
router.get('/own', isLoggedIn, async (req, res, next) => {
  let resObj = [];
  try {
    const Entries = db.aQuery(
        'SELECT * FROM all_papers_with_authors WHERE submitted_by = $1',
        [req.user.username]
    );
    resObj = await Promise.all([Entries]);
  } catch (err) {
    next(createError(500));
  } finally {
    res.render('own-entries', {Entries: resObj[0].rows});
  }
});

module.exports = router;


