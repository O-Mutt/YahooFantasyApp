import express from 'express';
import passport from 'passport';
import YahooStrategy from 'passport-yahoo-oauth2';
import cookieSession from 'cookie-session';
import cs from 'cookie-storage';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';

import router from './src/routes/index.js';
import isUserAuthenticated from './src/middleware/user.js';

const cookieStorage = new cs.CookieStorage();
dotenv.config();

const app = express();
const MongoStore = connectMongo(session);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const mongoStore =
//   ((err) => {
//     console.log(err || 'connect-mongodb setup ok');
//   }));

// cookieSession config
/* app.use(cookieSession({
  name: 'YahooFantasyAppSession',
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  sameSite: 'strict',
  secure: 'true'
})); */

app.use(session({
  secret: process.env.CLIENT_SECRET,
  maxAge: new Date(Date.now() + 3600000),
  resave: true,
  saveUninitialized: true,
  Store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(new YahooStrategy.Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.PROTOCOL}${process.env.DOMAIN}${process.env.CALLBACK_PATH}`,
  accessTokenUri: 'https://api.login.yahoo.com/oauth2/get_token',
  authorizationUri: 'https://api.login.yahoo.com/oauth2/request_auth',
  scope: 'profile fspt-r'
},
((token, tokenSecret, profile, done) => {
  cookieStorage.setItem('yahooToken', token);
  done(null, profile);
})));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`\r\n******************************************************************\r\nServer Started at ${process.env.PROTOCOL}${process.env.DOMAIN}:${process.env.PORT}!\r\n******************************************************************\r\n`);
});
