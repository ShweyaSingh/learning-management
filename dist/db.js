"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
//const Sequelize = require('sequelize')
const db = new sequelize_1.default('learningManagementDB', 'shweta3', 'password', {
    dialect: 'mysql',
    host: 'localhost',
    pool: {
        min: 0,
        max: 5,
    }
});
exports.Course = db.define('courses', {
    coursename: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
    }
});
exports.Batch = db.define('batches', {
    batchname: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
    }
});
exports.Teacher = db.define('teachers', {
    teachername: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
    }
});
exports.Student = db.define('students', {
    studentname: {
        type: sequelize_1.default.STRING(50),
        allowNull: false,
    }
});
exports.Lecture = db.define('lectures', {
    lecturename: {
        type: sequelize_1.default.STRING(50),
        allowNull: false,
    }
});
exports.Subject = db.define('subjects', {
    subjectname: {
        type: sequelize_1.default.STRING(50),
        allowNull: false,
    }
});
exports.BatchStudentMapping = db.define('bsmapping', {});
exports.Batch.belongsTo(exports.Course);
exports.Subject.belongsTo(exports.Course);
exports.Teacher.belongsTo(exports.Subject);
exports.Lecture.belongsTo(exports.Batch);
exports.Lecture.belongsTo(exports.Teacher);
exports.BatchStudentMapping.belongsTo(exports.Batch);
exports.BatchStudentMapping.belongsTo(exports.Student);
db.sync({ force: false })
    .then(() => { console.log("Database has been synced "); })
    .catch((err) => console.log(err));
exports.default = exports.Course;
