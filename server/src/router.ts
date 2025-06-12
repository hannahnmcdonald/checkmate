import { Router } from 'express';
import searchRoute from './routes/search.route';
import gameRoute from './routes/game.route';
import register from './routes/auth/register.route';
import login from './routes/auth/login.route';
import logout from '../src/routes/auth/logout.route';
import matchRoute from './routes/match.route';
import friendRoute from './routes/friends.route';
import profileRoute from './routes/profile.route';
import meRoute from './routes/me.route';
import notificationRoute from './routes/notifications.route';
import passwordRoute from './routes/auth/password.route'
import saveGamesRoute from './routes/saveGames.route';

const router = Router();

router.use('/', searchRoute);
router.use('/', gameRoute);
router.use('/', matchRoute)
router.use('/', friendRoute);
router.use('/', profileRoute);
router.use('/', meRoute);
router.use('/', notificationRoute);
router.use('/', passwordRoute);
router.use('/', saveGamesRoute);
router.use('/auth', register);
router.use('/auth', login);
router.use('/auth', logout);

export default router;
