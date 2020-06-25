import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserSerivce';
import UpdateUserAvatarService from '../services/UploadUserAvatarService';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import uploadConfig from '../config/upload';

const userRoutes = Router();
const upload = multer(uploadConfig);

userRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateUserAvatarService();

      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default userRoutes;
