
import { Course, Batch, Lecture, BatchStudentMapping, Student, Teacher } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'
import Sequelize from 'sequelize'
const Op=Sequelize.Op;

route.get('/',(req,res)=>{
    Course.findAll().then((courses) => {
        res.status(200).send(courses)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Courses"
        })
    })
})

route.get('/:id',(req,res)=>{
    Course.findOne({
        where:{
            id:req.params.id
        }
    }).then((course) => {
        res.status(200).send(course)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Course"
        })
    }) 
})

route.get('/:id/batches',(req,res)=>{
    Batch.findAll({
        include:[
            {model:Course}
        ],
        where:{
            courseId: req.params.id
        }
    }).then((batches) => {
        res.status(200).send(batches)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        })
    }) 
})

route.get('/:id/batches/:bid',(req,res)=>{
    Batch.findOne({
        where:{
            [Op.and]:
            [
                {id: req.params.bid},
                {courseId: req.params.id}
            ]
        }
    }).then((batch) => {
        res.status(200).send(batch)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        })
    })  
})

route.get('/:id/batches/:bid/lectures',(req,res)=>{
    Batch.findOne({
        where:{
            [Op.and]:
            [
                {id: req.params.bid},
                {courseId: req.params.id}
            ]
        }
    }).then((batch:any) => {
        Lecture.findAll({
            where:{
                batchId:batch.id
            }
        }).then((lectures) => {
            res.status(200).send(lectures)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve lectures"
            })
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        })
    }) 
})

route.get('/:id/batches/:bid/lectures/:lid',(req,res)=>{
    Batch.findOne({
        where:{
            [Op.and]:
            [
                {id: req.params.bid},
                {courseId: req.params.id}
            ]
        }
    }).then((batch:any) => {
        Lecture.findOne({
            where:{
                [Op.and]:
                [
                    {batchId:batch.id},
                    {id: req.params.lid}
                ]
            }
        }).then((lecture) => {
            res.status(200).send(lecture);
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve lecture"
            })
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        })
    }) 
})

route.get('/:id/batches/:bid/students',(req,res)=>{
    Batch.findOne({
        where:{
            [Op.and]:
            [
                {id: req.params.bid},
                {courseId: req.params.id}
            ]
        }
    }).then((batch:any) => {
        BatchStudentMapping.findAll({
            attributes:[
                'batchId','studentId'
            ],
            include:[
                {model:Student}
            ],
            where:{
                batchId:batch.id
            }
        }).then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve students"
            })
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        })
    }) 
})


route.get('/:id/batches/:bid/teachers',(req,res)=>{
    Batch.findOne({
        where:{
            [Op.and]:
            [
                {id: req.params.bid},
                {courseId: req.params.id}
            ]
        }
    }).then((batch:any) => {
        Lecture.findAll({
            attributes:[
                'batchId','teacherId'
            ],
            include:[
                {model:Teacher}
            ],
            where:{
                batchId:batch.id
            }
        }).then((teachers) => {
            res.status(200).send(teachers)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve teachers"
            })
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve batches related to course"
        })
    }) 
})

//post one /courses

route.post('/', function (req, res) {
    Course.create({
        coursename: req.body.name,
    }).then((course) => {
        res.status(201).redirect('/');
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        })
    })
})


export default route