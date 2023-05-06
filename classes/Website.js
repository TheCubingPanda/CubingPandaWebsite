const express = require('express');
const path = require('path');

class Website {
  constructor() {
    this.app = express();

    this.app.set('views', './views');
    this.app.set('view engine', 'ejs');
    this.app.use(express.static('./public'));

    this.app.get('/', this.index.bind(this));
    this.app.get('/partnership', this.partnership.bind(this));
    this.app.get('/discord', this.discord.bind(this));
    this.app.get('/invite', this.invite.bind(this));
    this.app.get('/free-nitro', this.freenitro.bind(this));

    this.app.listen(3000, () => {
      console.log('Website online, listening on http://localhost:3000/');
    });
  }

  index(req, res) {
    res.render('index');
  }

  partnership(req, res) {
    res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSd6HfVEvgFws4wAsP_5iWYH2cab-VFA3CiJ98g9nQv8PvAEYQ/viewform?usp=sf_link');
  }

  discord(req, res) {
    res.redirect('https://discord.gg/nwH7jcjMaT');
  }

  invite(req, res) {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=1082158692906049546&permissions=274878023680&scope=bot');
  }

  freenitro(req, res) {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }
}

module.exports = Website;