// LIBS
import { Router } from 'express';

// MIDDLEWARES
import { authMiddleware } from '../middlewares/auth';

// CHIELD ROUTES
import { authRouter } from './auth/auth.routes';
import { uploadRouter } from './upload/upload.routes';
import { permissionRouter } from './permission/permission.routes';

import { backofficeRouter } from './users/user/controllers/backoffice/backoffice.routes';
import { clientRouter } from './users/user/controllers/client/client.routes';

// ROUTES
export const routes: Router = Router();

routes.use('/auth', authRouter);
routes.use('/upload', authMiddleware, uploadRouter);
routes.use('/permission', authMiddleware, permissionRouter);

// BACKOFFICE
routes.use('/backoffice/users', authMiddleware, backofficeRouter);

// LAB
routes.use('/client/users', authMiddleware, clientRouter);
