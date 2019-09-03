const readline = require('readline')
const { google } = require('googleapis')
const fs = require('fs')
const Discord = require('discord.js')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
var tokenObj = {
  access_token: process.env.accessToken,
  refresh_token: process.env.refreshToken,
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  token_type: 'Bearer',
  expiry_date: process.env.expiryDate
}

var credientialsObj = {
  client_id: process.env.clientID,
  project_id: process.env.projectID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_secret: process.env.clientSecret,
  redirect_uris: [process.env.redirectURI, 'http://localhost']
}

module.exports.run = (bot, message, args) => {
  // if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(credientialsObj, listMajors)

  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    )

    // Check if we have previously stored a token.
    // if (err) return /*getNewToken(oAuth2Client, callback);*/
    oAuth2Client.setCredentials(tokenObj)
    callback(oAuth2Client)
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  // function getNewToken(oAuth2Client, callback) {
  //     const authUrl = oAuth2Client.generateAuthUrl({
  //         access_type: 'offline',
  //         scope: SCOPES,
  //     });
  //     console.log('Authorize this app by visiting this url:', authUrl);
  //     const rl = readline.createInterface({
  //         input: process.stdin,
  //         output: process.stdout,
  //     });
  //     rl.question('Enter the code from that page here: ', (code) => {
  //         rl.close();
  //         oAuth2Client.getToken(code, (err, token) => {
  //             if (err) return console.error('Error while trying to retrieve access token', err);
  //             oAuth2Client.setCredentials(token);
  //             // Store the token to disk for later program executions
  //             fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
  //                 if (err) return console.error(err);
  //                 console.log('Token stored to', TOKEN_PATH);
  //             });
  //             callback(oAuth2Client);
  //         });
  //     });
  // }

  function listMajors(auth) {
    const sheets = google.sheets({
      version: 'v4',
      auth
    })

    var d = new Date()
    var year = d.getUTCFullYear()
    var month = d.getUTCMonth() + 1
    var day = d.getUTCDate()

    if (month <= 9) {
      month.toString()
      month = '0' + month
    }
    if (day <= 9) {
      day = '0' + day
    }
    var playerTag = message.member.user.tag
    var playerName
    if (playerTag === 'DrPika#9814') {
      playerName = 'Hieu'
    } else if (playerTag === 'syLph#4613') {
      playerName = 'syLph'
    } else if (playerTag === 'lorey#9165') {
      playerName = 'Droy'
    } else if (playerTag === 'Uniment#2751') {
      playerName = 'Uniment'
    }
    var getAllTime = year + '-' + month + '-' + day
    sheets.spreadsheets.values.append({
      spreadsheetId: process.env.sheetID,
      range: 'Targets!A2:L2',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [
            args[0], // link
            args[1], // score
            args[4], // money
            args[17], // gas
            args[19], //muni
            args[21], //steel
            args[23], // alum
            args[26], // food
            args[9], //Ura
            args[5], // Coal
            args[7], //Oil
            args[11], //Iron
            args[13], // Baux
            args[15] // Lead
          ]
        ]
      }
    })
  }
}
