import express from 'express';
import passport from 'passport';
import cs from 'cookie-storage';

const cookieStorage = new cs.CookieStorage();

const router = express.Router();

// passport.authenticate middleware is used here to authenticate the request
router.get('/auth', passport.authenticate('yahoo', {
  scope: 'profile fspt-r'// Used to specify the required data
}));

// // The middleware receives the data from Yahoo and runs the function on Strategy config
router.get('/auth/callback', passport.authenticate('yahoo'), (req, res) => {
  res.redirect('/yahoo/league');
});

// Logout route
router.get('/logout', (req, res) => {
  cookieStorage.clear();
  req.logout();
  res.redirect('/');
});

export default router;
