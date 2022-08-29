// LIBS
import { Router } from 'express';

// VALIDATORS
import { isAdmin } from '../../../../../middlewares/permissions/isAdmin';

// FUNCTIONS
import { createUser } from './createUser';
import { listUsers } from './listUsers';
import { editUser } from './editUser';
import { changeIsBlocked } from './changeIsBlocked';
import { changeIsDeleted } from './changeIsDeleted';

// ROUTES
export const backofficeRouter = Router();

backofficeRouter.post('/create', isAdmin, createUser);
backofficeRouter.get('/list', isAdmin, listUsers);
backofficeRouter.put('/edit', isAdmin, editUser);
backofficeRouter.put('/change/isBlocked', isAdmin, changeIsBlocked);
backofficeRouter.put('/change/isDeleted', isAdmin, changeIsDeleted);
