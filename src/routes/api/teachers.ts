import { Teacher, Batch, Lecture, Subject } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

// get all /teachers

route.get('/', (req, res) => {
    Teacher.findAll({
        include: [
            { model: Subject }
        ]
    }).then((teachers) => {
        res.status(200).send(teachers)
    })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve Students"
            })
        })
})

// get one /teachers/:id

route.get('/:id', (req, res) => {
    let teacherid = parseInt(req.params.id)
    Teacher.findOne({
        where: {
            id: teacherid
        }
    }).then((teacher) => {
        res.status(200).send(teacher)
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Teacher"
        })
    })
})

// get all batches /teachers/:id/batches
// Test 
route.get('/:id/batches', (req, res) => {
    let teacherid = parseInt(req.params.id)
    Lecture.findAll({
        attributes: [
            'teacherId', 'batchId'
        ],
        include: [
            {
                model: Batch
            }
        ],
        where: {
            id: teacherid
        }

    }).then((teacherBatches) => {
        res.status(200).send(teacherBatches)
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Student's Batches"
        })
    })
})

//post one /teacher

route.post('/', function (req, res) {
    Subject.findOne({
        where: { subjectname: req.body.subjectname }
    }).then((subject:any) => {
        Teacher.create({
            teachername: req.body.name,
            subjectId: subject.id
        }).then((teacher) => {
            res.status(201).redirect('/');
        }).catch((err) => {
            res.status(501).send({
                error: "Could not add new Teacher"
            })
        })
    }).catch(()=>{
        res.status(501).send({
            error: "Could not find Subject of this name"
        }) 
    })
})

// put one /teacher/:id

route.put('/:id', (req, res) => {
    let teacherid = parseInt(req.params.id)
    Teacher.update({ teachername: req.body.name },
        {
            where: {
                id: teacherid
            }
        }
    ).then((teacher) => {
        res.status(201).send(teacher);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not update new Teacher"
        })
    })
})

export default route