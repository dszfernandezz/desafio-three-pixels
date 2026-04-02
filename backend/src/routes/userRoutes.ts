import { Router } from 'express';
import { registerUser } from '../controllers/userController.js';

const router = Router();

// quando chegar um POST em /register chama o controller
router.post('/register', registerUser);

export default router;