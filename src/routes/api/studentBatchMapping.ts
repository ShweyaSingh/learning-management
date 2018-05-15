import { BatchStudentMapping,Batch,Lecture } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

route.post('/', function (req, res) {
    BatchStudentMapping.create({
        studentId: req.body.studentId,
        batchId:req.body.batchId
    }).then((studentbatchmapping) => {
        res.status(201).redirect('/');
    }).catch((err) => {
        res.status(501).send({
            error: "Could not Enroll student to batch"
        })
    })
})

route.post('/lecture', function (req, res) {
    Lecture.create({
        lecturename: req.body.name,
        batchId:req.body.batch,
        teacherId:req.body.teacher
    }).then((lecture) => {
        res.status(201).redirect('/');
    }).catch((err) => {
        res.status(501).send({
            error: "Could not lecture"
        })
    })
})

export default route;