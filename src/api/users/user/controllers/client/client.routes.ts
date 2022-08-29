// LIBS
import { Router } from 'express';

// VALIDATORS
import { isUser } from '../../../../../middlewares/permissions/isLab';

// FUNCTIONS LAB
import { editPersonalInfo } from './editPersonalInfo';

// ROUTES
export const clientRouter = Router();

// LAB

clientRouter.put('/edit', isUser, editPersonalInfo);
