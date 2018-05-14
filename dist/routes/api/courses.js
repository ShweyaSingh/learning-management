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
route.get('/:id/batches/:id1', (req, res) => {
    db_1.Batch.findOne({
        where: {
            [Op.and]: [
                { id: req.params.id1 },
                { courseId: req.params.id }
            ]
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
// route.get('/:id/batches/:id/lectures',(req,res)=>{
//     Course.findAll().then((students) => {
//         res.status(200).send(students)
//     })
//     .catch((err) => {
//         res.status(500).send({
//             error: "Could not retrieve Students"
//         })
//     }) 
// })
// route.get('/:id/batches/:id/lectures/:id',(req,res)=>{
//     Course.findAll().then((students) => {
//         res.status(200).send(students)
//     })
//     .catch((err) => {
//         res.status(500).send({
//             error: "Could not retrieve Students"
//         })
//     }) 
// })
//post one /courses
route.post('/', function (req, res) {
    db_1.Course.create({
        coursename: req.body.name,
    }).then((course) => {
        res.status(201).send(course);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        });
    });
});
exports.default = route;
