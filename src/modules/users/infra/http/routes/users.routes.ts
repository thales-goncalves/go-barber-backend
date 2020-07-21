import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRoutes = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoutes.post('/', usersController.create);

userRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRoutes;
