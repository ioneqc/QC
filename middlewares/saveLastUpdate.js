const { google } = require('googleapis')
const { authorize } = require('../libs/google-sheets')

const saveLastUpdate = (action, auth) => {
  const username = auth.email
  const date = new Date().toISOString();
  let values = []
  values.push(username)
  values.push(action)
  values.push(date)
  console.log(values)
  return authorize().then(async auth => {
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: '16jJ9UVvFse3Teid6yKQU36zU9oyNfl7U_xhQQIHMwtE',
      range: `Activities`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        majorDimension: "ROWS",
        range: `Activities`,
        values: [values]
      },
    })

  })
}



module.exports = saveLastUpdate