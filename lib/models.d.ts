export declare class CUResponse {
    username: string;
    cookie: string;
    semesters: Semesters;
    constructor(username: string, cookie: string);
}
export declare class CUArrayData<T> {
    items: Array<T>;
    length: number;
    add(item: T): void;
    get(index: number): T;
    remove(index: number): T[];
    each(callback: (index: number, data: T) => void): void;
}
export declare class Course {
    title: string;
    crn: Array<number>;
    url: string;
    instructors: Array<string> | undefined;
    content: object;
    semester: Semester | undefined;
    constructor(title: string, crn: Array<number>, url: string, instructors: Array<string> | undefined, content: object);
}
export declare class Semester {
    title: string;
    term: string;
    courses: Courses;
    constructor(title: string, term: string);
}
export declare class Courses extends CUArrayData<Course> {
    semester: Semester;
    constructor(semester: Semester);
    add(item: Course): void;
}
export declare class Semesters extends CUArrayData<Semester> {
}
