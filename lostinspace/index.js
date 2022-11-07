const express = require('express')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(__dirname + '/public')); // for static files (public folder)

const startpagePath = __dirname + '/login.html'
const homepagePath = __dirname + '/home.html'
const gamepagePath = __dirname + '/index.html'


app.get('/', (req, res) => {
    res.sendFile(startpagePath)
})


// this pushes login page to home page
app.post('/home', (req, res) => {
    console.log(req.body)
    res.sendFile(homepagePath)
})


// app.post('/game', (req, res) => {
//     console.log(req.body)
//     res.sendFile(gamepagePath)
// })


app.listen(3000)