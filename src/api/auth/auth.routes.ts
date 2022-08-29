// LIBS
import { Router } from 'express';

// FUNCTIONS
import { authAdmin } from './controllers/authAdmin';
import { authValidateToken } from './controllers/authValidateToken';

// MIDDLEWARES
import { authMiddleware } from '../../middlewares/auth';
import { authClient } from './controllers/authClient';

// ROUTES
export const authRouter = Router();

authRouter.post('/backoffice/login', authAdmin);

authRouter.post('/client/login', authClient);

authRouter.get('/validate/token', authMiddleware, authValidateToken);
