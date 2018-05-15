import { Batch, Lecture, Teacher } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

route.post('/', function (req, res) {
    Batch.findOne({
        where: {
            batchname: req.body.batchname
        }
    }).then((batch: any) => {
        Teacher.findOne({
            where: {
                teachername: req.body.teachername
            }
        }).then((teacher: any) => {
            Lecture.create({
                lecturename: req.body.name,
                batchId: batch.id,
                teacherId: teacher.id
            }).then((lecture) => {
                res.status(201).redirect('/');
            }).catch((err) => {
                res.status(501).send({
                    error: "Could not lecture"
                })
            })
        }).catch((err) => {
            res.status(501).send({
                error: "Could not find any batch of this name"
            })
        })
    })
})

export default route;