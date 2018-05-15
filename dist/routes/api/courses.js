"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
route.get('/', (req, res) => {
    db_1.Course.findAll().then((courses) => {
        res.status(200).send(courses);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Courses"
        });
    });
});
route.get('/:id', (req, res) => {
    db_1.Course.findOne({
        where: {
            id: req.params.id
        }
    }).then((course) => {
        res.status(200).send(course);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Course"
        });
    });
});
route.get('/:id/batches', (req, res) => {
    db_1.Batch.findAll({
        include: [
            { model: db_1.Course }
        ],
        where: {
            courseId: req.params.id
        }
    }).then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        });
    });
});
route.get('/:id/batches/:bid', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: req.params.bid },
                { courseId: req.params.id }
            ]
        }
    }).then((batch) => {
        res.status(200).send(batch);
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        });
    });
});
route.get('/:id/batches/:bid/lectures', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: req.params.bid },
                { courseId: req.params.id }
            ]
        }
    }).then((batch) => {
        db_1.Lecture.findAll({
            include: [{ model: db_1.Batch }],
            where: {
                batchId: batch.id
            }
        }).then((lectures) => {
            res.status(200).send(lectures);
        })
            .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve lectures"
            });
        });
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        });
    });
});
route.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: req.params.bid },
                { courseId: req.params.id }
            ]
        }
    }).then((batch) => {
        db_1.Lecture.findOne({
            where: {
                [Op.and]: [
                    { batchId: batch.id },
                    { id: req.params.lid }
                ]
            }
        }).then((lecture) => {
            res.status(200).send(lecture);
        })
            .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve lecture"
            });
        });
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        });
    });
});
route.get('/:id/batches/:bid/students', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: req.params.bid },
                { courseId: req.params.id }
            ]
        }
    }).then((batch) => {
        db_1.BatchStudentMapping.findAll({
            attributes: [
                'batchId', 'studentId'
            ],
            include: [
                { model: db_1.Student }
            ],
            where: {
                batchId: batch.id
            }
        }).then((students) => {
            res.status(200).send(students);
        })
            .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve students"
            });
        });
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        });
    });
});
route.get('/:id/batches/:bid/teachers', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: req.params.bid },
                { courseId: req.params.id }
            ]
        }
    }).then((batch) => {
        db_1.Lecture.findAll({
            attributes: [
                'batchId', 'teacherId'
            ],
            include: [
                { model: db_1.Teacher }
            ],
            where: {
                batchId: batch.id
            }
        }).then((teachers) => {
            res.status(200).send(teachers);
        })
            .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve teachers"
            });
        });
    })
        .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        });
    });
});
//post one /courses
route.post('/', function (req, res) {
    db_1.Course.create({
        coursename: req.body.name,
    }).then((course) => {
        res.status(201).redirect('/');
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        });
    });
});
exports.default = route;
