import { Router } from 'express';
import searchRoute from './routes/bbg/search.route';
import gameRoute from './routes/bbg/game.route';

const router = Router();

router.use('/', searchRoute);
router.use('/', gameRoute);

export default router;
