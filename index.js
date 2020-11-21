const express   = require('express')
const app       = express()
const config    = require('config')
const bodyParse = require('body-parser')
const cors      = require('cors')
const passport  = require('passport')
const jwt       = require('jsonwebtoken')
const response  = require('./app/utils/response')
const { sequelize, Info } = require('./app/models')
const path      = require('path')

app.use(cors());
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(passport.initialize())
app.use(passport.session())

// app.get('/', function(req, res) {
//     console.log(req.params)
//     res.send(response(200, 'Hi', 'Hello'))
// })

app.post('/get-account', function(req, res) {
    Info.findAll({
        attributes: [
            "username",
            "star4",
            "star5",
            "gem",
            "csb",
            "autoTime",
            [sequelize.fn('date_format', sequelize.col('updatedAt'), '%Y-%m-%d'), 'updatedAt']
        ]
    })
    .then(listInfo => {
        res.send(response(200, 'Success', listInfo))
    })
})

app.post('/update-account', function(req, res) {
    let data = {
        username: req.body.username,
        star4: req.body.star4,
        star5: req.body.star5,
        gem: req.body.gem,
        autoTime: req.body.autoTime,
        csb: req.body.csb
    }
    Info.findOrCreate({
        where: {
            username: data.username
        },
        defaults: data
    })
    .spread((info, created) => {
        if(!created) {
            info.update(data)
            .then(_info => {
                res.send(
                    response(200, "SUCCESS", "UPDATE")
                )
            })
        }else {
            res.send(
                response(200, "SUCCESS", "CREATED")
            )
        }
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port: ${process.env.PORT || 3000}`)
})
