import { BatchStudentMapping,Batch,Lecture } from '../../db'
import express from 'express'
const route = express.Router()
import path from 'path'
import Sequelize from 'sequelize'
const Op=Sequelize.Op;

route.post('/', function (req, res) {
    Batch.findOne({
        where:{
            id:parseInt(req.body.batchid)
        }
    }).then((batch:any)=>{
        BatchStudentMapping.findAll({
            where:{
                [Op.and]:[
                    {studentId: parseInt(req.body.studentid)},
                    {batchId:batch.id}
                ]
            }
        }).then((mapping)=>{
            if(mapping.length==0){
                BatchStudentMapping.create({
                    studentId: parseInt(req.body.studentid),
                    batchId:batch.id
                }).then((studentbatchmapping) => {
                    res.status(201).send()
                }).catch((err) => {
                    res.status(501).send({
                        error: "Could not Enroll student to batch"
                    })
                })
            }
            else{
                res.status(202).send()
            }
        })
    })  
})


route.post('/map', function (req, res) {
    BatchStudentMapping.findAll({
        where:{
            [Op.and]:[
                {studentId: req.body.studentId},
                {batchId:req.body.batchId}
            ]
        }
    }).then((mapping)=>{
        if(mapping.length==0){
            BatchStudentMapping.create({
                studentId: req.body.studentId,
                batchId:req.body.batchId
            }).then((studentbatchmapping) => {
                res.status(201).send()
            }).catch((err) => {
                res.status(501).send({
                    error: "Could not Enroll student to batch"
                })
            })
        }
        else{
            res.status(202).send()
        }
    })
})

route.get('/',(req,res)=>{
    BatchStudentMapping.findAll().then((records)=>{
        res.send(records)
    }).catch((err)=>{
        res.status(501).send({
            error: "Could not find student to batch"
        })
    })
})

export default route;