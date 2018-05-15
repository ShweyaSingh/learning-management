import express from 'express'
import teachers from './teachers'
import students from './students'
import courses from './courses'
import subjects from './subjects'
import mapstudentbatch from './studentBatchMapping'
import batches from './batches'
import lectures from './lectures'
const route=express.Router()

route.use('/batches',batches);
route.use('/courses',courses);
route.use('/teachers',teachers);
route.use('/students',students);
route.use('/subjects',subjects);
route.use('/EnrollStudentBatch',mapstudentbatch);
route.use('/lectures',lectures);
export default route
