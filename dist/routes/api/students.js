"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
// get all /students
route.get('/', (req, res) => {
    db_1.Student.findAll()
        .then((students) => {
        res.status(200).send(students);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Students"
        });
    });
});
// get one /students/:id
route.get('/:id', (req, res) => {
    let studentid = parseInt(req.params.id);
    db_1.Student.findOne({
        where: {
            id: studentid
        }
    }).then((student) => {
        res.status(200).send(student);
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Student"
        });
    });
});
// get all batches /students/:id/batches
route.get('/:id/batches', (req, res) => {
    let studentid = parseInt(req.params.id);
    db_1.BatchStudentMapping.findAll({
        attributes: [
            'batchId', 'studentId'
        ],
        include: [
            { model: db_1.Batch }
        ],
        where: {
            studentId: studentid
        }
    }).then((studentBatch) => {
        res.status(200).send(studentBatch);
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Student's Batches"
        });
    });
});
//post one /student
route.post('/', function (req, res) {
    db_1.Student.create({
        studentname: req.body.name,
    }).then((student) => {
        res.status(201).redirect('/');
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new Student"
        });
    });
});
// put one /student/:id
route.put('/:id', (req, res) => {
    let studentid = parseInt(req.params.id);
    db_1.Student.update({ studentname: req.body.name }, {
        where: {
            id: studentid
        }
    }).then((student) => {
        res.status(201).send(student);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not update new Student"
        });
    });
});
exports.default = route;
