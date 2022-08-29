// LIBS
import { Router } from 'express';

// FUNCTIONS

import { listPermissions } from './controllers/listPermission';

export const permissionRouter = Router();

permissionRouter.get('/list', listPermissions);
