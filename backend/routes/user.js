import express from 'express';
import {register, login, logout, deleteMyProfile, myProfile } from '../controllers/user.js';
import isAuthenticated  from '../middlewares/auth.js';


const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(isAuthenticated, logout);

router.route('/delete/me').delete(isAuthenticated, deleteMyProfile);

router.route('/me').get(isAuthenticated, myProfile);

export default router;