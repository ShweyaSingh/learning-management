"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get('/', (req, res) => {
    db_1.Batch.findAll({
        include: [
            { model: db_1.Course }
        ],
    }).then((batches) => {
        res.status(200).send(batches);
    }).catch((err) => {
        //console.log(err)
        res.status(500).send({
            error: "Could not retrieve Students"
        });
    });
});
route.get('/upcoming', (req, res) => {
    db_1.Batch.findAll({
        include: [
            { model: db_1.Course }
        ],
        limit: 4,
        order: [['updatedAt', 'DESC']]
    }).then((batches) => {
        res.status(200).send(batches);
    }).catch((err) => {
        //console.log(err)
        res.status(500).send({
            error: "Could not retrieve Students"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Course.findOne({
        where: { coursename: req.body.coursename }
    }).then((course) => {
        db_1.Batch.create({
            batchname: req.body.name,
            courseId: course.id
        }).then((batch) => {
            res.status(201).redirect('/');
        }).catch((err) => {
            res.status(501).send({
                error: "Could not add batch"
            });
        });
    }).catch((err) => {
        res.status(501).send({
            error: "Could not find course of this name"
        });
    });
});
exports.default = route;
