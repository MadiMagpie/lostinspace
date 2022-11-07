const express = require('express')
const db = require('./createLeaderboard.js')

const app = express()

app.get('/adduser', (req, res) => {
    const name = req.query.name
    db.run ('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, 0], (err) => {
        if (err) {
            res.send('Error')
        } else {
            res.send('Success')
        }
    })
})

app.get('/updateuser', (req, res) => {
    const name = req.query.name
    const score = req.query.score
    db.run ('UPDATE leaderboard SET score = ? WHERE name = ?', [score, name], (err) => {
        if (err) {
            res.send('Error')
        } else {
            res.send('Success')
        }
    })
})

app.get('/leaderboard', (req, res) => {
    lb.all('SELECT * FROM leaderboard ORDER BY score DESC', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.send(rows)
        }
    })
})

app.post('/leaderboard', (req, res) => {
    db.run('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [req.body.name, req.body.score], (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send('success')
        }
    })
})

app.listen(3000)