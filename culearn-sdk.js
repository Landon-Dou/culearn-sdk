
var request = require('request').defaults({ jar: true })
var cheerio = require('cheerio')
var fs = require('fs')
var url = {
    login: 'https://culearn.carleton.ca/moodle/login/index.php',
    dashboard: 'https://culearn.carleton.ca/moodle/my/',
    main: 'https://culearn.carleton.ca'
}
var j = request.jar()

function connect(login, callback) {
    request.post({
        url: url.login,
        form: login
    }, function (err, response, body) {
        if (err) {
            return callback('ERR: ' + err, null)
        }

        let cookies = response.headers["set-cookie"]
        if (cookies.length != 4) {
            return callback('ERR: Failed to Login', null)
        }
        cookie = parseCookie(cookies)

        retrieveData(cookie, callback)
    })
}

function parseCookie(cookies) {
    return cookies[1].split(';')[0]
}



module.exports = connect(login, callback)
