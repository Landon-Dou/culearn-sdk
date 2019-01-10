# Carleton University Learning Management System (cuLearn) SDK

* This SDK is made for Carleton students or staffs to access cuLearn contents and data directly from their own applications/programs in purposes of testing and analyzing. 
* For example, we can develop a dashboard that manages all courses and schedules in your own style, or a program that utilizes Tensorflow or other AI frameworks to evaluate the quality of our study and predict the grades in upcomming exams
* Its a good opportunity for us to dig our own things in the university while using computer science knowledge
* Take your own risks by using this sdk since the session cookie, cuLearn username and password (optional) are visible in codes. Do NOT share the codes with your cookie, username or password to others



> Current Version : 0.1.0
>
> ​	Can retrieve semesters and any course's crn, title, url only. More features coming in the future


## Quick Start Example
```javascript
var cuSDK = require('culearn-sdk')

cuSDK.connect({ username: 'your-username', password: 'your-password' }, function (err, res) {
    if (err) {
        return console.error(err)
    }

    // Print out whole JSON object response
    console.log(JSON.stringify(res))

    // Get username
    console.log(res.name)

    // Get semesters' names
    for (let semster of res.semesters) {
        console.log(semster.title)
    }

    // Get all courses' names for all semester
    for (let semester of res.semesters) {
        for (let course of semester.courses) {
            if (course.crn) {
                console.log(`[${course.crn}][${course.title}][${course.url}]`)
            } else {
                console.log(`[N/A][${course.title}][${course.url}]`)
            }
        }
    }

    // Get cookie if you want to send cookie from your application, for example, to open a course site with one click after sending cookie to login directly
    console.log(res.cookie)

})
```
