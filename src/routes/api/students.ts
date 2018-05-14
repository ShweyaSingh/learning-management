import { Student, Batch, BatchStudentMapping } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

// get all /students

route.get('/', (req, res) => {
    Student.findAll()
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve Students"
            })
        })
})

// get one /students/:id

route.get('/:id', (req, res) => {
    let studentid = parseInt(req.params.id)
    Student.findOne({
        where: {
            id: studentid
        }
    }).then((student) => {
        res.status(200).send(student)
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Student"
        })
    })
})

// get all batches /students/:id/batches

route.get('/:id/batches', (req, res) => {
    let studentid = parseInt(req.params.id)
    BatchStudentMapping.findAll({
        attributes:[
            'batchId','studentId'
        ],
        include: [
            { model: Batch }
        ],
        where: {
            studentId: studentid
        }
    }).then((studentBatch) => {
        res.status(200).send(studentBatch)
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Student's Batches"
        })
    })
})

//post one /student

route.post('/', function (req, res) {
    Student.create({
        studentname: req.body.name,
    }).then((student) => {
        res.status(201).send(student);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new Student"
        })
    })
})

// put one /student/:id

route.put('/:id', (req, res) => {
    let studentid = parseInt(req.params.id)
    Student.update({ studentname: req.body.name },
        {
            where: {
                id: studentid
            }
        }
    ).then((student) => {
        res.status(201).send(student);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not update new Student"
        })
    })
})

export default route