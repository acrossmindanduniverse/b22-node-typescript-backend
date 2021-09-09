import express from "express";
import { signIn, signUp, forgotPassword } from '../../controllers/auth';
import { resetPassword } from './../../controllers/auth';

const router = express.Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router