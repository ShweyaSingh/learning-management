"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.post('/', function (req, res) {
    db_1.BatchStudentMapping.create({
        studentId: req.body.studentId,
        batchId: req.body.batchId
    }).then((studentbatchmapping) => {
        res.status(201).send(studentbatchmapping);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not Enroll student to batch"
        });
    });
});
route.post('/batch', function (req, res) {
    db_1.Batch.create({
        batchname: req.body.name,
        courseId: req.body.course
    }).then((batch) => {
        res.status(201).send(batch);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add batch"
        });
    });
});
route.post('/lecture', function (req, res) {
    db_1.Lecture.create({
        lecturename: req.body.name,
        batchId: req.body.batch,
        teacherId: req.body.teacher
    }).then((lecture) => {
        res.status(201).send(lecture);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not lecture"
        });
    });
});
exports.default = route;
