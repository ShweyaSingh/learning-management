
import { Course, Batch } from '../../db'
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

route.get('/:id/batches/:id1',(req,res)=>{
    Batch.findOne({
        where:{
            [Op.and]:
            [
                {id: req.params.id1},
                {courseId: req.params.id}
            ]
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

route.get('/:id/batches/:id/lectures',(req,res)=>{
    Course.findAll().then((students) => {
        res.status(200).send(students)
    })
    .catch((err) => {
        res.status(500).send({
            error: "Could not retrieve Students"
        })
    }) 
})

// route.get('/:id/batches/:id/lectures/:id',(req,res)=>{
//     Course.findAll().then((students) => {
//         res.status(200).send(students)
//     })
//     .catch((err) => {
//         res.status(500).send({
//             error: "Could not retrieve Students"
//         })
//     }) 
// })

//post one /courses

route.post('/', function (req, res) {
    Course.create({
        coursename: req.body.name,
    }).then((course) => {
        res.status(201).send(course);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new course"
        })
    })
})


export default route