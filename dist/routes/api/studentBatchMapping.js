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
route.post('/', function (req, res) {
    db_1.Batch.findOne({
        where: {
            batchname: req.body.batchname
        }
    }).then((batch) => {
        db_1.BatchStudentMapping.findAll({
            where: {
                [Op.and]: [
                    { studentId: parseInt(req.body.id) },
                    { batchId: batch.id }
                ]
            }
        }).then((mapping) => {
            if (mapping.length == 0) {
                db_1.BatchStudentMapping.create({
                    studentId: parseInt(req.body.id),
                    batchId: batch.id
                }).then((studentbatchmapping) => {
                    res.status(201).redirect('/');
                }).catch((err) => {
                    res.status(501).send({
                        error: "Could not Enroll student to batch"
                    });
                });
            }
            else {
                res.status(201).redirect('/');
            }
        });
    });
});
route.post('/map', function (req, res) {
    db_1.BatchStudentMapping.findAll({
        where: {
            [Op.and]: [
                { studentId: req.body.studentId },
                { batchId: req.body.batchId }
            ]
        }
    }).then((mapping) => {
        if (mapping.length == 0) {
            db_1.BatchStudentMapping.create({
                studentId: req.body.studentId,
                batchId: req.body.batchId
            }).then((studentbatchmapping) => {
                res.status(201).send();
            }).catch((err) => {
                res.status(501).send({
                    error: "Could not Enroll student to batch"
                });
            });
        }
        else {
            res.status(202).send();
        }
    });
});
exports.default = route;
