const calendar = require('./controllers/calendar');
const express = require("express");
const router = express.Router();


router.get('/calendar', calendar.getCalendarEvents);
module.exports = router;