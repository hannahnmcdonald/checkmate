import { Router } from 'express';
import searchRoute from './src/routes/search.route';
import gameRoute from './src/routes/game.route';

const router = Router();

router.use('/', searchRoute);
router.use('/', gameRoute);

export default router;