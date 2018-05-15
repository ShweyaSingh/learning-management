"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
// get all /teachers
route.get('/', (req, res) => {
    db_1.Teacher.findAll({
        include: [
            { model: db_1.Subject }
        ]
    }).then((teachers) => {
        res.status(200).send(teachers);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Students"
        });
    });
});
// get one /teachers/:id
route.get('/:id', (req, res) => {
    let teacherid = parseInt(req.params.id);
    db_1.Teacher.findOne({
        where: {
            id: teacherid
        }
    }).then((teacher) => {
        res.status(200).send(teacher);
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Teacher"
        });
    });
});
// get all batches /teachers/:id/batches
// Test 
route.get('/:id/batches', (req, res) => {
    let teacherid = parseInt(req.params.id);
    db_1.Lecture.findAll({
        attributes: [
            'teacherId', 'batchId'
        ],
        include: [
            {
                model: db_1.Batch
            }
        ],
        where: {
            id: teacherid
        }
    }).then((teacherBatches) => {
        res.status(200).send(teacherBatches);
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Student's Batches"
        });
    });
});
//post one /teacher
route.post('/', function (req, res) {
    db_1.Subject.findOne({
        where: { subjectname: req.body.subjectname }
    }).then((subject) => {
        db_1.Teacher.create({
            teachername: req.body.name,
            subjectId: subject.id
        }).then((teacher) => {
            res.status(201).redirect('/');
        }).catch((err) => {
            res.status(501).send({
                error: "Could not add new Teacher"
            });
        });
    }).catch(() => {
        res.status(501).send({
            error: "Could not find Subject of this name"
        });
    });
});
// put one /teacher/:id
route.put('/:id', (req, res) => {
    let teacherid = parseInt(req.params.id);
    db_1.Teacher.update({ teachername: req.body.name }, {
        where: {
            id: teacherid
        }
    }).then((teacher) => {
        res.status(201).send(teacher);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not update new Teacher"
        });
    });
});
exports.default = route;
