const calendar = require('./controllers/calendar');
const express = require("express");
const router = express.Router();


router.get('/calendar', calendar.getCalendarEvents);
router.get('/categories', calendar.getCategories);
router.get('/getTaskId', calendar.getCategories);
module.exports = router;