# Carleton University Learning Management System (cuLearn) SDK

* This SDK is made for Carleton students or staffs to access cuLearn contents and data directly from their own applications/programs in purposes of testing and analyzing. 
* For example, we can develop a dashboard that manages all courses and schedules in your own style, or a program that utilizes Tensorflow or other AI frameworks to evaluate the quality of our study and predict the grades in upcomming exams
* Its a good opportunity for us to dig our own things in the university while using computer science knowledge
* Take your own risks by using this sdk since the session cookie, cuLearn username and password (optional) are visible in codes. Do NOT share the codes with your cookie, username or password to others


## Quick Start Example
```javascript
var cuSDK = require('culearn-sdk')

cuSDK.connect(login:{user1, pass1}, function(err, res){
    if(err){
        return console.error('[ERR] ' + err)
    }
    
    console.log('Amount of Semesters: ' + res.semesters.length)
    console.log('Amount of Courses: ' + res.courses.length)
    
    res.semesters.each(function(index, semester){
        console.log('[Overview]')
        console.log(`* There are ${semester.courses.length} courses in ${semester.title}`)
        semester.courses.each(function(index, course){
            console.log(`\t* [${course.title}]`)
            console.log(`\t  ${course.instructors}`)
            console.log(`\t  ${course.url}`)
            console.log(`\t  ${course.contacts}`)
            console.log(`\t  ${course.grades.schema}`)	// Manually defined by user
            console.log(`\t  ${course.grades.total}`)	// Calculated based on the schema
        })
    })
})
```
