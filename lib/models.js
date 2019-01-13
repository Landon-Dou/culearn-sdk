"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CUResponse = /** @class */ (function () {
    function CUResponse(username, cookie) {
        this.username = username;
        this.cookie = cookie;
        this.semesters = new Semesters();
    }
    return CUResponse;
}());
exports.CUResponse = CUResponse;
var CUArrayData = /** @class */ (function () {
    function CUArrayData() {
        this.items = new Array();
        this.length = 0;
    }
    CUArrayData.prototype.add = function (item) {
        this.items.push(item);
        this.length++;
    };
    CUArrayData.prototype.get = function (index) {
        if (index < 0 || index >= this.length) {
            throw new Error("ERR: Index out of bounds - " + index + ":" + (this.length - 1));
        }
        return this.items[index];
    };
    CUArrayData.prototype.remove = function (index) {
        if (index < 0 || index >= this.length) {
            throw new Error("ERR: Index out of bounds - " + index + ":" + (this.length - 1));
        }
        this.length--;
        return this.items.splice(index, 1);
    };
    CUArrayData.prototype.each = function (callback) {
        var counter = 0;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            callback(counter, item);
            counter++;
        }
    };
    return CUArrayData;
}());
exports.CUArrayData = CUArrayData;
var Course = /** @class */ (function () {
    function Course(title, crn, url, instructors, content) {
        this.title = title;
        this.crn = crn;
        this.url = url;
        this.instructors = instructors;
        this.content = content;
    }
    return Course;
}());
exports.Course = Course;
var Semester = /** @class */ (function () {
    function Semester(title, term) {
        this.title = title;
        this.term = term;
        this.courses = new Courses(this);
    }
    return Semester;
}());
exports.Semester = Semester;
var Courses = /** @class */ (function (_super) {
    __extends(Courses, _super);
    function Courses(semester) {
        var _this = _super.call(this) || this;
        // Let all courses group has a reference to the current semester
        _this.semester = semester;
        return _this;
    }
    // Override the add method to let each added course has a reference to the current semester
    Courses.prototype.add = function (item) {
        item.semester = this.semester;
        _super.prototype.add.call(this, item);
    };
    return Courses;
}(CUArrayData));
exports.Courses = Courses;
var Semesters = /** @class */ (function (_super) {
    __extends(Semesters, _super);
    function Semesters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Semesters;
}(CUArrayData));
exports.Semesters = Semesters;
//# sourceMappingURL=models.js.map