export class CUResponse {
    username: string
    cookie: string
    semesters: Semesters

    constructor(username: string, cookie: string) {
        this.username = username
        this.cookie = cookie
        this.semesters = new Semesters()
    }
}

export class CUArrayData<T> {
    items: Array<T> = new Array<T>()
    length: number = 0

    add(item: T): void {
        this.items.push(item)
        this.length++
    }

    get(index: number): T {
        if (index < 0 || index >= this.length) {
            throw new Error(`ERR: Index out of bounds - ${index}:${this.length - 1}`)
        }
        return this.items[index]
    }

    remove(index: number): T[] {
        if (index < 0 || index >= this.length) {
            throw new Error(`ERR: Index out of bounds - ${index}:${this.length - 1}`)
        }
        this.length--
        return this.items.splice(index, 1)
    }

    each(callback: (index: number, data: T) => void): void {
        let counter = 0
        for (let item of this.items) {
            callback(counter, item)
            counter++
        }
    }

}

export class Course {
    title: string
    crn: Array<number>
    url: string
    instructors: Array<string> | undefined
    content: object
    semester: Semester | undefined

    constructor(title: string, crn: Array<number>, url: string, instructors: Array<string> | undefined, content: object) {
        this.title = title
        this.crn = crn
        this.url = url
        this.instructors = instructors
        this.content = content
    }
}

export class Semester {
    title: string
    term: string
    courses: Courses

    constructor(title: string, term: string) {
        this.title = title
        this.term = term
        this.courses = new Courses(this)
    }
}

export class Courses extends CUArrayData<Course>{
    semester: Semester
    constructor(semester: Semester) {
        super()
        // Let all courses group has a reference to the current semester
        this.semester = semester
    }

    // Override the add method to let each added course has a reference to the current semester
    add(item: Course): void {
        item.semester = this.semester
        super.add(item)
    }
}

export class Semesters extends CUArrayData<Semester>{

}