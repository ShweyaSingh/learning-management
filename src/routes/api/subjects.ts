import { Subject, Teacher, Course } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

//get all subjects
route.get('/', (req, res) => {
    Subject.findAll({
        include:[
            {model:Course}
        ]
    }).then((subjects) => {
            res.status(200).send(subjects)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve subjects"
            })
        })
})

//get subject with id passed in url
route.get('/:id', (req, res) => {
    let subjectId = parseInt(req.params.id)
    Subject.findOne({
        where: {
            id: subjectId
        }
    })
        .then((subject) => {
            res.status(200).send(subject)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve subject of this particular id"
            })
        })

})

//get all those teachers who teaches subject having id passed in url
route.get('/:id/teachers', (req, res) => {
    let subjectId = parseInt(req.params.id)
    Teacher.findAll({
        include: [
            { model: Subject }
        ],
        where: {
            subjectId: subjectId
        }
    }).then((subjectTeachers) => {
        res.status(200).send(subjectTeachers)
    }).catch((err) => {
        res.status(500).send({
            error: "Could not retrieve teachers for subject with this particular id"
        })
    })
})

//add new subject
route.post('/', function (req, res) {
    Course.findOne({
        where:{coursename:req.body.coursename}
    }).then((course:any)=>{
        Subject.create({
            subjectname: req.body.name,
            courseId: course.id
        }).then((subject) => {
            res.status(201).redirect('/')
        }).catch((err) => {
            res.status(501).send({
                error: "Could not create new subject"
            })
        })
    }).catch((err)=>{
        res.status(501).send({
            error: "Could not find course of this name"
        })
    })
})

//update detail of subject with id passed in url
route.put('/:id', function (req, res) {
    Subject.update({ subjectname: req.body.name },
        {
            where: {

                id: parseInt(req.params.id)
            }
        })
        .then((subject) => {
            res.status(201).send(subject)
        }).catch((err) => {
            res.status(501).send({
                error: "Could not update subject detail"
            })
        })
})

export default route
