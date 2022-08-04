const { google } = require('googleapis');
const moment = require('moment');
const extractUrls = require("extract-urls");
const url = require('url');
const _ = require('lodash');


module.exports.getCalendarEvents = async (req, ress) => {
    console.log("getCalendarEvents...");
    listEvents()


const fs = require('fs');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    console.log("content...", JSON.parse(content));

    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
});

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function listEvents(auth) {
    let wrikeTask = []
    let startDay = moment().startOf('week').toISOString();
    let endDay = moment().endOf('week').toISOString();    
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.list({
        calendarId: 'primary',
        timeMin: startDay,
        timeMax: endDay,
        maxResults: 9,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.map((event, i) => {                
                if(event.summary.toLowerCase() != 'lunch'){
                    if(event.description && extractUrls(event.description)){
                        extractUrls(event.description).forEach((isWrike)=>{
                            if(isWrike.indexOf('wrike') != -1){
                                var wrike = url.parse(isWrike, true).query;
                                console.log("q...",wrike);
                                const start = event.start.dateTime || event.start.date;
                                wrikeTask.push({
                                    taskId : wrike.id,
                                    title: event.summary,
                                    date : start
                                })
                            }
                        })                             
                    }
                }
            });
            return ress.status(200).send({task : _.uniqBy(wrikeTask, 'taskId')});
        } else {
            console.log('No upcoming events found.');
        }
    });
}
};
