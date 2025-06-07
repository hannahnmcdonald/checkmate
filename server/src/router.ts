import { Router } from 'express';
import searchRoute from './routes/bbg/search.route';
import gameRoute from './routes/bbg/game.route';
import register from './routes/auth/register.route';
import login from './routes/auth/login.route';
import logout from './routes/auth/logout.route';
import protectedRoute from './routes/auth/protected.route';

const router = Router();

router.use('/', searchRoute);
router.use('/', gameRoute);
router.use('/auth', register);
router.use('/auth', login);
router.use('/auth', logout);
router.use('/auth', protectedRoute);

export default router;
