const { google } = require('googleapis');
const moment = require('moment');
const extractUrls = require("extract-urls");
const url = require('url');
const _ = require('lodash');
var axios = require('axios');
const fs = require('fs');
var qs = require('qs');


module.exports.getCalendarEvents = async (req, res) => {
  try {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), listEvents);
    });

    function authorize(credentials, callback) {
      const { client_secret, client_id, redirect_uris } = credentials.web;
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
      let payload = {
        access_token: req.headers.authorization.replace('Bearer ', '')
      }
      oAuth2Client.setCredentials(payload);
      callback(oAuth2Client);
    }

    async function listEvents(auth) {
      let wrikeTask = []
      let nonWrikeTask = []
      let startDay = moment().startOf('week').toISOString();
      let endDay = moment().endOf('week').toISOString();
      const calendar = google.calendar({ version: 'v3', auth });
      calendar.events.list({
        calendarId: 'primary',
        timeMin: req.query.start ? req.query.start : startDay,
        timeMax: req.query.end ? req.query.end : endDay,
        // maxResults: 9,
        singleEvents: true,
        orderBy: 'startTime',
      }, async (error, response) => {
        if (error) return res.status(400).send({ error: 'The API returned an error: ' + error });
        const events = response.data.items;
        if (events.length) {
          console.log('Upcoming 10 events:');
          await asyncForEach(events, async (event, index) => {
            if (event.summary.toLowerCase() != 'lunch') {
              console.log("event.description....", event.description);

              const start = event.start.dateTime || event.start.date;
              const end = event.end.dateTime || event.end.date;
              let duration = moment.duration(moment(end).diff(moment(start))).asHours();

              if (event.description && extractUrls(event.description)) {
                await asyncForEach(extractUrls(event.description), async (isWrike, index) => {
                  if (isWrike.indexOf('wrike') != -1) {
                    var wrike = url.parse(isWrike, true).query;

                    let taskId = wrike && wrike.id ? await getTaskId(wrike.id) : ''
                    if (taskId) {
                      wrikeTask.push({
                        permalink: wrike.id,
                        title: event.summary,
                        date: start,
                        id: taskId,
                        duration
                      })
                    }
                  }
                })
              } else {
                nonWrikeTask.push({
                  permalink: '',
                  title: event.summary,
                  date: start,
                  duration
                })
              }
            }
          });
          return res.status(200).send({ wrikeTask: _.uniqBy(wrikeTask, 'id'), nonWrikeTask });
        } else {
          return res.status(400).send({ err: 'No upcoming events found.' });
        }
      });
    }
  } catch (err) {
    res.status(200).send(err)
  }
};


module.exports.getCategories = async (req, res) => {
  var config = {
    method: 'get',
    url: 'https://www.wrike.com/api/v4/timelog_categories',
    headers: {
      'Authorization': 'Bearer eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjIxODUxODcsXCJpXCI6ODMxNTQ0NixcImNcIjo0NjM0MjIzLFwidVwiOjUxMjMxNjEsXCJyXCI6XCJVU1wiLFwic1wiOltcIldcIixcIkZcIixcIklcIixcIlVcIixcIktcIixcIkNcIixcIkRcIixcIk1cIixcIkFcIixcIkxcIixcIlBcIl0sXCJ6XCI6W10sXCJ0XCI6MH0iLCJpYXQiOjE2NTg5OTk0MjB9.w7PkYqVrnmdXEN0HsGyFd93W1YmnElfKT8ztDMexKm0'
    }
  };

  axios(config)
    .then(function (response) {
      res.status(200).send(response.data)
    })
    .catch(function (error) {
      res.status(400).send({ error })
    });
}

async function getTaskId(permalinkValue) {
  try {
    var config = {
      method: 'get',
      url: `https://www.wrike.com/api/v4/tasks?permalink=id=${permalinkValue}`,
      headers: {
        'Authorization': 'Bearer eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjIxODUxODcsXCJpXCI6ODMxNTQ0NixcImNcIjo0NjM0MjIzLFwidVwiOjUxMjMxNjEsXCJyXCI6XCJVU1wiLFwic1wiOltcIldcIixcIkZcIixcIklcIixcIlVcIixcIktcIixcIkNcIixcIkRcIixcIk1cIixcIkFcIixcIkxcIixcIlBcIl0sXCJ6XCI6W10sXCJ0XCI6MH0iLCJpYXQiOjE2NTg5OTk0MjB9.w7PkYqVrnmdXEN0HsGyFd93W1YmnElfKT8ztDMexKm0'
      }
    };
    return await axios(config)
      .then(function (response) {
        console.log("response.data.id...", response.data.data[0].id);
        return response.data.data[0].id
      })
      .catch(function (error) {
        console.log("error..", error);
        return null
      });
  } catch (err) {
    res.status(200).send(err)
  }

}

module.exports.updatetimelog = async (req, res) => {
  let payload = req.body.timelogs;
  let totalCount = payload.length;
  let count = 0;
  let updatedLogs = []
  let failedLogs = []
  console.log("totalCount...", totalCount, count);
  try {
    await asyncForEach(payload, async (timelog, index) => {
      var { hours, trackedDate, comment, categoryId, plainText } = timelog
      var data = qs.stringify({
        hours,
        trackedDate,
        comment,
        categoryId,
        plainText
      });
      var config = {
        method: 'post',
        url: `https://www.wrike.com/api/v4/tasks/${timelog.id}/timelogs`,
        headers: {
          'Authorization': 'Bearer eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjIxODUxODcsXCJpXCI6ODMxNTQ0NixcImNcIjo0NjM0MjIzLFwidVwiOjUxMjMxNjEsXCJyXCI6XCJVU1wiLFwic1wiOltcIldcIixcIkZcIixcIklcIixcIlVcIixcIktcIixcIkNcIixcIkRcIixcIk1cIixcIkFcIixcIkxcIixcIlBcIl0sXCJ6XCI6W10sXCJ0XCI6MH0iLCJpYXQiOjE2NTg5OTk0MjB9.w7PkYqVrnmdXEN0HsGyFd93W1YmnElfKT8ztDMexKm0',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          count = count + 1
          updatedLogs.push(timelog)
          if (totalCount == count) {
            res.status(200).send({ updatedLogs, failedLogs })
          }
        })
        .catch(function (error) {
          console.log(error);
          count = count + 1
          failedLogs.push(timelog)
          if (totalCount == count) {
            res.status(200).send({ updatedLogs, failedLogs })
          }
        });
    })
  } catch (err) {
    res.status(200).send(err)
  }

};



const asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};