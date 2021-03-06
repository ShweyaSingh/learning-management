"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
//get all subjects
route.get('/', (req, res) => {
    db_1.Subject.findAll()
        .then((subjects) => {
        res.status(200).send(subjects);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve subjects"
        });
    });
});
//get subject with id passed in url
route.get('/:id', (req, res) => {
    let subjectId = parseInt(req.params.id);
    db_1.Subject.findOne({
        where: {
            id: subjectId
        }
    })
        .then((subject) => {
        res.status(200).send(subject);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve subject of this particular id"
        });
    });
});
//get all those teachers who teaches subject having id passed in url
route.get('/:id/teachers', (req, res) => {
    let subjectId = parseInt(req.params.id);
    db_1.Teacher.findAll({
        include: [
            { model: db_1.Subject }
        ],
        where: {
            subjectId: subjectId
        }
    }).then((subjectTeachers) => {
        res.status(200).send(subjectTeachers);
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve teachers for subject with this particular id"
        });
    });
});
//add new subject
route.post('/', function (req, res) {
    db_1.Subject.create({
        subjectname: req.body.subject,
        courseId: req.body.courseId
    }).then((subject) => {
        res.status(201).send(subject);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new subject"
        });
    });
});
//update detail of subject with id passed in url
route.put('/:id', function (req, res) {
    db_1.Subject.update({ subjectname: req.body.name }, {
        where: {
            id: parseInt(req.params.id)
        }
    })
        .then((subject) => {
        res.status(201).send(subject);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not update subject detail"
        });
    });
});
exports.default = route;
