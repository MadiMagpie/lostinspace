const express = require('express')
const db = require('./createLeaderboard')
const app = express()
var serveStatic = require('serve-static')
var path = require('path')
const { get } = require('http')

app.use(serveStatic(path.join(__dirname, 'Public')))
app.use(serveStatic(path.join(__dirname, 'public/css')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startpagePath = __dirname + '/login.html'
const homepagePath = __dirname + '/home.html'
const gamepagePath = __dirname + '/index.html'
const leaderboardPath = __dirname + '/leaderboard.html'
const howtoplayPath = __dirname + '/howtoplay.html'

app.get('/login', (req, res) => {
    console.log(req.body)
    res.sendFile(startpagePath)
})

app.get('/', (req, res) =>  {
    res.sendFile (path.join(homepagePath))
})

app.get('/game', (req, res) => {
    const name = req.query.name
    const score = req.query.score
    db.run ('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, score], (err) => {
    console.log(req.query)
    console.log(req.body)
    res.sendFile(path.join(gamepagePath))
    })
})

app.get('/howto', (req, res) => {
    res.sendFile(howtoplayPath)
})

app.get('/score', (req, res) => {
    const name = req.query.name
    const score = req.query.score
    db.run ('UPDATE leaderboard SET score = ? WHERE name = ?', [score, name], (err) => {
        if (err) {
            res.send(err)
        } else {
            res.sendFile(path.join(gamepagePath))
        }
    })
})

app.get('/leaderboard', (req, res) => {
    res.sendFile(leaderboardPath)
})


app.get('/data', (req, res) => {
    db.all('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10', (err, rows) => {
        res.json(rows);
    });
});

app.get('/api', (req, res) => {
    db.all('SELECT * FROM leaderboard ORDER BY score', (err, rows) => {
        res.json(rows);
    });
});

app.get('/setScore', (req, res) => {
    const name = req.query.name
    const score = req.query.score
    if (!name || !score) return res.send('Please provide name and score')
    db.run ('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, score], (err) => {
        if (err) {
            res.send(err)
        } else {
            res.send(`Congrats ${name}, you changed the leaderboard`)
        }
    })
});


app.listen(3000)