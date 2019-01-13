# Carleton University Learning Management System (cuLearn) SDK

* This SDK is made for Carleton students or staffs to access cuLearn contents and data directly from their own applications/programs in purposes of testing and analyzing. 
* For example, we can develop a dashboard that manages all courses and schedules in your own style, or a program that utilizes Tensorflow or other AI frameworks to evaluate the quality of our study and predict the grades in upcomming exams
* Its a good opportunity for us to dig our own things in the university while using computer science knowledge
* Take your own risks by using this sdk since the session cookie, cuLearn username and password (optional) are visible in codes. Do NOT share the codes with your cookie, username or password to others



> **Current Version : 1.0.0**
>
> CUResponse
>
> | Properties or Functions | Type      |
> | ----------------------- | --------- |
> | username                | String    |
> | cookie                  | String    |
> | semesters               | Semesters |
>
> Semesters
>
> | Properties or Functions                                  | Type                      |
> | -------------------------------------------------------- | ------------------------- |
> | items                                                    | Array<Semester>           |
> | length                                                   | Integer                   |
> | add(item : Semester)                                     | Function => void          |
> | get(index: Integer)                                      | Function => Semester      |
> | remove(index: Integer)                                   | Function => Semester      |
> | each(callback : (index: number, data: Semester) => void) | Callback Function => void |
>
> Courses
>
> | Properties or Functions                                | Type                      |
> | ------------------------------------------------------ | ------------------------- |
> | semester                                               | Semester                  |
> | items                                                  | Array<Course>             |
> | length                                                 | Integer                   |
> | add(item : Course)                                     | Function => void          |
> | get(index: Integer)                                    | Function => Course        |
> | remove(index: Integer)                                 | Function => Course        |
> | each(callback : (index: number, data: Course) => void) | Callback Function => void |
>
> Semester
>
> | Properties or Functions | Type    |
> | ----------------------- | ------- |
> | title                   | String  |
> | term                    | String  |
> | courses                 | Courses |
>
> Course
>
> | Properties or Functions | Type                             |
> | ----------------------- | -------------------------------- |
> | title                   | String                           |
> | crn                     | Array<Integer>                   |
> | url                     | String                           |
> | instructors             | Array<String> **// In Progress** |
> | content                 | Content **// In Progress**       |



## Quick Start Example

```javascript
var cuSDK = require('culearn-sdk')

cuSDK.connect({username: 'your-username', password: 'your-password'}, function(err, res){
    if(err){
        return console.error(err)
    }
    res.semesters.each(function(index, semester){
        console.log(`# ${index} | ${semester.title} | ${semester.term} | ${semester.courses.length}`)
        semester.courses.each(function(index, course){
            console.log(`  * ${index} | ${course.title} | ${course.crn} | ${course.url}`)
        })
    })
})
```
