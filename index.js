const express = require('express')
const db = require('./createLeaderboard')
const app = express()
var serveStatic = require('serve-static')
var path = require('path')

app.use(serveStatic(path.join(__dirname, 'Public')))
app.use(serveStatic(path.join(__dirname, 'public/css')))

app.get('/api', (request, response) => {
    db.all('SELECT * FROM leaderboard ORDER BY score DESC', (err, rows) => {
        response.json(rows);
    });
});
app.post('/api', (request, response) => {
    const data = request.body;
    const sql = 'INSERT INTO leaderboard (name, score) VALUES (?, ?)';
    db.run(sql, data.name, data.score, err => {
        if (err) {
            response.status(500).json({message: 'Error inserting data'});
            return;
        }
        response.json({
            message: 'success',
            data: data
        });
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(__dirname + '/public')); // for static files (public folder)

const startpagePath = __dirname + '/login.html'
const homepagePath = __dirname + '/home.html'
const gamepagePath = __dirname + '/index.html'
const leaderboardPath = __dirname + '/leaderboard.html'
const howtoplayPath = __dirname + '/howtoplay.html'
// const suit = res.body.suit
// const score = res.body.score

app.get('/', (req, res) => {
    res.sendFile(startpagePath)
})


// this pushes login page to home page
app.post('/home', (req, res) => {
    console.log(req.body)
    res.sendFile(homepagePath, {name: req.body.name})
})

app.post('/game', (req, res) => {
    console.log(req.body)
    res.sendFile(gamepagePath, {suit: req.body.suit})
})

app.get('/game', (req, res) => {
    console.log(req.body)
    res.sendFile(gamepagePath, {score: req.body.score})
})

app.get('/howto', (req, res) => {
    console.log(req.body)
    res.sendFile(howtoplayPath)
})

app.get('/home', (req, res) => {
    console.log(req.body)
    res.sendFile(homepagePath)
})

// app.get('/', (req, res) => {
//     const name = req.query.name
//     db.run ('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, 0], (err) => {
//         if (err) {
//             res.send('Error')
//         } else {
//             res.send('Success')
//         }
//     })
// })

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
    db.all('SELECT * FROM leaderboard ORDER BY score DESC', (err, rows) => {
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
            res.sendFile(leaderboardPath)
        }
    })
})


app.listen(3000)

