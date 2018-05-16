import Sequelize from 'sequelize'
//const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    host: 'localhost',
    port:3306,
    pool:{
        min:0,
        max:5,
    },
    storage:'learningmanagementDB.db'
})

export const Course = db.define('courses', {
    coursename: {
        type: Sequelize.STRING(30),
        allowNull: false,
    }
})

export const Batch=db.define('batches',{
    batchname:{
        type: Sequelize.STRING(30),
        allowNull: false,
    }
})

export const Teacher=db.define('teachers',{
    teachername:{
        type:Sequelize.STRING(30),
        allowNull: false,
    }
})

export const Student=db.define('students',{
    studentname:{
        type:Sequelize.STRING(50),
        allowNull:false,
    }
})

export const Lecture=db.define('lectures',{
    lecturename:{
        type:Sequelize.STRING(50),
        allowNull:false,
    }
})

export const Subject=db.define('subjects',{
    subjectname:{
        type:Sequelize.STRING(50),
        allowNull:false,
    }
})

export const BatchStudentMapping=db.define('bsmapping',{
})

Batch.belongsTo(Course);
Subject.belongsTo(Course);
Teacher.belongsTo(Subject);
Lecture.belongsTo(Batch);
Lecture.belongsTo(Teacher);
BatchStudentMapping.belongsTo(Batch);
BatchStudentMapping.belongsTo(Student);

db.sync({ force:false})
    .then(()=>{console.log("Database has been synced ")})
    .catch((err)=>console.log(err))
export default Course
