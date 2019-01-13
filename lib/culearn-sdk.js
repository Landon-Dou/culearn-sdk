"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request').defaults({ jar: true });
var cheerio = require('cheerio');
var models_1 = require("./models");
var url = {
    courseSearch: 'https://culearn.carleton.ca/moodle/course/search.php',
    login: 'https://culearn.carleton.ca/moodle/login/index.php',
    dashboard: 'https://culearn.carleton.ca/moodle/my/',
    main: 'https://culearn.carleton.ca'
};
var j = request.jar();
function connect(login, callback) {
    request.post({
        url: url.login,
        form: login
    }, function (err, response, body) {
        if (err) {
            return callback('ERR: ' + err, undefined);
        }
        var cookies = response.headers["set-cookie"];
        if (cookies.length != 4) {
            return callback('ERR: Failed to login, please verify your credentials or try again later', undefined);
        }
        var cookie = parseCookie(cookies);
        retrieveData(cookie, callback);
    });
}
exports.connect = connect;
function retrieveData(cookie, callback) {
    j.setCookie(cookie, url.main);
    request({ url: url.dashboard, jar: j }, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            // Load html as $ and create response object
            var $_1 = cheerio.load(html);
            var username = $_1('.logininfo').children().first().text();
            var res_1 = new models_1.CUResponse(username, cookie);
            // Semesters
            $_1('.category.with_children').each(function (index, semester) {
                // Semester Title
                var titleSemester = $_1(semester).children().first().text();
                // Semester Term
                var termSemester = parseTerm(titleSemester.split(' ').slice(0, 2));
                var objSemester = new models_1.Semester(titleSemester, termSemester);
                // Courses
                var courses = $_1(semester).children().first().next().children();
                courses.each(function (index, course) {
                    // Course Title
                    var titleCourse = $_1(course).text();
                    // Course CRN
                    var crnCourse = titleCourse.match(/\[(.*?)\]/);
                    if (crnCourse) {
                        crnCourse = crnCourse[1].split(':').map(Number);
                    }
                    else {
                        crnCourse = "N/A";
                    }
                    // Course URL
                    var urlCourse = $_1(course).children().attr('href');
                    // Course Content
                    var contentCourse = {};
                    // Course Instructors | IN PROGRESS
                    var instructors = undefined;
                    var objCourse = new models_1.Course(titleCourse, crnCourse, urlCourse, instructors, contentCourse);
                    objSemester.courses.add(objCourse);
                });
                res_1.semesters.add(objSemester);
            });
            callback(undefined, res_1);
        }
    });
}
exports.retrieveData = retrieveData;
function parseCookie(cookies) {
    return cookies[1].split(';')[0];
}
exports.parseCookie = parseCookie;
function parseTerm(term) {
    var period = "00";
    switch (term[0]) {
        case "Winter":
            period = "10";
            break;
        case "Summer":
            period = "20";
            break;
        case "Fall":
            period = "30";
            break;
    }
    return term[1] + period;
}
exports.parseTerm = parseTerm;
//# sourceMappingURL=culearn-sdk.js.map