import express from 'express';

import user from './user.js';
import yahoo from './yahoo.js';

const router = express.Router();

router.use('/user', user);
router.use('/yahoo', yahoo);

router.get('/', async (req, res) => {
  res.render('../src/views/index.ejs');
});

export default router;
