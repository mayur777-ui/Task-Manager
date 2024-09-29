import express from 'express';
import { login, Register } from '../controllers/user.controllers.js';



const router = express.Router({ mergeParams: true });


router.post('/register', Register);
router.route('/login').post(login);
export default router;
