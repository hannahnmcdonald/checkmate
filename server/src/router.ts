import { Router } from 'express';
import searchRoute from './routes/bbg/search.route';
import gameRoute from './routes/bbg/game.route';
import { register, login } from './routes/auth.route';


const router = Router();

router.use('/', searchRoute);
router.use('/', gameRoute);
router.post('/register', register);
router.post('/login', login);

export default router;
