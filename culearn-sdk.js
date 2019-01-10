
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

function retrieveData(cookie, callback) {
    j.setCookie(cookie, url.main)
    request({ url: url.dashboard, jar: j }, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            let output = {}
            output['semesters'] = []

            let $ = cheerio.load(html)

            // Set 'cookie' to Cookie
            output['cookie', cookie]

            // Set 'username' to Username
            let username = $('.logininfo').children().first()
            output['name'] = username.text()

            // Courses By Semester
            $('.category.with_children').each(function (index, semester) {
                // Create single Semster object
                let objSemester = {}
                
                // Set 'title' to Semester's name
                objSemester['title'] = $(semester).children().first().text()

                // Create Courses Object and retrieve courses
                let courses = $(semester).children().first().next().children()
                objSemester['courses'] = []
                
                // Courses
                courses.each(function (index, course) {

                    // Create Course object and set 'title', 'url' and 'crn'
                    let objCourse = {}
                    objCourse['title'] = $(course).text()
                    objCourse['url'] = $(course).children().attr('href')
                    let crnStr = objCourse['title'].match(/\[(.*?)\]/)
                    if(crnStr){
                        objCourse['crn'] = crnStr[1].split(':')
                    }

                    // Push Course Object to 'courses'
                    objSemester['courses'].push(objCourse)
                })
                
                // Push Semster Object to 'semesters'
                output['semesters'].push(objSemester)
            })

            callback(null, output)
        }
    })
}

function parseCookie(cookies) {
    return cookies[1].split(';')[0]
}

module.exports = connect(login, callback)
