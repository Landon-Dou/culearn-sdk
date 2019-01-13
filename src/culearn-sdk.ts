
var request = require('request').defaults({ jar: true })
var cheerio = require('cheerio')
import { CUResponse, Course, Semester } from './models'

var url = {
    courseSearch: 'https://culearn.carleton.ca/moodle/course/search.php',
    login: 'https://culearn.carleton.ca/moodle/login/index.php',
    dashboard: 'https://culearn.carleton.ca/moodle/my/',
    main: 'https://culearn.carleton.ca'
}
var j = request.jar()

export function connect(login: { username: string, password: string }, callback: (err: string | undefined, res: CUResponse | undefined) => void): void {
    request.post({
        url: url.login,
        form: login
    }, function (err: string, response: any, body: any) {
        if (err) {
            return callback('ERR: ' + err, undefined)
        }

        let cookies = response.headers["set-cookie"]
        if (cookies.length != 4) {
            return callback('ERR: Failed to login, please verify your credentials or try again later', undefined)
        }
        let cookie = parseCookie(cookies)

        retrieveData(cookie, callback)
    })
}

export function retrieveData(cookie: string, callback: (err: string | undefined, res: CUResponse | undefined) => void): void {
    j.setCookie(cookie, url.main)
    request({ url: url.dashboard, jar: j }, function (error: string, response: any, html: any) {
        if (!error && response.statusCode == 200) {

            // Load html as $ and create response object
            let $ = cheerio.load(html)
            let username = $('.logininfo').children().first().text()
            let res = new CUResponse(username, cookie)

            // Semesters
            $('.category.with_children').each(function (index: any, semester: any) {
                // Semester Title
                let titleSemester = $(semester).children().first().text()
                // Semester Term
                let termSemester = parseTerm(titleSemester.split(' ').slice(0, 2))

                let objSemester = new Semester(titleSemester, termSemester)

                // Courses
                let courses = $(semester).children().first().next().children()
                courses.each(function (index: number, course: Course) {
                    // Course Title
                    let titleCourse = $(course).text()
                    // Course CRN
                    let crnCourse = titleCourse.match(/\[(.*?)\]/)
                    if (crnCourse) {
                        crnCourse = crnCourse[1].split(':').map(Number)
                    } else {
                        crnCourse = "N/A"
                    }
                    // Course URL
                    let urlCourse = $(course).children().attr('href')
                    // Course Content
                    let contentCourse = {}
                    // Course Instructors | IN PROGRESS
                    let instructors = undefined

                    let objCourse = new Course(titleCourse, crnCourse, urlCourse, instructors, contentCourse)
                    objSemester.courses.add(objCourse)
                })
                res.semesters.add(objSemester)
            })

            callback(undefined, res)
        }
    })
}

export function parseCookie(cookies: string): string {
    return cookies[1].split(';')[0]
}

export function parseTerm(term: Array<string>): string {
    let period = "00"
    switch (term[0]) {
        case "Winter":
            period = "10"
            break
        case "Summer":
            period = "20"
            break
        case "Fall":
            period = "30"
            break
    }
    return term[1] + period
}