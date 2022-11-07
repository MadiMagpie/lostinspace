const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./leaderboardDb');

db.run ('CREATE TABLE IF NOT EXISTS leaderboard (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, score INTEGER)');
module.exports = db;