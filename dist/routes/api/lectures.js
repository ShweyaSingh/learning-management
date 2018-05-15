"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.post('/', function (req, res) {
    db_1.Batch.findOne({
        where: {
            batchname: req.body.batchname
        }
    }).then((batch) => {
        db_1.Teacher.findOne({
            where: {
                teachername: req.body.teachername
            }
        }).then((teacher) => {
            db_1.Lecture.create({
                lecturename: req.body.name,
                batchId: batch.id,
                teacherId: teacher.id
            }).then((lecture) => {
                res.status(201).redirect('/');
            }).catch((err) => {
                res.status(501).send({
                    error: "Could not lecture"
                });
            });
        }).catch((err) => {
            res.status(501).send({
                error: "Could not find any batch of this name"
            });
        });
    });
});
exports.default = route;
