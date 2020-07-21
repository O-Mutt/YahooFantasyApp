import express from 'express';

import isUserAuthenticated from '../middleware/user.js';
import yf from '../api/yahooFantasy.js';

const router = express.Router();

router.get('/chooseLeague', isUserAuthenticated, (req, res) => {
  yf.user.game_leagues('mlb', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.render('secret', { data });
    }
  });
});

router.get('/league', isUserAuthenticated, (req, res) => {
  yf.league.transactions(
    '398.l.51361',
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        // // define Schema
        // const transactionSchema = mongoose.Schema({
        //   id: String
        // });

        // const transaction = mongoose.model('transaction', transactionSchema, 'sess');

        // const transaction1 = new transaction({ id: data.league_key });

        // transaction1.save((err2, result) => {
        //   if (err2) return console.error(err);
        //   console.log(`${result.id} saved to sess collection.`);
        // });

        res.render('secret', { data });
      }
    }
  );
});

export default router;
