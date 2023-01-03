const express = require("express");
const path = require('node:path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/discord', function(req, res){
    res.redirect('https://discord.gg/nwH7jcjMaT');
});

app.get('/tiktok', function(req, res){
    res.redirect('https://www.tiktok.com/@cubingpandadiscord');
});

app.get('/medium', function(req, res){
    res.redirect('https://medium.com/@cubingpandacommunity');
});

app.get('/youtube', function(req, res){
    res.redirect('https://www.youtube.com/@cubingpandacommunity');
});

app.get('/github', function(req, res){
    res.redirect('https://github.com/TheCubingPanda');
});

app.get('/partnership', function(req, res){
    res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSd6HfVEvgFws4wAsP_5iWYH2cab-VFA3CiJ98g9nQv8PvAEYQ/viewform?usp=sf_link');
});

//app.use(express.static('src/dashboard/views/'));

app.listen(3000);

console.log("Website online, listening on http://localhost:3000/");