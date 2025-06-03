import { Router } from 'express';
import searchRoute from './routes/bbg/search.route';
import gameRoute from './routes/bbg/game.route';
import register from './routes/auth/register.route';
import login from './routes/auth/login.route';

const router = Router();

router.use('/', searchRoute);
router.use('/', gameRoute);
router.use('/auth', register);
router.use('/auth', login);

export default router;
