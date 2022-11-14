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



const startpagePath = __dirname + '/login.html'
const homepagePath = __dirname + '/home.html'
const gamepagePath = __dirname + '/index.html'
const leaderboardPath = __dirname + '/leaderboard.html'
const howtoplayPath = __dirname + '/howtoplay.html'

app.get('/', (req, res) => {
    console.log(req.body    )
    res.sendFile(startpagePath)
})

app.get('/home', (req, res) =>  {
    const name = req.query.name
    db.run ('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, 0], (err) => {
        if (err) {
            res.send('Error')
        } else {
    console.log(req.query)
    req.params.all 
    res.sendFile (path.join(homepagePath))
        }
    })
})

app.get('/game', (req, res) => {
    console.log(req.query)
    res.render(path.join(gamepagePath))
})

app.get('/howto', (req, res) => {
    console.log(req.query)
    res.sendFile(howtoplayPath)
})

app.get('/updateuser', (req, res) => {
    const name = req.query.name
    const score = req.query.score
    db.run ('UPDATE leaderboard GREATEST score = ? WHERE name = ?', [score, name], (err) => {
        if (err) {
            res.send('Error')
        } else {
            res.send('Success')
        }
    })
})

app.get('/score', (req, res) => {
    db.run('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [req.query.name, req.query.score], (err) => {
        if (err) {
            console.log(err)
        } else {
            res.sendFile(gamepagePath)
        }
    })
})


app.listen(3000)