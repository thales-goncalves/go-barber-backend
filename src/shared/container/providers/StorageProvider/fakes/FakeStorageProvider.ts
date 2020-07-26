import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(fileUrl: string): Promise<string> {
    this.storage.push(fileUrl);

    return fileUrl;
  }

  public async deleteFile(fileUrl: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === fileUrl,
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
