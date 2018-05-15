import { Batch, Lecture, Course } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'

route.get('/', (req, res) => {
    Batch.findAll({
        include: [
            { model: Course }
        ],
        // where:{
        //     courseId:req.query.courseid
        // }
    }).then((batches) => {
        res.status(200).send(batches)
    }).catch((err) => {
        //console.log(err)
        res.status(500).send({
            error: "Could not retrieve Students"
        })
    })
})

route.get('/upcoming', (req, res) => {
    Batch.findAll({
        include: [
            { model: Course }
        ],
        limit: 4,
        order: [['updatedAt', 'DESC']]
    }).then((batches) => {
        res.status(200).send(batches)
    }).catch((err) => {
        //console.log(err)
        res.status(500).send({
            error: "Could not retrieve Students"
        })
    })
})

route.post('/', function (req, res) {
    Course.findOne({
        where: { coursename: req.body.coursename }
    }).then((course: any) => {
        Batch.create({
            batchname: req.body.name,
            courseId: course.id
        }).then((batch) => {
            res.status(201).redirect('/');
        }).catch((err) => {
            res.status(501).send({
                error: "Could not add batch"
            })
        })
    }).catch((err) => {
        res.status(501).send({
            error: "Could not find course of this name"
        })
    })
})

export default route;