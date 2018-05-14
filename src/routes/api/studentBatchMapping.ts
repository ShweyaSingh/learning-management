import { BatchStudentMapping,Batch,Lecture } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

route.post('/', function (req, res) {
    BatchStudentMapping.create({
        studentId: req.body.studentId,
        batchId:req.body.batchId
    }).then((studentbatchmapping) => {
        res.status(201).send(studentbatchmapping);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not Enroll student to batch"
        })
    })
})

route.post('/batch', function (req, res) {
    Batch.create({
        batchname: req.body.name,
        courseId:req.body.course
    }).then((batch) => {
        res.status(201).send(batch);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add batch"
        })
    })
})

route.post('/lecture', function (req, res) {
    Lecture.create({
        lecturename: req.body.name,
        batchId:req.body.batch,
        teacherId:req.body.teacher
    }).then((lecture) => {
        res.status(201).send(lecture);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not lecture"
        })
    })
})

export default route;