import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(fileUrl: string): Promise<string> {
    fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, fileUrl),
      path.resolve(uploadConfig.uploadsFolder, fileUrl),
    );

    return fileUrl;
  }

  public async deleteFile(fileUrl: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, fileUrl);

    try {
      fs.promises.stat(filePath);
    } catch (Err) {
      return;
    }

    fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
