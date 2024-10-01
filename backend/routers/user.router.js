import express from 'express';
import { login, Register, Userdetails } from '../controllers/user.controllers.js';



const router = express.Router({ mergeParams: true });


router.post('/register', Register);
router.route('/login').post(login);
router.get('/showDetails/:id', Userdetails);
export default router;
