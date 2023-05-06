const fs = require('node:fs');
const path = require('node:path');
const { startBot } = require('./discord');

/* Website */

const express = require("express");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/partnership', function (req, res) {
	res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSd6HfVEvgFws4wAsP_5iWYH2cab-VFA3CiJ98g9nQv8PvAEYQ/viewform?usp=sf_link');
});

app.get('/discord', function (req, res) {
	res.redirect('https://discord.gg/nwH7jcjMaT');
});

app.get('/invite', function (req, res) {
	res.redirect('https://discord.com/api/oauth2/authorize?client_id=1082158692906049546&permissions=274878023680&scope=bot');
});

app.get('/free-nitro', function (req, res) {
	res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

app.listen(3000);

console.log("Website online, listening on http://localhost:3000/");

// Start Discord bot
startBot();