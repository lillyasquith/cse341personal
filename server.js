const express = require( 'express' );
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongodb = require('./data/database');
const passport = require('passport');
const session = require ('express-session');
const cors = require ('cors');
const gitHubStrategy = require('passport-github2').Strategy;
const app = express();

const port = process.env.PORT || 3001;

app
  .use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}))
  .use(cors({origin: '*'}))
  .use('/', require('./routes/index.js'));

  passport.use(new gitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) =>{
  done(null, user);
})

app.get('/',(req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as Ly Dang` : 'Logged Out')
})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });


process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    }
    else {
      // Start the server
      app.listen(port, () => {
        console.log(`Running on port ${port}`);
      });
    } 
});