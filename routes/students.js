let mysql = require("mysql2");
const db = require('../models/index'); // eqiuivalent mysql
const StudentDiamantogiannis = db.sequelize.models.StudentDiamantogiannis; // Model TestCustomer
var express = require('express');
var router = express.Router();

// list
router.get('/', async function (req, res) {
    // let students = await getStudents();
    let students = await StudentDiamantogiannis.findAll();
    console.log(students);
    res.render('students/list',
        {
            title: 'Express 003 - Students page',
            // list: getStudents()
            list: students
        });
});

// GET create
router.get('/create', (req, res) => {
    res.render('students/create', {
        title: 'Express 002 - New Student page',
        message: 'New Student'
    });
})

// POST create 
router.post('/create', async (req, res) => {
    await StudentDiamantogiannis.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        tuitionFees: req.body.tuitionFees
    });
    res.redirect('/students');
});

// npx sequelize model:generate --name TestCustomer --attributes firstName:string,lastName:string,email:string
// npx sequelize db:migrate


// /customer/delete
router.get('/delete', async function (req, res) {
    // let customers = await getCustomers();
    // let customers = await TestCustomer.findAll();
    // console.log(customers);
    await StudentDiamantogiannis.destroy({where: { id: req.query.id } });
    res.render('students/deleted',
        {
            title: 'Express 002 - Students delete page',
            // list: getCustomers()
            message: `You deleted student with id: ${req.query.id}`
        });
});


async function getStudents() {
    try {
        let dbResult = await dbLogin();
        if (dbResult) {
            return (dbResult);
        }
    } 
    catch (error) {
        return (false);
    }
}

async function dbLogin() {
    const poolConfigDetails = {
        connectionLimit: 1,
        host: 'ra1.anystream.eu',
        port: '5420',
        user: 'cb12ptjs',
        password: 'cb12ptjs',
        database: 'cb12ptjs'
    };
    const pool = mysql.createPool(poolConfigDetails);
    const sql = "SELECT * FROM studentDiamantogiannis";

    // let result = pool.execute().then(resolve => {}, reject => {});
    // return(result);

    return (new Promise(
        (resolve, reject) => {
            pool.execute(sql, [], (error, rows) => {
                if (error) {
                    pool.end();
                    return (reject(error));
                } else {
                    console.log(rows);
                    return(resolve(rows));
                    // if (rows.length == 1) {
                    //     pool.end();
                    //     return (resolve(true));
                    // }
                    // rows.length != 1
                    // else {
                    //     pool.end();
                    //     return (resolve(false));
                    // }
                }
            })
        }
    ));
}

module.exports = router;